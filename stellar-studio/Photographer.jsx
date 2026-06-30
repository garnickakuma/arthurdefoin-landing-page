function Photographer() {
  const waLink = "https://wa.me/33668019999?text=" +
    encodeURIComponent("Bonjour Audran, je souhaite réserver une séance photo au studio Stellar.");

  return (
    <section id="photographe" style={{
      position: 'relative', zIndex: 2,
      maxWidth: 'var(--maxw)', margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
    }}>
      <div className="photog-grid" style={{
        display: 'grid', gridTemplateColumns: '.85fr 1.15fr',
        gap: 'clamp(32px,5vw,72px)', alignItems: 'center',
      }}>
        {/* Portrait */}
        <div data-reveal style={{ position: 'relative' }}>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: '-6%',
            borderRadius: 'var(--r-xl)',
            background: 'radial-gradient(120% 100% at 30% 30%, var(--glow-violet), transparent 62%)',
            filter: 'blur(12px)',
          }} />
          <div style={{
            position: 'relative', borderRadius: 22,
            overflow: 'hidden', border: '1px solid var(--line-strong)',
            aspectRatio: '4/5', boxShadow: 'var(--shadow-lg)',
          }}>
            <img
              src="assets/audran-sarzier.png"
              alt="Audran Sarzier — fondateur & directeur photo de Stellar Studio"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 58%, rgba(6,6,8,.72) 100%)',
            }} />
            <span style={{
              position: 'absolute', left: 'var(--s-5)', bottom: 'var(--s-5)',
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: '.6rem', letterSpacing: '.18em', color: 'var(--c-violet)',
              display: 'inline-flex', alignItems: 'center', gap: '.6em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-violet)', boxShadow: '0 0 8px var(--c-violet)' }} />
              Audran Sarzier
            </span>
          </div>
        </div>

        {/* Text */}
        <div data-reveal>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
            color: 'var(--c-violet)',
            display: 'inline-flex', alignItems: 'center', gap: '.7em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-violet)', boxShadow: '0 0 8px var(--c-violet)' }} />
            03 · Le Photographe
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            letterSpacing: 'var(--track-display)', lineHeight: 'var(--lh-snug)',
            fontSize: 'var(--t-h1)', margin: 'var(--s-5) 0 var(--s-2)', textTransform: 'uppercase',
          }}>
            Audran Sarzier
          </h2>
          <p style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.68rem', letterSpacing: '.2em', color: 'var(--text-3)',
            margin: '0 0 var(--s-6)',
          }}>
            Fondateur &amp; Directeur photo
          </p>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)',
            lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)', margin: '0 0 var(--s-5)',
          }}>
            Audran ne photographie pas des artistes — il révèle des images de marque. Dix ans à éclairer chanteurs, rappeurs, danseurs et créateurs, un œil obsédé par la couleur et le détail qui change tout.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)',
            lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)', margin: '0 0 var(--s-8)',
          }}>
            Sa conviction : chaque artiste porte une lumière unique. Son métier, c'est de la trouver, la cadrer et la rendre inoubliable. C'est ce qui fait revenir les talents — et leurs labels.
          </p>

          <blockquote style={{
            borderLeft: '2px solid var(--amber)',
            paddingLeft: 'var(--s-6)',
            margin: '0 0 var(--s-8)',
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-medium)',
            fontSize: 'var(--t-h3)', lineHeight: 'var(--lh-snug)',
            color: 'var(--text-1)', fontStyle: 'italic',
          }}>
            « Mon job, ce n'est pas de vous prendre en photo. C'est de rendre votre image légendaire. »
          </blockquote>

          <a
            href={waLink}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5em',
              padding: '.7rem 1.4rem', borderRadius: 'var(--r-pill)',
              background: 'transparent', color: 'var(--text-1)',
              border: '1px solid var(--line-strong)',
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: '.78rem', letterSpacing: '.12em', textDecoration: 'none',
              fontWeight: 'var(--fw-semi)', transition: 'border-color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line-strong)'}
          >
            Parler de mon projet →
          </a>
        </div>
      </div>
    </section>
  );
}
