// Callback.jsx — prise de rendez-vous : le prospect chaud réserve directement
// un créneau d'appel avec Arthur via Calendly (vraies disponibilités), au lieu
// de remplir un formulaire. Le widget Calendly est embarqué et habillé aux
// couleurs de la marque (lues dynamiquement depuis les tokens CSS).
const { useEffect: useEffectCb, useRef: useRefCb } = React;

const CALENDLY_URL = 'https://calendly.com/defoin-arthur/accompagnement-arthur';

// Icônes en SVG inline (Lucide) — pas de dépendance à lucide.createIcons().
const ICO_PATHS = {
  video: 'Pm22 8-6 4 6 4V8Z|R2,6,14,12,2',
  clock: 'C12,12,10|PM12 6 12 12 16 14',
  user: 'PM19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2|C12,7,4',
  shield: 'PM20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z|Pm9 12 2 2 4-4'
};
function Ico({ n }) {
  const parts = (ICO_PATHS[n] || '').split('|');
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {parts.map((p, i) => {
        if (p.startsWith('C')) {const [, x, y, r] = p.split(',');return <circle key={i} cx={x} cy={y} r={r} />;}
        if (p.startsWith('R')) {const [, x, y, w, h, rx] = p.split(',');return <rect key={i} x={x} y={y} width={w} height={h} rx={rx} ry={rx} />;}
        return <path key={i} d={p.replace(/^P/, '')} />;
      })}
    </svg>);

}

// Charge le script Calendly une seule fois et résout quand window.Calendly existe.
let calendlyPromise = null;
function chargerCalendly() {
  if (window.Calendly) return Promise.resolve();
  if (calendlyPromise) return calendlyPromise;
  calendlyPromise = new Promise((resolve) => {
    if (!document.querySelector('link[data-calendly]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://assets.calendly.com/assets/external/widget.css';
      l.setAttribute('data-calendly', '');
      document.head.appendChild(l);
    }
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
  return calendlyPromise;
}

function Callback() {
  const hote = useRefCb(null);

  useEffectCb(() => {
    let annule = false;
    chargerCalendly().then(() => {
      if (annule || !hote.current || !window.Calendly) return;
      hote.current.innerHTML = '';
      // Couleurs lues depuis les tokens de la marque pour s'accorder à la variante.
      const cs = getComputedStyle(document.documentElement);
      const hex = (v, f) => cs.getPropertyValue(v).trim().replace('#', '') || f;
      const params = new URLSearchParams({
        hide_event_type_details: '1',
        hide_gdpr_banner: '1',
        primary_color: hex('--or', 'a98b5c'),
        background_color: hex('--porcelaine', 'fbf9f5'),
        text_color: hex('--encre', '1a1a18')
      });
      window.Calendly.initInlineWidget({
        url: `${CALENDLY_URL}?${params.toString()}`,
        parentElement: hote.current
      });
    });
    return () => {annule = true;};
  }, []);

  return (
    <section className="section callback" id="rappel">
      <div className="container">
        <div className="callback-inner">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>
              <span className="num">06</span>
              <span>On en parle&nbsp;?</span>
            </div>
            <h2>
              <span className="small-lead">Choisissez l'heure qui vous arrange,</span>
              et <em>parlons-en</em>.
            </h2>
            <p className="lede">30 minutes en appel, juste vous et moi. On regarde votre studio, vos objectifs, et ce que la publicité Meta peut vraiment rapporter à votre activité. La publicité n'est pas une dépense, c'est un investissement.




            </p>
            <div className="cb-assur">
              <span><Ico n="video" /> Appel de <strong>30 min</strong></span>
              <span><Ico n="user" /> En direct avec <strong>Arthur</strong></span>
              <span><Ico n="shield" /> Aucun <strong>engagement</strong></span>
            </div>
          </div>

          <div className="cb-form cb-sched">
            <div className="sched-head">
              <div className="sched-host">
                <span className="sched-avatar">Ad</span>
                <span className="who">
                  <span className="n">Arthur Defoin</span>
                  <span className="d">Appel découverte · Meta Ads photographes</span>
                </span>
              </div>
              <div className="sched-meta">
                <span><Ico n="clock" /> 30 min</span>
                <span><Ico n="video" /> Appel téléphonique</span>
              </div>
            </div>
            <div className="cb-cal" ref={hote}>
              <div className="cb-cal-load">Chargement de mon agenda…</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Callback = Callback;