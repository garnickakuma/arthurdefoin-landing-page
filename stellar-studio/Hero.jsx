function Btn({ href, variant = 'primary', size = 'md', children }) {
  const lg = size === 'lg';
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '.5em',
    padding: lg ? '.85rem 1.6rem' : '.55rem 1.1rem',
    borderRadius: 'var(--r-pill)',
    fontFamily: 'var(--font-techno)',
    textTransform: 'uppercase',
    fontSize: lg ? '.82rem' : '.72rem',
    letterSpacing: '.12em',
    textDecoration: 'none',
    fontWeight: 'var(--fw-semi)',
    transition: 'background .2s, color .2s, border-color .2s',
    cursor: 'pointer',
    border: '1px solid transparent',
  };
  const styles = variant === 'primary'
    ? { ...base, background: 'var(--amber)', color: 'var(--text-on-accent)', borderColor: 'var(--amber)' }
    : { ...base, background: 'transparent', color: 'var(--text-1)', borderColor: 'var(--line-strong)' };

  return (
    <a href={href} style={styles}
      onMouseEnter={e => {
        if (variant === 'primary') { e.currentTarget.style.background = 'var(--amber-bright)'; e.currentTarget.style.borderColor = 'var(--amber-bright)'; }
        else { e.currentTarget.style.borderColor = 'var(--text-2)'; }
      }}
      onMouseLeave={e => {
        if (variant === 'primary') { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.borderColor = 'var(--amber)'; }
        else { e.currentTarget.style.borderColor = 'var(--line-strong)'; }
      }}
    >
      {children}
    </a>
  );
}

function GlowDot({ color = 'var(--amber)', size = 6 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      background: color, boxShadow: `0 0 ${size + 4}px ${color}`,
      display: 'inline-block', flex: 'none',
    }} />
  );
}

function StatBlock({ value, suffix, label, accent = 'var(--amber)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          letterSpacing: '-0.02em', color: 'var(--text-1)', lineHeight: 1,
        }}>{value}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: '1.1rem', color: accent }}>{suffix}</span>
      </div>
      <span style={{
        fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
        fontSize: '.65rem', letterSpacing: '.18em', color: 'var(--text-3)',
        display: 'flex', alignItems: 'center', gap: '.5em',
      }}>
        <GlowDot color={accent} size={5} />
        {label}
      </span>
    </div>
  );
}

const WA_LINK = "https://wa.me/33668019999?text=" +
  encodeURIComponent("Bonjour Audran, je souhaite réserver une séance photo au studio Stellar.");

function Hero() {
  return (
    <section id="top" style={{
      position: 'relative', zIndex: 2,
      maxWidth: 'var(--maxw)', margin: '0 auto',
      padding: 'calc(var(--section-y) + 64px) var(--gutter) var(--section-y)',
    }}>
      {/* Halo ambre */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '8%', right: '-6%',
        width: '60vw', maxWidth: 760, height: 760,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 50%, var(--glow-amber), transparent 62%)',
        filter: 'blur(20px)', zIndex: -1,
        animation: 'stl-pulse 9s ease-in-out infinite',
      }} />

      {/* 2-col grid */}
      <div className="hero-grid" data-reveal style={{
        display: 'grid', gridTemplateColumns: '1.05fr .95fr',
        gap: 'clamp(32px,5vw,72px)', alignItems: 'center',
      }}>
        {/* Text col */}
        <div>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
            color: 'var(--text-2)',
            display: 'inline-flex', alignItems: 'center', gap: '.7em',
            marginBottom: 'var(--s-6)',
          }}>
            <GlowDot />
            Studio photo · Artistes · Aubervilliers
          </span>

          <h1 className="hero-h1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            letterSpacing: 'var(--track-hero)', lineHeight: 'var(--lh-tight)',
            fontSize: 'clamp(3rem,7vw,6rem)',
            textTransform: 'uppercase',
            margin: '0 0 var(--s-6)',
            color: 'var(--text-1)',
          }}>
            Votre image<br />mérite une{' '}
            <span style={{ color: 'var(--amber)' }}>légende</span>.
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--t-lead)',
            lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)',
            maxWidth: '46ch', margin: '0 0 var(--s-8)',
          }}>
            Chanteurs, rappeurs, danseurs, créateurs : Audran Sarzier dirige des séances photo studio qui transforment votre talent en image de marque.{' '}
            <span style={{ color: 'var(--text-1)' }}>Un univers, votre couleur — et la lumière qui change tout.</span>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-4)', alignItems: 'center' }}>
            <Btn href={WA_LINK} variant="primary" size="lg">Contactez-moi sur WhatsApp →</Btn>
            <Btn href="#galerie" variant="secondary" size="lg">Voir la galerie</Btn>
          </div>
        </div>

        {/* Portrait col */}
        <div className="hero-portrait" style={{ position: 'relative' }}>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: '-8% -6%',
            borderRadius: 'var(--r-2xl)',
            background: 'radial-gradient(120% 100% at 70% 30%, var(--glow-amber), transparent 60%)',
            filter: 'blur(10px)',
          }} />
          <div style={{
            position: 'relative', borderRadius: 'var(--r-xl)',
            overflow: 'hidden', border: '1px solid var(--line-strong)',
            aspectRatio: '4/5', boxShadow: 'var(--shadow-lg)',
          }}>
            <img
              src="assets/gallery/amber-gold-suit.jpg"
              alt="Artiste en costume sur fond ambre — studio Stellar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 55%, rgba(6,6,8,.72) 100%)',
            }} />
            <span style={{
              position: 'absolute', left: 'var(--s-5)', bottom: 'var(--s-5)',
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: '.6rem', letterSpacing: '.18em', color: 'var(--amber)',
              display: 'inline-flex', alignItems: 'center', gap: '.6em',
            }}>
              <GlowDot size={6} />
              Cérémonie · Ambiance Or
            </span>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div className="stats-grid" data-reveal style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s-6)',
        marginTop: 'clamp(48px,7vw,96px)',
        paddingTop: 'var(--s-10)',
        borderTop: '1px solid var(--line)',
      }}>
        <StatBlock value="300" suffix="m²" label="Studio suréquipé" />
        <StatBlock value="8" suffix="+" label="Décors couleur" accent="var(--c-magenta)" />
        <StatBlock value="4.9" suffix="★" label="Note Google" accent="var(--c-amber)" />
        <StatBlock value="200" suffix="+" label="Artistes shootés" accent="var(--c-teal)" />
      </div>
    </section>
  );
}
