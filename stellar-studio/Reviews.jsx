const REVIEWS = [
  { name: 'Roxsane Keys', accent: 'var(--c-magenta)',
    text: "Audran a capté une facette de moi que personne n'avait vue. Lumière, direction, énergie — un vrai chef-d'œuvre. Je n'irai nulle part ailleurs." },
  { name: 'Didi B.', accent: 'var(--c-amber)',
    text: "Le shooting le plus carré de ma carrière. Studio immense, matos au top, et un œil qui fait toute la différence sur la pochette." },
  { name: 'Salif C.', accent: 'var(--c-blue)',
    text: "On est venus pour 3 photos, on est repartis avec une identité visuelle complète. Le rendu couleur est dingue." },
  { name: 'Naïma A.', accent: 'var(--c-teal)',
    text: "Accueil parfait, écoute totale de mon univers. Les visuels ont boosté mon feed et ma crédibilité auprès des labels." },
  { name: 'Mike P.', accent: 'var(--c-gold)',
    text: "300 m² rien que pour nous, une équipe carrée, et des images qui claquent. La demi-journée Signature vaut chaque euro." },
  { name: 'Lina R.', accent: 'var(--c-red)',
    text: "Audran comprend les artistes parce qu'il pense comme un directeur artistique. Mon EP a enfin un visage." },
];

function ReviewCard({ review }) {
  const initial = review.name[0];
  return (
    <div className="review-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: review.accent, opacity: .18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', flex: 'none',
        }}>
          <span style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
            fontSize: '1rem', color: review.accent, opacity: 1 / 0.18,
          }}>
            {initial}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: '.95rem', margin: 0, color: 'var(--text-1)' }}>{review.name}</p>
          <span style={{ color: 'var(--star)', letterSpacing: 2, fontSize: '.8rem' }}>★★★★★</span>
        </div>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)',
        lineHeight: 'var(--lh-relaxed)', color: 'var(--text-2)', margin: 0,
      }}>
        {review.text}
      </p>
    </div>
  );
}

function Reviews() {
  return (
    <section id="avis" style={{
      position: 'relative', zIndex: 2,
      maxWidth: 'var(--maxw)', margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
    }}>
      <div data-reveal style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: 'var(--s-6)',
        marginBottom: 'clamp(32px,5vw,56px)',
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
            fontSize: 'var(--t-eyebrow)', letterSpacing: 'var(--track-eyebrow)',
            color: 'var(--c-teal)',
            display: 'inline-flex', alignItems: 'center', gap: '.7em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-teal)', boxShadow: '0 0 8px var(--c-teal)' }} />
            05 · Les Avis
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            letterSpacing: 'var(--track-display)', lineHeight: 'var(--lh-snug)',
            fontSize: 'var(--t-display)', margin: 'var(--s-5) 0 0', textTransform: 'uppercase',
          }}>
            Les artistes<br />en parlent mieux.
          </h2>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--s-4)',
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)', padding: 'var(--s-5) var(--s-6)',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)',
            fontSize: '2.6rem', lineHeight: 1, color: 'var(--text-1)',
          }}>4.9</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: 'var(--star)', letterSpacing: 2, fontSize: '.9rem' }}>★★★★★</span>
            <span style={{
              fontFamily: 'var(--font-techno)', textTransform: 'uppercase',
              fontSize: '.6rem', letterSpacing: '.16em', color: 'var(--text-3)',
            }}>127 avis · sur Google</span>
          </div>
        </div>
      </div>

      <div className="reviews-grid" data-reveal style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
      }}>
        {REVIEWS.map((r, i) => <ReviewCard key={i} review={r} />)}
      </div>
    </section>
  );
}
