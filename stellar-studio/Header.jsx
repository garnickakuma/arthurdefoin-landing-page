const WA_LINK = "https://wa.me/33668019999?text=" +
  encodeURIComponent("Bonjour Audran, je souhaite réserver une séance photo au studio Stellar.");

function Header() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      background: 'color-mix(in srgb, var(--ink-900) 74%, transparent)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)', margin: '0 auto',
        padding: '15px var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flex: 'none' }}>
          <img src="assets/logo-stellar.png" alt="STELLAR STUDIO PARIS" style={{ height: 30, width: 'auto', display: 'block' }} />
        </a>

        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {['Galerie', 'Avantages', 'Photographe', 'Tarifs', 'Studio'].map(label => (
            <a
              key={label}
              className="stl-link"
              href={`#${label.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
                fontSize: 'var(--t-nav)', letterSpacing: '.2em',
                color: 'var(--text-2)', textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={WA_LINK}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5em',
            padding: '.55rem 1.1rem',
            borderRadius: 'var(--r-pill)',
            background: 'var(--amber)',
            color: 'var(--text-on-accent)',
            fontFamily: 'var(--font-techno)',
            textTransform: 'uppercase',
            fontSize: '.72rem',
            letterSpacing: '.12em',
            textDecoration: 'none',
            fontWeight: 'var(--fw-semi)',
            transition: 'background .2s',
            flex: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-bright)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
        >
          Contactez-moi <span>→</span>
        </a>
      </div>
    </header>
  );
}
