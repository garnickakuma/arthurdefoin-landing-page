/**
 * Cloudflare Pages Function — réception du formulaire d'inscription cours photo.
 * POST /api/inscription  ->  envoie un email récap à Arthur via Brevo.
 *
 * Variables d'environnement (à définir dans Cloudflare Pages → Settings → Env vars) :
 *   BREVO_API_KEY     : clé API Brevo (secrète)
 *   FORM_TO_EMAIL     : email qui reçoit les demandes (ex: defoin.arthur@gmail.com)
 *   FORM_FROM_EMAIL   : expéditeur validé Brevo sur le domaine (ex: contact@amour-et-lumiere.com)
 */

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const estEmail = (s) => /.+@.+\..+/.test(s);
const echap = (s) =>
  String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "json invalide" }, 400);
  }

  // Anti-spam : si le champ piège est rempli, c'est un bot -> on fait mine d'accepter.
  if (data.website) return json({ ok: true });

  const nom = (data.nom || "").trim();
  const email = (data.email || "").trim();
  const tel = (data.tel || "").trim();
  if (!nom || !email || !tel) return json({ error: "champs requis" }, 400);

  const cours = Array.isArray(data.cours) && data.cours.length ? data.cours.join(", ") : "—";
  const dispos = Array.isArray(data.dispos) && data.dispos.length ? data.dispos.join(", ") : "—";
  const format = data.format || "—";
  const niveau = data.niveau || "—";

  const to = env.FORM_TO_EMAIL || "defoin.arthur@gmail.com";
  const from = env.FORM_FROM_EMAIL || to;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#3a322c;">
      <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c2978f;margin:0 0 4px;">Cours photo — nouvelle demande</p>
      <h1 style="font-size:20px;margin:0 0 18px;color:#2b2521;">${echap(nom)}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:7px 0;color:#6e665b;width:130px;">Email</td><td style="padding:7px 0;font-weight:600;">${echap(email)}</td></tr>
        <tr><td style="padding:7px 0;color:#6e665b;">Téléphone</td><td style="padding:7px 0;font-weight:600;">${echap(tel)}</td></tr>
        <tr><td style="padding:7px 0;color:#6e665b;">Cours voulu(s)</td><td style="padding:7px 0;font-weight:600;">${echap(cours)}</td></tr>
        <tr><td style="padding:7px 0;color:#6e665b;">Format</td><td style="padding:7px 0;font-weight:600;">${echap(format)}</td></tr>
        <tr><td style="padding:7px 0;color:#6e665b;">Niveau</td><td style="padding:7px 0;font-weight:600;">${echap(niveau)}</td></tr>
        <tr><td style="padding:7px 0;color:#6e665b;">Disponibilités</td><td style="padding:7px 0;font-weight:600;">${echap(dispos)}</td></tr>
      </table>
    </div>`;

  const payload = {
    sender: { name: "Formation Amour et Lumière", email: from },
    to: [{ email: to }],
    subject: `🎓 Cours photo — ${nom}`,
    htmlContent: html,
  };
  // Répondre directement au prospect depuis Gmail.
  if (estEmail(email)) payload.replyTo = { email, name: nom };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    return json({ error: "envoi", detail }, 502);
  }
  return json({ ok: true });
}
