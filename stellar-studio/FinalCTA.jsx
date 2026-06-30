function FinalCTA() {
  const waLink = "https://wa.me/33668019999?text=" +
    encodeURIComponent("Bonjour Audran, je souhaite réserver une séance photo au studio Stellar.");

  return (
    <section style={{
      position: 'relative', zIndex: 2,
      maxWidth: 'var(--maxw)', margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)', textAlign: 'center',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '70vw', maxWidth: 700, height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--glow-amber), transparent 65%)',
        filter: 'blur(28px)', zIndex: -1,
      }} />

      <div data-reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
          letterSpacing: 'var(--track-hero)', lineHeight: 'var(--lh-tight)',
          fontSize: 'clamp(2.6rem,7vw,5.5rem)',
          margin: '0 0 var(--s-6)', textTransform: 'uppercase',
        }}>
          Faisons de votre image<br />
          une <span style={{ color: 'var(--amber)' }}>légende</span>.
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--t-lead)',
          lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)',
          margin: '0 0 var(--s-8)', maxWidth: '46ch',
        }}>
          Parlez-moi de votre projet. Réponse rapide, devis clair, séance à votre image.
        </p>
        <a
          href={waLink}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5em',
            padding: '1rem 2rem', borderRadius: 'var(--r-pill)',
            background: 'var(--amber)', color: 'var(--text-on-accent)',
            border: '1px solid var(--amber)',
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.82rem', letterSpacing: '.12em', textDecoration: 'none',
            fontWeight: 'var(--fw-semi)', transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-bright)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
        >
          Contactez-moi sur WhatsApp →
        </a>
      </div>
    </section>
  );
}
