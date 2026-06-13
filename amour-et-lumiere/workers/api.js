/**
 * Cloudflare Worker — Amour et Lumière API
 *
 * Routes :
 *   POST /create-payment-intent   → crée un Stripe PaymentIntent, renvoie clientSecret
 *   POST /send-confirmation       → envoie les emails (notification Arthur + confirmation client)
 *
 * Variables d'env à définir dans Cloudflare Workers → Settings → Variables :
 *   STRIPE_SECRET_KEY   sk_live_...
 *   RESEND_API_KEY      re_...
 *   STUDIO_EMAIL        defoin.arthur@gmail.com
 *   FROM_EMAIL          reservations@amouretlumiere.fr  (domaine vérifié sur Resend)
 *
 * Déploiement :
 *   cd workers && npx wrangler deploy
 * Ou via le dashboard Cloudflare Workers en collant ce fichier.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const { pathname } = new URL(request.url);

    if (pathname === '/create-payment-intent' && request.method === 'POST') {
      return createPaymentIntent(request, env);
    }
    if (pathname === '/send-confirmation' && request.method === 'POST') {
      return sendConfirmation(request, env);
    }

    return new Response('Not found', { status: 404 });
  },
};

/* ── Stripe : créer un PaymentIntent ─────────────────────── */
async function createPaymentIntent(request, env) {
  const { amount, currency = 'eur', metadata = {} } = await request.json();

  if (!Number.isInteger(amount) || amount < 100) {
    return json({ error: 'Montant invalide' }, 400);
  }

  const body = new URLSearchParams({ amount, currency, 'automatic_payment_methods[enabled]': 'true' });
  for (const [k, v] of Object.entries(metadata)) body.set(`metadata[${k}]`, String(v));

  const res = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const pi = await res.json();
  if (pi.error) return json({ error: pi.error.message }, 400);

  return json({ clientSecret: pi.client_secret });
}

/* ── Resend : envoyer les deux emails ────────────────────── */
async function sendConfirmation(request, env) {
  const { paymentIntentId, contact, formule, prest, pack, total, bw } = await request.json();

  const formuleName = formule === 'studio' ? 'En studio' : 'En extérieur';
  const clientName  = `${contact.prenom} ${contact.nom}`.trim();
  const packLabel   = `${pack}${bw ? ' + Noir & Blanc' : ''}`;

  // Email interne — Arthur reçoit toutes les infos
  const notifHtml = `
<h2 style="font-family:Georgia,serif;color:#26241F">Nouvelle réservation confirmée 🎉</h2>
<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Client</td><td><strong>${clientName}</strong></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Email</td><td>${contact.email}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Téléphone</td><td>${contact.tel || '—'}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Formule</td><td>${formuleName}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Prestation</td><td>${prest}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Pack</td><td>${packLabel}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Total réglé</td><td><strong>${total}</strong></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6A6358">Stripe ID</td><td style="font-size:12px;color:#8B8374">${paymentIntentId}</td></tr>
</table>
${contact.message ? `<p style="margin-top:16px;font-family:system-ui;font-size:15px"><strong>Message :</strong> ${contact.message}</p>` : ''}`;

  // Email client — confirmation sobre
  const confirmHtml = `
<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#26241F">
  <p style="font-size:22px;font-weight:300;margin-bottom:8px">Bonjour ${contact.prenom},</p>
  <p style="font-size:16px;line-height:1.6;color:#423E37">
    Votre réservation est confirmée et votre paiement reçu. Merci de votre confiance !
  </p>
  <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;margin:24px 0;width:100%">
    <tr style="border-bottom:1px solid #ECE4D6"><td style="padding:10px 0;color:#6A6358">Formule</td><td style="text-align:right;font-weight:600">${formuleName}</td></tr>
    <tr style="border-bottom:1px solid #ECE4D6"><td style="padding:10px 0;color:#6A6358">Prestation</td><td style="text-align:right;font-weight:600">${prest}</td></tr>
    <tr style="border-bottom:1px solid #ECE4D6"><td style="padding:10px 0;color:#6A6358">Pack</td><td style="text-align:right;font-weight:600">${packLabel}</td></tr>
    <tr><td style="padding:10px 0;color:#6A6358">Total réglé</td><td style="text-align:right;font-weight:600;color:#56653F">${total}</td></tr>
  </table>
  <p style="font-size:16px;line-height:1.6;color:#423E37">
    Nous vous contacterons très prochainement pour fixer votre créneau ensemble.
  </p>
  <p style="margin-top:32px;font-size:15px;color:#6A6358">
    À très bientôt,<br>
    <strong style="color:#26241F">Arthur &amp; Pierre-Henri</strong><br>
    <em>Amour et Lumière — Studio photo à Bègles</em>
  </p>
</div>`;

  await Promise.allSettled([
    sendEmail(env, {
      to:      env.STUDIO_EMAIL,
      subject: `Réservation — ${clientName} · ${total}`,
      html:    notifHtml,
    }),
    sendEmail(env, {
      to:      contact.email,
      subject: 'Votre réservation est confirmée — Amour et Lumière',
      html:    confirmHtml,
    }),
  ]);

  return json({ ok: true });
}

async function sendEmail(env, { to, subject, html }) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    env.FROM_EMAIL || 'Amour et Lumière <reservations@amouretlumiere.fr>',
      to:      [to],
      subject,
      html,
    }),
  });
}
