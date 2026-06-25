const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const LABELS = {
  role:       { owner: 'Propriétaire / Gérante', manager: 'Responsable (décide du budget)', staff: 'Esthéticienne salariée' },
  age:        { new: "Moins d'un an", '1-3': '1 à 3 ans', '3+': 'Plus de 3 ans' },
  newclients: { '0-5': 'Moins de 5/mois', '5-15': '5 à 15/mois', '15+': 'Plus de 15/mois' },
  revenue:    { '<5k': 'Moins de 5 000 €', '5-15k': '5 000 – 15 000 €', '15k+': 'Plus de 15 000 €' },
  ads:        { never: 'Jamais', tried: 'Oui, sans résultats', active: 'Oui, ça fonctionne' },
  budget:     { yes: 'Oui, prête à investir', maybe: 'Dépend du retour', no: "Pas pour l'instant" },
  tarif:      { '1190': '1 190 € / mois', '1640': '1 640 € / mois', '2090': '2 090 € / mois', unknown: 'À discuter' },
};

function label(key, val) {
  return (LABELS[key] && LABELS[key][val]) || val || '—';
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const { pathname } = new URL(request.url);

    if (pathname === '/lead' && request.method === 'POST') {
      const answers = await request.json();

      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#14100D">
  <h2 style="font-family:Georgia,serif;font-weight:400;color:#9A7B43;margin-bottom:24px">
    Nouveau RDV — Funnel Institut
  </h2>
  <table style="border-collapse:collapse;font-size:15px;width:100%">
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665;width:45%">Ville</td>
      <td style="padding:10px 0;font-weight:600">${answers.ville || '—'}</td>
    </tr>
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665">Rôle</td>
      <td style="padding:10px 0;font-weight:600">${label('role', answers.role)}</td>
    </tr>
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665">Ancienneté du centre</td>
      <td style="padding:10px 0;font-weight:600">${label('age', answers.age)}</td>
    </tr>
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665">Nouvelles clientes/mois</td>
      <td style="padding:10px 0;font-weight:600">${label('newclients', answers.newclients)}</td>
    </tr>
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665">CA mensuel</td>
      <td style="padding:10px 0;font-weight:600">${label('revenue', answers.revenue)}</td>
    </tr>
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665">Meta Ads</td>
      <td style="padding:10px 0;font-weight:600">${label('ads', answers.ads)}</td>
    </tr>
    <tr style="border-bottom:1px solid #E7DACB">
      <td style="padding:10px 16px 10px 0;color:#8A7665">Budget</td>
      <td style="padding:10px 0;font-weight:600">${label('budget', answers.budget)}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px 10px 0;color:#8A7665">Tarif choisi</td>
      <td style="padding:10px 0;font-weight:600">${label('tarif', answers.tarif)}</td>
    </tr>
  </table>
</div>
</body></html>`;

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Funnel Institut', email: 'noreply@arthurdefoin.com' },
          to: [{ email: env.NOTIFY_EMAIL || 'defoin.arthur@gmail.com' }],
          subject: `Nouveau RDV funnel — ${answers.ville || 'ville inconnue'}`,
          htmlContent: html,
        }),
      });

      const ok = res.status < 300;
      return new Response(JSON.stringify({ ok }), {
        status: ok ? 200 : 500,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
