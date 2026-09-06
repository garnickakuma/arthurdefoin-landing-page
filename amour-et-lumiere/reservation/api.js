/**
 * Amour et Lumière — moteur de réservation
 *
 * Remplace Cal.com : les créneaux vivent dans une base Cloudflare (D1), le
 * visiteur choisit son horaire sur la page elle-même, règle l'acompte de 29 €
 * par Stripe, et le créneau se verrouille au moment où Stripe confirme le
 * paiement — jamais avant, sinon un abandon de paiement bloquerait un samedi
 * pour rien.
 *
 * Routes publiques
 *   GET  /creneaux?site=begles          les créneaux ouverts, avec leur état
 *   POST /reserver                      pose une option de 20 min et ouvre le paiement Stripe
 *   POST /webhook-stripe                Stripe confirme le paiement -> créneau réservé + emails
 *   GET  /agenda/<token>.ics            le calendrier à ajouter dans l'agenda Apple
 *
 * Routes d'administration (mot de passe)
 *   GET  /admin                         la page d'administration
 *   POST /admin/ouvrir                  ouvre un week-end : jours, heures, pas de 30 min
 *   POST /admin/etat                    bloque, libère ou marque un créneau comme pris
 *   GET  /admin/liste?site=begles       tout voir, y compris les créneaux réservés
 */

const ACOMPTE_CENTIMES = 2900; // 29 €
const OPTION_MINUTES = 20;     // durée pendant laquelle le créneau est tenu pendant le paiement

const SITES = {
  begles: {
    nom: 'Bègles',
    lieu: 'Studio Amour et Lumière, 2 allée André Joseph Sire, 33130 Bègles',
    conseils: 'Les photos sont prises sur fond blanc. Nous vous conseillons des tenues plutôt claires : le beige rend particulièrement bien. Si vous venez à plusieurs, accordez vos couleurs entre vous, c’est ce qui donne le plus joli résultat.',
    formules: {
      mini:     { nom: 'Mini séance',     prix: 99,  solde: 70 },
      complete: { nom: 'Séance complète', prix: 149, solde: 120 },
    },
  },
  arcachon: {
    nom: 'Bassin d’Arcachon',
    lieu: 'Plage de la Lagune, rendez-vous en bas de la descente',
    conseils: 'La séance a lieu en plein air. Prévoyez une seule tenue, il n’y a pas d’endroit pour se changer sur place. Les tons clairs et naturels rendent très bien face à la mer, et si vous venez à plusieurs, accordez vos couleurs entre vous.',
    formules: {
      mini:     { nom: 'Mini séance',     prix: 99,  solde: 70 },
      complete: { nom: 'Séance complète', prix: 149, solde: 120 },
    },
  },
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const url = new URL(request.url);
    const p = url.pathname;

    try {
      if (p === '/creneaux' && request.method === 'GET') return creneauxPublics(url, env);
      if (p === '/reserver' && request.method === 'POST') return reserver(request, env);
      if (p === '/webhook-stripe' && request.method === 'POST') return webhookStripe(request, env);
      if (p.startsWith('/agenda/')) return agendaIcs(p, env);

      if (p === '/admin') return pageAdmin();
      if (p.startsWith('/admin/')) {
        if (!adminAutorise(request, env)) return json({ erreur: 'Mot de passe incorrect' }, 401);
        if (p === '/admin/ouvrir' && request.method === 'POST') return adminOuvrir(request, env);
        if (p === '/admin/etat' && request.method === 'POST') return adminEtat(request, env);
        if (p === '/admin/liste' && request.method === 'GET') return adminListe(url, env);
      }
    } catch (e) {
      return json({ erreur: e.message }, 500);
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};

/* ─────────────────────────  côté visiteur  ───────────────────────── */

/** Les créneaux d'un site, à partir d'aujourd'hui. Une option de paiement
 *  expirée est présentée comme libre : inutile de faire le ménage en base,
 *  la comparaison de date suffit et évite un créneau bloqué à tort. */
async function creneauxPublics(url, env) {
  const site = url.searchParams.get('site') || 'begles';
  if (!SITES[site]) return json({ erreur: 'Site inconnu' }, 400);

  const aujourdhui = new Date().toISOString().slice(0, 10);
  const { results } = await env.DB.prepare(
    `SELECT id, jour, heure, etat, attente_fin FROM creneaux
      WHERE site = ?1 AND jour >= ?2 AND etat != 'bloque'
      ORDER BY jour, heure`
  ).bind(site, aujourdhui).all();

  const maintenant = Date.now();
  const creneaux = (results || []).map((c) => ({
    id: c.id,
    jour: c.jour,
    heure: c.heure,
    libre: c.etat === 'libre' || (c.etat === 'attente' && Date.parse(c.attente_fin || 0) < maintenant),
  }));

  return json({ site, creneaux });
}

/** Pose une option sur le créneau et ouvre le paiement.
 *  L'option n'est acceptée que si le créneau est encore libre au moment du
 *  UPDATE : c'est cette condition dans le SQL qui empêche deux familles de
 *  réserver le même horaire à la même seconde. */
async function reserver(request, env) {
  const { site, creneau, nom, email, tel, formule, message } = await request.json();

  const conf = SITES[site];
  if (!conf) return json({ erreur: 'Site inconnu' }, 400);
  if (!conf.formules[formule]) return json({ erreur: 'Formule inconnue' }, 400);
  if (!creneau || !nom || !email) return json({ erreur: 'Merci de remplir votre nom et votre email.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ erreur: 'Cette adresse email ne semble pas valide.' }, 400);

  const finOption = new Date(Date.now() + OPTION_MINUTES * 60000).toISOString();
  const maintenant = new Date().toISOString();

  const prise = await env.DB.prepare(
    `UPDATE creneaux
        SET etat = 'attente', attente_fin = ?1, nom = ?2, email = ?3, tel = ?4,
            formule = ?5, message = ?6
      WHERE id = ?7 AND site = ?8
        AND (etat = 'libre' OR (etat = 'attente' AND attente_fin < ?9))`
  ).bind(finOption, nom, email, tel || '', formule, message || '', creneau, site, maintenant).run();

  if (!prise.meta.changes) {
    return json({ erreur: 'Ce créneau vient d’être pris. Choisissez-en un autre.' }, 409);
  }

  const c = await env.DB.prepare('SELECT jour, heure FROM creneaux WHERE id = ?1').bind(creneau).first();
  const f = conf.formules[formule];

  const params = new URLSearchParams({
    mode: 'payment',
    ui_mode: 'embedded_page',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][unit_amount]': String(ACOMPTE_CENTIMES),
    'line_items[0][price_data][product_data][name]': `Acompte séance photo — ${f.nom} (${conf.nom})`,
    'line_items[0][price_data][product_data][description]':
      `${dateEnFrancais(c.jour)} à ${c.heure} · solde de ${f.solde} € en espèces sur place`,
    'line_items[0][quantity]': '1',
    customer_email: email,
    'metadata[creneau]': creneau,
    'metadata[site]': site,
    'metadata[formule]': formule,
    // pas de redirection : le visiteur reste sur la page, on lui montre
    // nous-mêmes l'écran de confirmation quand Stripe a terminé
    redirect_on_completion: 'never',
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
  const session = await res.json();

  if (session.error) {
    // le paiement n'a pas pu s'ouvrir : on rend tout de suite le créneau
    await env.DB.prepare(`UPDATE creneaux SET etat='libre', attente_fin=NULL WHERE id=?1`).bind(creneau).run();
    return json({ erreur: session.error.message }, 400);
  }

  await env.DB.prepare('UPDATE creneaux SET stripe_id = ?1 WHERE id = ?2').bind(session.id, creneau).run();

  return json({ clientSecret: session.client_secret, minutes: OPTION_MINUTES });
}

/** Stripe nous prévient que le paiement est encaissé : le créneau devient
 *  définitivement réservé et les deux emails partent. */
async function webhookStripe(request, env) {
  const brut = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  if (!(await signatureValide(brut, signature, env.STRIPE_WEBHOOK_SECRET))) {
    return json({ erreur: 'Signature invalide' }, 400);
  }

  const evt = JSON.parse(brut);
  if (evt.type !== 'checkout.session.completed') return json({ ok: true });

  const s = evt.data.object;
  if (s.payment_status !== 'paid') return json({ ok: true });

  const creneauId = s.metadata?.creneau;
  if (!creneauId) return json({ ok: true });

  const maj = await env.DB.prepare(
    `UPDATE creneaux SET etat='reserve', attente_fin=NULL, reserve_le=?1
      WHERE id=?2 AND etat != 'reserve'`
  ).bind(new Date().toISOString(), creneauId).run();

  if (!maj.meta.changes) return json({ ok: true }); // déjà traité

  const c = await env.DB.prepare('SELECT * FROM creneaux WHERE id = ?1').bind(creneauId).first();
  if (c) await envoyerEmails(env, c);

  return json({ ok: true });
}

/* ─────────────────────────  emails  ───────────────────────── */

async function envoyerEmails(env, c) {
  const conf = SITES[c.site];
  const f = conf.formules[c.formule] || { nom: c.formule, solde: '?' };
  const quand = `${dateEnFrancais(c.jour)} à ${c.heure}`;

  const pourArthur = `
<div style="font-family:system-ui,-apple-system,sans-serif;color:#26241F;max-width:520px">
  <h2 style="font-family:Georgia,serif;font-weight:400">Nouveau créneau réservé</h2>
  <table style="border-collapse:collapse;font-size:15px">
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Quand</td><td><strong>${quand}</strong></td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Où</td><td>${conf.nom}</td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Formule</td><td>${f.nom}</td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Client</td><td><strong>${c.nom}</strong></td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Email</td><td>${c.email}</td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Téléphone</td><td>${c.tel || '—'}</td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Acompte reçu</td><td><strong>29 €</strong></td></tr>
    <tr><td style="padding:6px 18px 6px 0;color:#6A6358">Solde sur place</td><td>${f.solde} € en espèces</td></tr>
  </table>
  ${c.message ? `<p style="font-size:15px"><strong>Message :</strong> ${echapper(c.message)}</p>` : ''}
  <p style="font-size:13px;color:#8B8374">Le rendez-vous est joint à cet email, et il apparaîtra aussi tout seul dans ton agenda si tu y as ajouté le calendrier Amour et Lumière.</p>
</div>`;

  const pourClient = `
<div style="font-family:Georgia,serif;max-width:540px;margin:0 auto;color:#26241F">
  <p style="font-size:22px;font-weight:300;margin-bottom:8px">Bonjour ${echapper(prenomDe(c.nom))},</p>
  <p style="font-size:16px;line-height:1.65;color:#423E37">
    Merci beaucoup, votre séance est réservée et votre acompte de 29 € a bien été reçu.
  </p>

  <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;margin:24px 0;width:100%">
    <tr style="border-bottom:1px solid #ECE4D6"><td style="padding:10px 0;color:#6A6358">Rendez-vous</td><td style="text-align:right;font-weight:600">${quand}</td></tr>
    <tr style="border-bottom:1px solid #ECE4D6"><td style="padding:10px 0;color:#6A6358">Adresse</td><td style="text-align:right;font-weight:600">${conf.lieu}</td></tr>
    <tr style="border-bottom:1px solid #ECE4D6"><td style="padding:10px 0;color:#6A6358">Formule</td><td style="text-align:right;font-weight:600">${f.nom}</td></tr>
    <tr><td style="padding:10px 0;color:#6A6358">Reste à régler sur place</td><td style="text-align:right;font-weight:600;color:#c2978f">${f.solde} € en espèces</td></tr>
  </table>

  <p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#26241F;margin:28px 0 6px">Comment s’habiller</p>
  <p style="font-size:15.5px;line-height:1.7;color:#423E37;margin:0">${conf.conseils}</p>

  <p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#26241F;margin:28px 0 6px">Un imprévu ?</p>
  <p style="font-size:15.5px;line-height:1.7;color:#423E37;margin:0">
    Vous pouvez déplacer votre séance <strong>une fois, sans frais</strong>, jusqu’à 72 h avant le rendez-vous.
    Écrivez-nous simplement, nous trouverons une autre date ensemble.
  </p>

  <p style="font-size:15.5px;line-height:1.7;color:#423E37;margin:26px 0 0">
    Le rendez-vous est joint à cet email, vous pouvez l’ajouter à votre agenda d’un geste.
  </p>

  <p style="margin-top:32px;font-size:15px;color:#6A6358">
    À très bientôt,<br><strong style="color:#26241F">Arthur</strong><br>
    <em>Amour et Lumière</em>
  </p>
</div>`;

  const ics = evenementIcs(c, conf, f);
  const piece = {
    name: 'seance-photo.ics',
    content: btoa(unescape(encodeURIComponent(ics))),
  };

  const envois = await Promise.allSettled([
    envoyerEmail(env, {
      to: env.STUDIO_EMAIL,
      subject: `Créneau réservé — ${quand} · ${c.nom}`,
      html: pourArthur,
      attachments: [piece],
    }),
    envoyerEmail(env, {
      to: c.email,
      subject: `Votre séance photo est confirmée — ${quand}`,
      html: pourClient,
      attachments: [piece],
    }),
  ]);
  for (const e of envois) {
    if (e.status === 'rejected') console.log('email en echec :', e.reason && e.reason.message);
    else if (!e.value.ok) console.log('Brevo refuse :', e.value.status, (await e.value.text()).slice(0, 200));
  }
}

async function envoyerEmail(env, { to, subject, html, attachments }) {
  // Brevo (ex-Sendinblue) : API transactionnelle, pièces jointes en base64.
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Amour et Lumière", email: env.FROM_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      attachment: attachments,
    }),
  });
}

/* ─────────────────────────  agenda Apple  ───────────────────────── */

/** Calendrier que l'agenda Apple relit tout seul. L'adresse contient un jeton
 *  secret : sans lui, personne ne peut lire les rendez-vous. */
async function agendaIcs(pathname, env) {
  const token = pathname.replace('/agenda/', '').replace(/\.ics$/, '');
  if (!env.AGENDA_TOKEN || token !== env.AGENDA_TOKEN) {
    return new Response('Not found', { status: 404 });
  }

  const { results } = await env.DB.prepare(
    `SELECT * FROM creneaux WHERE etat = 'reserve' ORDER BY jour, heure`
  ).all();

  const evenements = (results || [])
    .map((c) => {
      const conf = SITES[c.site] || SITES.begles;
      const f = conf.formules[c.formule] || { nom: c.formule || 'Séance', solde: '' };
      return corpsEvenement(c, conf, f);
    })
    .join('\r\n');

  const cal = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Amour et Lumiere//Reservations//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Séances Amour et Lumière',
    'X-PUBLISHED-TTL:PT15M',
    'REFRESH-INTERVAL;VALUE=DURATION:PT15M',
    evenements,
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');

  return new Response(cal, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'no-cache',
      ...CORS,
    },
  });
}

function evenementIcs(c, conf, f) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Amour et Lumiere//Reservations//FR',
    'METHOD:PUBLISH',
    corpsEvenement(c, conf, f),
    'END:VCALENDAR',
  ].join('\r\n');
}

function corpsEvenement(c, conf, f) {
  const debut = versUtc(c.jour, c.heure);
  const fin = versUtc(c.jour, c.heure, c.duree || 30);
  const titre = `Séance photo — ${c.nom || 'Client'} (${f.nom})`;
  const details = [
    `Formule : ${f.nom}`,
    `Client : ${c.nom || ''}`,
    `Téléphone : ${c.tel || '—'}`,
    `Email : ${c.email || '—'}`,
    `Acompte de 29 € réglé, solde de ${f.solde} € en espèces sur place.`,
  ].join('\\n');

  return [
    'BEGIN:VEVENT',
    `UID:${c.id}@amour-et-lumiere.com`,
    `DTSTAMP:${horodatageUtc(new Date())}`,
    `DTSTART:${debut}`,
    `DTEND:${fin}`,
    `SUMMARY:${echapperIcs(titre)}`,
    `LOCATION:${echapperIcs(conf.lieu)}`,
    `DESCRIPTION:${echapperIcs(details)}`,
    'END:VEVENT',
  ].join('\r\n');
}

/** Heure de Paris vers UTC. On demande à Intl quel décalage s'applique ce
 *  jour-là plutôt que de coder +2 en dur, sinon tout décale à l'heure d'hiver. */
function versUtc(jour, heure, ajoutMinutes = 0) {
  const [a, m, j] = jour.split('-').map(Number);
  const [h, mi] = heure.split(':').map(Number);
  const suppose = Date.UTC(a, m - 1, j, h, mi + ajoutMinutes);
  const decalage = decalageParis(new Date(suppose));
  return horodatageUtc(new Date(suppose - decalage * 60000));
}

function decalageParis(date) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  const local = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((local - date.getTime()) / 60000);
}

const horodatageUtc = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const echapperIcs = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\r?\n/g, '\\n');

/* ─────────────────────────  administration  ───────────────────────── */

function adminAutorise(request, env) {
  const donne = request.headers.get('X-Admin') || '';
  return env.ADMIN_MOT_DE_PASSE && donne === env.ADMIN_MOT_DE_PASSE;
}

/** Ouvre une journée ou un week-end d'un coup : pour chaque jour donné, un
 *  créneau toutes les N minutes entre l'heure de début et l'heure de fin. */
async function adminOuvrir(request, env) {
  const { site, jours, debut, fin, pas = 30 } = await request.json();
  if (!SITES[site]) return json({ erreur: 'Site inconnu' }, 400);
  if (!Array.isArray(jours) || !jours.length) return json({ erreur: 'Aucun jour indiqué' }, 400);

  const [hD, mD] = debut.split(':').map(Number);
  const [hF, mF] = fin.split(':').map(Number);
  const maintenant = new Date().toISOString();
  const lignes = [];

  for (const jour of jours) {
    for (let t = hD * 60 + mD; t + pas <= hF * 60 + mF; t += pas) {
      const heure = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
      const id = `${site}-${jour}-${heure.replace(':', '')}`;
      lignes.push(
        env.DB.prepare(
          `INSERT INTO creneaux (id, site, jour, heure, duree, etat, cree_le)
           VALUES (?1, ?2, ?3, ?4, ?5, 'libre', ?6)
           ON CONFLICT(id) DO NOTHING`
        ).bind(id, site, jour, heure, pas, maintenant)
      );
    }
  }

  await env.DB.batch(lignes);
  return json({ ok: true, crees: lignes.length });
}

async function adminEtat(request, env) {
  const { id, etat } = await request.json();
  if (!['libre', 'bloque', 'reserve'].includes(etat)) return json({ erreur: 'État inconnu' }, 400);

  if (etat === 'libre') {
    await env.DB.prepare(
      `UPDATE creneaux SET etat='libre', attente_fin=NULL, nom=NULL, email=NULL,
              tel=NULL, formule=NULL, message=NULL, stripe_id=NULL, reserve_le=NULL
        WHERE id=?1`
    ).bind(id).run();
  } else {
    await env.DB.prepare('UPDATE creneaux SET etat=?1 WHERE id=?2').bind(etat, id).run();
  }
  return json({ ok: true });
}

async function adminListe(url, env) {
  const site = url.searchParams.get('site') || 'begles';
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const { results } = await env.DB.prepare(
    `SELECT * FROM creneaux WHERE site=?1 AND jour >= ?2 ORDER BY jour, heure`
  ).bind(site, aujourdhui).all();
  return json({ creneaux: results || [] });
}

/* ─────────────────────────  utilitaires  ───────────────────────── */

/** Vérifie que la requête vient bien de Stripe (signature HMAC). */
async function signatureValide(corps, entete, secret) {
  if (!secret) return false;
  const parts = Object.fromEntries(entete.split(',').map((x) => x.split('=')));
  if (!parts.t || !parts.v1) return false;

  const cle = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cle, new TextEncoder().encode(`${parts.t}.${corps}`));
  const attendu = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');

  // comparaison à durée constante
  if (attendu.length !== parts.v1.length) return false;
  let diff = 0;
  for (let i = 0; i < attendu.length; i++) diff |= attendu.charCodeAt(i) ^ parts.v1.charCodeAt(i);
  return diff === 0;
}

const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function dateEnFrancais(jour) {
  const [a, m, j] = jour.split('-').map(Number);
  const d = new Date(Date.UTC(a, m - 1, j));
  return `${JOURS[d.getUTCDay()]} ${j} ${MOIS[m - 1]}`;
}

const prenomDe = (nom) => String(nom || '').trim().split(/\s+/)[0] || '';
const echapper = (s) => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

/* ─────────────────────────  page d'administration  ───────────────────────── */

function pageAdmin() {
  return new Response(PAGE_ADMIN, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

const PAGE_ADMIN = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Créneaux — Amour et Lumière</title>
<style>
:root{--rose:#c2978f;--encre:#26241F;--doux:#6A6358;--fond:#FBF7F2;--ligne:#ECE4D6}
*{box-sizing:border-box}
body{margin:0;background:var(--fond);color:var(--encre);font:15px/1.6 system-ui,-apple-system,sans-serif;padding:24px}
.boite{max-width:820px;margin:0 auto}
h1{font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 4px}
p.sous{color:var(--doux);margin:0 0 28px}
fieldset{border:1px solid var(--ligne);border-radius:14px;padding:18px 20px;margin:0 0 22px;background:#fff}
legend{padding:0 8px;color:var(--doux);font-size:13px;text-transform:uppercase;letter-spacing:.08em}
label{display:block;font-size:13px;color:var(--doux);margin:12px 0 4px}
input,select{width:100%;padding:10px 12px;border:1px solid var(--ligne);border-radius:9px;font:inherit;background:#fff}
.rangee{display:flex;gap:12px;flex-wrap:wrap}.rangee>div{flex:1;min-width:130px}
button{background:var(--rose);color:#fff;border:0;border-radius:999px;padding:11px 22px;font:inherit;font-weight:600;cursor:pointer;margin-top:16px}
button.discret{background:none;color:var(--rose);border:1px solid var(--rose);padding:5px 12px;font-size:13px;margin:0}
table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;color:var(--doux);font-weight:500;font-size:12px;text-transform:uppercase;letter-spacing:.06em;padding:8px 6px;border-bottom:1px solid var(--ligne)}
td{padding:9px 6px;border-bottom:1px solid var(--ligne);vertical-align:middle}
.etat{font-size:12px;padding:3px 9px;border-radius:999px;white-space:nowrap}
.libre{background:#EAF3EA;color:#3D6B45}.reserve{background:#F6E6E2;color:#9C5F52}
.bloque{background:#EEE;color:#666}.attente{background:#FDF3E0;color:#8A6A2A}
.msg{padding:10px 14px;border-radius:9px;margin-bottom:16px;display:none}
.ok{background:#EAF3EA;color:#3D6B45}.ko{background:#F8E6E6;color:#A3453C}
</style></head><body><div class="boite">
<h1>Créneaux de séance</h1>
<p class="sous">Ouvre un week-end, vois les réservations, bloque un horaire.</p>
<div id="msg" class="msg"></div>

<fieldset><legend>Accès</legend>
  <label>Mot de passe</label>
  <input type="password" id="mdp" placeholder="Ton mot de passe d'administration">
  <label>Lieu</label>
  <select id="site"><option value="begles">Bègles</option><option value="arcachon">Arcachon</option></select>
  <button onclick="charger()">Voir les créneaux</button>
</fieldset>

<fieldset><legend>Ouvrir des journées</legend>
  <div class="rangee">
    <div><label>Du</label><input type="date" id="j1"></div>
    <div><label>Au</label><input type="date" id="j2"></div>
    <div><label>De</label><input type="time" id="h1" value="11:00"></div>
    <div><label>À</label><input type="time" id="h2" value="19:00"></div>
    <div><label>Créneau</label><select id="pas"><option value="30">30 min</option><option value="45">45 min</option><option value="60">1 h</option></select></div>
  </div>
  <button onclick="ouvrir()">Ouvrir ces journées</button>
</fieldset>

<fieldset><legend>Les créneaux</legend><div id="liste">Entre ton mot de passe puis clique sur « Voir les créneaux ».</div></fieldset>
</div>
<script>
const $=(s)=>document.querySelector(s);
const mdp=()=>$('#mdp').value.trim();
function dire(t,ok){const m=$('#msg');m.textContent=t;m.className='msg '+(ok?'ok':'ko');m.style.display='block';setTimeout(()=>m.style.display='none',4000)}
async function api(chemin,options={}){
  const r=await fetch(chemin,{...options,headers:{'Content-Type':'application/json','X-Admin':mdp(),...(options.headers||{})}});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(d.erreur||'Erreur');
  return d;
}
async function charger(){
  try{
    const d=await api('/admin/liste?site='+$('#site').value);
    afficher(d.creneaux);
  }catch(e){dire(e.message,false);$('#liste').textContent='';}
}
function afficher(cs){
  if(!cs.length){$('#liste').textContent='Aucun créneau ouvert pour l\\'instant.';return}
  const parJour={};
  cs.forEach(c=>{(parJour[c.jour]=parJour[c.jour]||[]).push(c)});
  $('#liste').innerHTML=Object.entries(parJour).map(([jour,l])=>{
    const lignes=l.map(c=>{
      const cl=c.etat==='attente'?'attente':c.etat;
      const qui=c.etat==='reserve'?(c.nom||'')+(c.tel?' · '+c.tel:'')+(c.formule?' · '+c.formule:''):'';
      const bouton=c.etat==='reserve'
        ? '<button class="discret" onclick="etat(\\''+c.id+'\\',\\'libre\\')">Annuler</button>'
        : c.etat==='bloque'
          ? '<button class="discret" onclick="etat(\\''+c.id+'\\',\\'libre\\')">Rouvrir</button>'
          : '<button class="discret" onclick="etat(\\''+c.id+'\\',\\'bloque\\')">Bloquer</button>';
      return '<tr><td>'+c.heure+'</td><td><span class="etat '+cl+'">'+c.etat+'</span></td><td>'+qui+'</td><td style="text-align:right">'+bouton+'</td></tr>';
    }).join('');
    return '<h3 style="font-family:Georgia,serif;font-weight:400;margin:22px 0 6px">'+jour+'</h3><table>'+lignes+'</table>';
  }).join('');
}
async function etat(id,etat){
  try{await api('/admin/etat',{method:'POST',body:JSON.stringify({id,etat})});charger()}catch(e){dire(e.message,false)}
}
async function ouvrir(){
  const j1=$('#j1').value,j2=$('#j2').value||$('#j1').value;
  if(!j1){dire('Choisis au moins une date.',false);return}
  const jours=[];for(let d=new Date(j1);d<=new Date(j2);d.setDate(d.getDate()+1))jours.push(d.toISOString().slice(0,10));
  try{
    const d=await api('/admin/ouvrir',{method:'POST',body:JSON.stringify({site:$('#site').value,jours,debut:$('#h1').value,fin:$('#h2').value,pas:+$('#pas').value})});
    dire(d.crees+' créneaux ouverts.',true);charger();
  }catch(e){dire(e.message,false)}
}
</script></body></html>`;
