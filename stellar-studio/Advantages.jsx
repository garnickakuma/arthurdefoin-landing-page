const ADVANTAGES = [
  {
    idx: '01', accent: 'var(--c-amber)',
    title: 'Une image qui vous distingue',
    text: "Dans une scène saturée, votre visuel décide en une seconde. On crée une signature qui ne ressemble qu'à vous — pas à un filtre de plus.",
  },
  {
    idx: '02', accent: 'var(--c-magenta)',
    title: 'Une direction artistique sur-mesure',
    text: 'Couleur, lumière, posing, décor : chaque séance est pensée autour de votre univers. Audran dirige, vous rayonnez.',
  },
  {
    idx: '03', accent: 'var(--c-teal)',
    title: 'Des visuels prêts pour tous vos canaux',
    text: 'Pochette, presse, affiche, feed, clip promo. Vous repartez avec des fichiers calibrés print & web, livrés retouchés.',
  },
  {
    idx: '04', accent: 'var(--c-blue)',
    title: "Un studio à la hauteur de vos ambitions",
    text: "300 m² suréquipés à Aubervilliers : fonds couleur, parc lumière Profoto, espaces maquillage. Tout est là pour viser haut.",
  },
];

function Advantages() {
  return (
    <section id="avantages" style={{
      position: 'relative', zIndex: 2,
      background: 'var(--ink-850)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)', margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)',
      }}>
        <div data-reveal style={{ maxWidth: 640, marginBottom: 'clamp(36px,5vw,64px)' }}>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
            color: 'var(--c-magenta)',
            display: 'inline-flex', alignItems: 'center', gap: '.7em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-magenta)', boxShadow: '0 0 8px var(--c-magenta)' }} />
            02 · Pourquoi Stellar
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            letterSpacing: 'var(--track-display)', lineHeight: 'var(--lh-snug)',
            fontSize: 'var(--t-display)',
            margin: 'var(--s-5) 0 0', textTransform: 'uppercase',
          }}>
            Valorisez votre{' '}
            <span style={{ color: 'var(--amber)' }}>image de marque</span>.
          </h2>
        </div>

        <div className="adv-grid" data-reveal style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
        }}>
          {ADVANTAGES.map(adv => (
            <div key={adv.idx} className="adv-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                <span style={{
                  width: 9, height: 9, borderRadius: '50%',
                  background: adv.accent, boxShadow: `0 0 12px ${adv.accent}`,
                  flex: 'none',
                }} />
                <span style={{
                  fontFamily: 'var(--font-techno)', fontSize: '.72rem',
                  letterSpacing: '.22em', color: 'var(--text-3)',
                }}>
                  {adv.idx}
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
                fontSize: 'var(--t-h3)', letterSpacing: 'var(--track-tight)',
                lineHeight: 'var(--lh-snug)', margin: 0, color: 'var(--text-1)',
              }}>
                {adv.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)',
                lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)', margin: 0,
              }}>
                {adv.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
