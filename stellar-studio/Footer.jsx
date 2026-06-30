function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      borderTop: '1px solid var(--line)',
      background: 'var(--ink-900)',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)', margin: '0 auto',
        padding: 'var(--s-12) var(--gutter)',
        display: 'flex', flexWrap: 'wrap', gap: 'var(--s-8)',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <img src="assets/logo-stellar.png" alt="STELLAR STUDIO PARIS" style={{ height: 28, width: 'auto' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-6)', alignItems: 'center' }}>
          <a
            className="stl-link"
            href="mailto:contact@stellar.studio"
            style={{
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: '.66rem', letterSpacing: '.16em',
              color: 'var(--text-2)', textDecoration: 'none',
            }}
          >
            contact@stellar.studio
          </a>
          <a
            className="stl-link"
            href="https://instagram.com/stellar.studio.paris"
            style={{
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: '.66rem', letterSpacing: '.16em',
              color: 'var(--text-2)', textDecoration: 'none',
            }}
          >
            @stellar.studio.paris
          </a>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.66rem', letterSpacing: '.16em', color: 'var(--text-3)',
          }}>
            Aubervilliers (93)
          </span>
        </div>
      </div>
    </footer>
  );
}
