// Barbara Style — Boutique vintage : carte produit
// Visuel = <image-slot> (l'utilisateur dépose sa photo), posé sur un
// placeholder dégradé chaud + grain. Compose Badge / Rating.

// — Prix maison : centimes en exposant, serif Cormorant, format français —
function VintagePrice({ price, compareAt, size = 'md' }) {
  const S = {
    sm: { n: 19, cur: 11, was: 12 },
    md: { n: 27, cur: 15, was: 13 },
    lg: { n: 40, cur: 19, was: 15 },
  }[size] || { n: 27, cur: 15, was: 13 };
  const onSale = compareAt != null;
  const [eur, cent] = Number(price).toFixed(2).split('.');
  const wasFr = onSale ? Number(compareAt).toFixed(2).replace('.', ',') : null;
  const col = onSale ? 'var(--price-sale)' : 'var(--price-now)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 9 }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, lineHeight: 1, color: col, fontSize: S.n, fontVariantNumeric: 'lining-nums tabular-nums' }}>
        {eur}<sup style={{ fontSize: '.52em', verticalAlign: '.62em', marginLeft: 1 }}>{cent}</sup>
        <span style={{ fontSize: S.cur, marginLeft: 4 }}>€</span>
      </span>
      {onSale && (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: S.was, color: 'var(--price-was)', textDecoration: 'line-through', textDecorationColor: 'var(--rose-400)' }}>
          {wasFr}&nbsp;€
        </span>
      )}
    </span>
  );
}

function VintageCard({ p, wishlisted, onWishlist, onAdd, onClick, eager }) {
  const { Badge, Rating } = window.BarbaraStyleDesignSystem_eb9639;

  return (
    <article className="vx-card" onClick={onClick}>
      <div className="vx-card-media vx-grain" style={{ position: 'relative', aspectRatio: '4 / 5', ...p.grad }}>
        {/* Visuel déposable */}
        <image-slot
          id={`prod-${p.id}`}
          fit="cover"
          shape="rect"
          placeholder={p.name}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        ></image-slot>

        {/* Pastille */}
        {p.badge && (
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 4 }}>
            <Badge variant={p.bv}>{p.badge}</Badge>
          </div>
        )}

        {/* Cœur favori */}
        <button
          aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          onClick={(e) => { e.stopPropagation(); onWishlist && onWishlist(); }}
          style={{
            position: 'absolute', top: 10, right: 10, zIndex: 4,
            width: 36, height: 36, borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,.82)', backdropFilter: 'blur(4px)',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={wishlisted ? 'var(--rose-400)' : 'none'}
            stroke={wishlisted ? 'var(--rose-400)' : 'var(--ink-700)'} strokeWidth="1.4">
            <path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z" />
          </svg>
        </button>

        {/* Ajouter au panier — révélé au survol */}
        {onAdd && (
          <div className="vx-card-add">
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(); }}
              style={{
                width: '100%', padding: '11px', border: 'none', borderRadius: 'var(--radius-pill)',
                background: 'var(--ink-900)', color: 'var(--linen-100)',
                fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
                letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >Ajouter au panier</button>
          </div>
        )}
      </div>

      {/* Texte */}
      <div style={{ padding: '15px 4px 4px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-gold)', marginBottom: 6 }}>{p.cat}</div>
        <h3 className="vx-display" style={{ fontWeight: 500, fontSize: 22, lineHeight: 1.12, margin: '0 0 8px' }}>{p.name}</h3>
        {p.rating != null && (
          <div style={{ marginBottom: 10 }}><Rating value={p.rating} count={p.count} size={13} /></div>
        )}
        <VintagePrice price={p.price} compareAt={p.was} />
      </div>
    </article>
  );
}

Object.assign(window, { VintageCard, VintagePrice });
