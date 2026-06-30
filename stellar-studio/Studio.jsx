const FACTS = ['Fonds couleur cyclo', 'Lumière Profoto', 'Loge & maquillage', 'Accès & parking'];

function Studio() {
  return (
    <section id="studio" style={{
      position: 'relative', zIndex: 2,
      background: 'var(--ink-850)',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{
        maxWidth: 'var(--maxw)', margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)',
      }}>
        <div className="studio-grid" style={{
          display: 'grid', gridTemplateColumns: '1.1fr .9fr',
          gap: 'clamp(32px,5vw,64px)', alignItems: 'center',
        }}>
          <div data-reveal>
            <span style={{
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
              color: 'var(--c-red)',
              display: 'inline-flex', alignItems: 'center', gap: '.7em',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-red)', boxShadow: '0 0 8px var(--c-red)' }} />
              06 · Le Studio
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
              letterSpacing: 'var(--track-display)', lineHeight: 'var(--lh-snug)',
              fontSize: 'var(--t-display)', margin: 'var(--s-5) 0 var(--s-5)', textTransform: 'uppercase',
            }}>
              300 m² aux<br />portes de Paris.
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--t-lead)',
              lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)',
              margin: '0 0 var(--s-8)', maxWidth: '48ch',
            }}>
              Un terrain de jeu suréquipé à Aubervilliers, à 15 min de Paris. Fonds couleur cyclo, parc lumière Profoto, loge maquillage et parking. Tout est là pour viser haut.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
              gap: 'var(--s-3)', marginBottom: 'var(--s-8)',
            }}>
              {FACTS.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--s-3)',
                  padding: 'var(--s-4) var(--s-5)',
                  background: 'var(--card)', border: '1px solid var(--line)',
                  borderRadius: 'var(--r-md)',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--amber)', boxShadow: '0 0 8px var(--amber)', flex: 'none',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
                    fontSize: '.64rem', letterSpacing: '.14em', color: 'var(--text-2)',
                  }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-4)', alignItems: 'center' }}>
              <a
                href="https://maps.google.com/?q=Aubervilliers"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5em',
                  padding: '.75rem 1.4rem', borderRadius: 'var(--r-pill)',
                  background: 'var(--amber)', color: 'var(--text-on-accent)',
                  border: '1px solid var(--amber)',
                  fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
                  fontSize: '.78rem', letterSpacing: '.12em', textDecoration: 'none',
                  fontWeight: 'var(--fw-semi)', transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-bright)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
              >
                Itinéraire →
              </a>
              <span style={{
                fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
                fontSize: '.66rem', letterSpacing: '.16em', color: 'var(--text-3)',
              }}>
                Studio Stellar · Aubervilliers (93)
              </span>
            </div>
          </div>

          <div data-reveal style={{ position: 'relative' }}>
            <div aria-hidden="true" style={{
              position: 'absolute', inset: '-6%',
              borderRadius: 'var(--r-xl)',
              background: 'radial-gradient(120% 100% at 50% 60%, var(--glow-red), transparent 62%)',
              filter: 'blur(14px)',
            }} />
            <div style={{
              position: 'relative', borderRadius: 'var(--r-xl)',
              overflow: 'hidden', border: '1px solid var(--line-strong)',
              aspectRatio: '4/3', boxShadow: 'var(--shadow-lg)',
            }}>
              <img
                src="assets/gallery/red-studio.jpg"
                alt="Studio Stellar — cyclo rouge et lumière Profoto"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
