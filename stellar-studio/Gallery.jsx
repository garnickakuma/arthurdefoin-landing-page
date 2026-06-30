const TILES = [
  { src: 'assets/gallery/coral-woman.jpg',   label: 'Satin',          ambiance: 'Magenta', accent: 'var(--c-magenta)', alt: 'Portrait satin sur ambiance magenta',        col: 'span 2', row: 'span 2' },
  { src: 'assets/gallery/amber-didi.jpg',    label: 'Roots',          ambiance: 'Ambre',   accent: 'var(--c-amber)',   alt: 'Artiste lunettes sur fond ambre',            col: 'span 1', row: 'span 1' },
  { src: 'assets/gallery/blue-tracksuit.jpg',label: 'Streetwear',     ambiance: 'Bleu',    accent: 'var(--c-blue)',    alt: 'Artiste en survêtement, ambiance bleue',     col: 'span 1', row: 'span 2' },
  { src: 'assets/gallery/teal-gym.jpg',      label: 'Mouvement',      ambiance: 'Vert',    accent: 'var(--c-teal)',    alt: 'Danse, ambiance vert d\'eau',                col: 'span 1', row: 'span 1' },
  { src: 'assets/gallery/gold-silk.jpg',     label: 'Couture',        ambiance: 'Or',      accent: 'var(--c-gold)',    alt: 'Soie florale, ambiance champagne',           col: 'span 1', row: 'span 1' },
  { src: 'assets/gallery/red-studio.jpg',    label: 'Le décor cyclo', ambiance: 'Rouge',   accent: 'var(--c-red)',     alt: 'Cyclo rouge du studio Stellar',              col: 'span 2', row: 'span 1' },
  { src: 'assets/gallery/noir-silk.jpg',     label: 'Nuit',           ambiance: 'Violet',  accent: 'var(--c-violet)',  alt: 'Portrait nuit, ambiance violette',           col: 'span 1', row: 'span 1' },
];

function GalleryTile({ tile }) {
  return (
    <div style={{ gridColumn: tile.col, gridRow: tile.row }}>
      <a className="gframe" href="#tarifs" style={{ '--_a': tile.accent }}>
        <img src={tile.src} alt={tile.alt} loading="lazy" />
        <span className="g-glow" aria-hidden="true" />
        <span className="g-scrim" aria-hidden="true" />
        <span className="g-cap">
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
            color: 'var(--text-1)', fontSize: 'var(--t-sm)', letterSpacing: 'var(--track-tight)',
          }}>
            {tile.label}
          </span>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: '.58rem', letterSpacing: '.18em', color: tile.accent,
            display: 'inline-flex', alignItems: 'center', gap: '.5em', flex: 'none',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: tile.accent, boxShadow: `0 0 8px ${tile.accent}`,
            }} />
            {tile.ambiance}
          </span>
        </span>
        <span className="g-bar" aria-hidden="true" />
      </a>
    </div>
  );
}

function Eyebrow({ index, accent = 'var(--amber)', children }) {
  return (
    <span style={{
      fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
      fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
      color: accent,
      display: 'inline-flex', alignItems: 'center', gap: '.7em',
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: accent, boxShadow: `0 0 8px ${accent}`,
      }} />
      {index} · {children}
    </span>
  );
}

function Gallery() {
  return (
    <section id="galerie" style={{
      position: 'relative', zIndex: 2,
      maxWidth: 'var(--maxw)', margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
    }}>
      <div data-reveal style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: 'var(--s-6)',
        marginBottom: 'clamp(32px,5vw,64px)',
      }}>
        <div>
          <Eyebrow index="01">La Galerie</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            letterSpacing: 'var(--track-display)', lineHeight: 'var(--lh-snug)',
            fontSize: 'var(--t-display)',
            margin: 'var(--s-5) 0 0', textTransform: 'uppercase',
          }}>
            Chaque artiste,<br />
            <span style={{ WebkitTextStroke: '1px var(--text-1)', WebkitTextFillColor: 'transparent' }}>
              sa couleur.
            </span>
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)',
          lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)', maxWidth: '42ch',
        }}>
          Le même studio dark, une lumière différente pour chacun. Survolez : la couleur d'ambiance s'allume.
        </p>
      </div>

      <div className="gallery-grid" data-reveal>
        {TILES.map((tile, i) => <GalleryTile key={i} tile={tile} />)}
      </div>
    </section>
  );
}
