const PLANS = [
  {
    tier: 'Express', duration: '1 heure', photos: 3, amount: 150,
    note: 'Premier shooting', accent: 'var(--c-teal)', featured: false,
    features: ['1 décor couleur', 'Direction artistique', 'Retouche pro incluse', 'Livraison sous 5 jours'],
  },
  {
    tier: 'Duo', duration: '2 heures', photos: 6, amount: 280,
    note: 'Le plus polyvalent', accent: 'var(--c-blue)', featured: false,
    features: ['2 décors couleur', 'Direction artistique', 'Retouche pro incluse', 'Fichiers print & web'],
  },
  {
    tier: 'Signature', duration: 'Demi-journée', photos: 15, amount: 480,
    note: 'Le choix des artistes', accent: 'var(--c-amber)', featured: true, flag: 'Populaire',
    features: ['4 décors couleur', 'Stylisme & lumière sur-mesure', 'Retouche prioritaire', 'Fichiers HD print & web', 'Mini clip backstage'],
  },
  {
    tier: 'Icône', duration: 'Journée complète', photos: 30, amount: 850,
    note: 'Campagne complète', accent: 'var(--c-violet)', featured: false,
    features: ['Décors illimités', 'Équipe complète sur le plateau', 'Retouche premium', "Banque d'images campagne", 'Clip backstage + reels'],
  },
];

function PricingCard({ plan, waLink }) {
  return (
    <div
      data-card
      style={{
        flex: '0 0 clamp(270px,78vw,340px)',
        scrollSnapAlign: 'center',
        display: 'flex',
      }}
    >
      <div
        className={`pricing-card${plan.featured ? ' featured' : ''}`}
        style={{ width: '100%', borderColor: plan.featured ? 'rgba(242,166,60,.35)' : undefined }}
      >
        {plan.flag && (
          <span style={{
            position: 'absolute', top: 20, right: 20,
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.6rem', letterSpacing: '.16em',
            background: 'var(--amber)', color: 'var(--text-on-accent)',
            padding: '4px 10px', borderRadius: 'var(--r-pill)',
          }}>
            {plan.flag}
          </span>
        )}

        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.68rem', letterSpacing: '.2em', color: plan.accent, margin: '0 0 8px',
          }}>
            {plan.tier}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
              fontSize: 'clamp(2rem,5vw,2.8rem)', color: 'var(--text-1)', lineHeight: 1,
            }}>
              {plan.amount} €
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-techno)', fontSize: '.64rem',
            letterSpacing: '.14em', color: 'var(--text-3)', margin: '6px 0 0',
            textTransform: 'uppercase',
          }}>
            {plan.note}
          </p>
        </div>

        <div style={{
          borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
          padding: '16px 0', marginBottom: 20,
          display: 'flex', gap: 20,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: '1.2rem', margin: 0, color: 'var(--text-1)' }}>{plan.duration}</p>
            <p style={{ fontFamily: 'var(--font-techno)', fontSize: '.6rem', letterSpacing: '.14em', color: 'var(--text-3)', margin: '4px 0 0', textTransform: 'uppercase' }}>Durée</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: '1.2rem', margin: 0, color: 'var(--text-1)' }}>{plan.photos}</p>
            <p style={{ fontFamily: 'var(--font-techno)', fontSize: '.6rem', letterSpacing: '.14em', color: 'var(--text-3)', margin: '4px 0 0', textTransform: 'uppercase' }}>Photos livrées</p>
          </div>
        </div>

        <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {plan.features.map((f, i) => (
            <li key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: '.9rem',
              lineHeight: 1.5, color: 'var(--text-2)',
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <span style={{ color: plan.accent, flex: 'none', marginTop: 2 }}>✦</span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href={waLink}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5em',
            padding: '.75rem 1.2rem', borderRadius: 'var(--r-pill)',
            background: plan.featured ? 'var(--amber)' : 'transparent',
            color: plan.featured ? 'var(--text-on-accent)' : 'var(--text-1)',
            border: `1px solid ${plan.featured ? 'var(--amber)' : 'var(--line-strong)'}`,
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.72rem', letterSpacing: '.12em', textDecoration: 'none',
            fontWeight: 'var(--fw-semi)', transition: 'background .2s, border-color .2s',
          }}
          onMouseEnter={e => {
            if (plan.featured) { e.currentTarget.style.background = 'var(--amber-bright)'; e.currentTarget.style.borderColor = 'var(--amber-bright)'; }
            else { e.currentTarget.style.borderColor = 'var(--text-2)'; }
          }}
          onMouseLeave={e => {
            if (plan.featured) { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.borderColor = 'var(--amber)'; }
            else { e.currentTarget.style.borderColor = 'var(--line-strong)'; }
          }}
        >
          Réserver →
        </a>
      </div>
    </div>
  );
}

function Pricing() {
  const [active, setActive] = React.useState(2);
  const trackRef = React.useRef(null);

  const waLink = "https://wa.me/33668019999?text=" +
    encodeURIComponent("Bonjour Audran, je souhaite réserver une séance photo au studio Stellar.");

  const getCards = () => {
    if (!trackRef.current) return [];
    return Array.from(trackRef.current.querySelectorAll('[data-card]'));
  };

  const goCard = React.useCallback((i, smooth = true) => {
    const track = trackRef.current;
    const cards = getCards();
    const idx = Math.max(0, Math.min(cards.length - 1, i));
    if (!track || !cards[idx]) return;
    const c = cards[idx];
    const left = c.offsetLeft - (track.clientWidth - c.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = getCards();
      if (!cards.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(prev => prev !== best ? best : prev);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(() => requestAnimationFrame(() => goCard(2, false)));
    return () => track.removeEventListener('scroll', onScroll);
  }, [goCard]);

  return (
    <section id="tarifs" style={{
      position: 'relative', zIndex: 2,
      background: 'var(--ink-850)',
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', maxWidth: 900, height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--glow-amber), transparent 65%)',
        filter: 'blur(30px)',
      }} />

      <div style={{ position: 'relative', maxWidth: 'var(--maxw)', margin: '0 auto', padding: 'var(--section-y) 0' }}>
        <div data-reveal style={{
          maxWidth: 640, margin: '0 auto clamp(36px,5vw,56px)',
          padding: '0 var(--gutter)', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
            color: 'var(--amber)',
            display: 'inline-flex', alignItems: 'center', gap: '.7em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 8px var(--amber)' }} />
            04 · Les Tarifs
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            letterSpacing: 'var(--track-display)', lineHeight: 'var(--lh-snug)',
            fontSize: 'var(--t-display)', margin: 'var(--s-5) 0 var(--s-4)', textTransform: 'uppercase',
          }}>
            Choisissez votre <span style={{ color: 'var(--amber)' }}>intensité</span>.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)',
            lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)', margin: 0, maxWidth: '46ch',
          }}>
            De l'essai express à la campagne complète. Glissez pour comparer — chaque palier décide du nombre de photos livrées.
          </p>
        </div>

        <div id="pricing-track" data-reveal ref={trackRef}>
          {PLANS.map((plan, i) => <PricingCard key={i} plan={plan} waLink={waLink} />)}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'var(--s-6)', marginTop: 'var(--s-8)', padding: '0 var(--gutter)',
        }}>
          <button className="carousel-btn" onClick={() => goCard(active - 1)} aria-label="Tarif précédent">←</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {PLANS.map((_, i) => (
              <button
                key={i}
                className="dot-btn"
                onClick={() => goCard(i)}
                aria-label={`Aller au tarif ${PLANS[i].tier}`}
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? 'var(--amber)' : 'var(--ink-500)',
                  boxShadow: i === active ? '0 0 12px var(--amber)' : 'none',
                }}
              />
            ))}
          </div>

          <button className="carousel-btn" onClick={() => goCard(active + 1)} aria-label="Tarif suivant">→</button>
        </div>
      </div>
    </section>
  );
}
