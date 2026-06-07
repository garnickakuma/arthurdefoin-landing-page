// Barbara Style — Boutique vintage : fiche produit

function Product({ product, go, addToCart, wish, toggleWish }) {
  const { Button, Rating, Badge, QuantityStepper, IconButton } = window.BarbaraStyleDesignSystem_eb9639;
  const p = product || window.PRODUCTS[0];
  const wrap = { maxWidth: 1240, margin: '0 auto', padding: '0 32px' };
  const [qty, setQty] = React.useState(1);
  const [active, setActive] = React.useState(0);
  const thumbGrads = [p.grad, window.GRADS.sand, window.GRADS.rose, window.GRADS.honey];
  const related = window.PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div>
      <section style={{ ...wrap, paddingTop: 30 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '.08em', color: 'var(--ink-500)', marginBottom: 26 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Accueil</span>&nbsp;·&nbsp;
          <span style={{ cursor: 'pointer' }} onClick={() => go('collection')}>{p.cat}</span>&nbsp;·&nbsp;
          <span style={{ color: 'var(--ink-900)' }}>{p.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* GALERIE */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {thumbGrads.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} className="vx-grain" style={{
                  position: 'relative', width: 74, height: 90, borderRadius: 'var(--vx-radius-card)', ...g, cursor: 'pointer',
                  border: active === i ? '1.5px solid var(--gold-400)' : '1px solid var(--line-soft)', padding: 0, overflow: 'hidden',
                }}>
                  <image-slot id={`prod-${p.id}-${i}`} fit="cover" shape="rect" placeholder=""
                    style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
                </button>
              ))}
            </div>
            <div className="vx-grain vx-veil" style={{ flex: 1, position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--radius-md)', ...thumbGrads[active], boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
              <image-slot key={active} id={`prod-${p.id}-${active}`} fit="cover" shape="rect" placeholder="Déposez la photo du bijou"
                style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
              {p.badge && <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 4 }}><Badge variant={p.bv}>{p.badge}</Badge></div>}
            </div>
          </div>

          {/* INFOS */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--text-gold)', marginBottom: 12 }}>{p.cat}</div>
            <h1 className="vx-display" style={{ fontWeight: 400, fontSize: 54, lineHeight: 1.02 }}>{p.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '16px 0 22px' }}>
              <Rating value={p.rating} count={p.count} showValue />
            </div>
            <VintagePrice price={p.price} compareAt={p.was} size="lg" />

            <div style={{ marginTop: 20 }}>
              <OfferStrip />
            </div>

            <hr className="bs-rule" style={{ margin: '24px 0' }} />
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--ink-700)', maxWidth: 440 }}>
              Une pièce lumineuse, pensée pour accompagner vos journées d'été comme vos soirées. Plaqué or fin, légère à porter — l'éclat qui change tout, sans se ruiner.
            </p>

            <div style={{ display: 'flex', gap: 8, margin: '22px 0 22px', flexWrap: 'wrap' }}>
              <Badge variant="outline">Plaqué or fin</Badge>
              <Badge variant="outline">Hypoallergénique</Badge>
              <Badge variant="outline">Imaginé en France</Badge>
            </div>

            {/* Choix du pack — met l'offre en avant */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 11 }}>Choisissez votre formule</div>
              <PackSelector unitPrice={p.price} value={qty} onChange={setQty} />
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <QuantityStepper value={qty} onChange={setQty} max={10} />
              <Button variant="gold" size="lg" full style={{ flex: 1 }} onClick={() => addToCart(p, qty)}>Ajouter au panier</Button>
              <IconButton aria-label="Favori" variant="outline" size="lg" onClick={() => toggleWish(p.id)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wish[p.id] ? 'var(--rose-400)' : 'none'} stroke={wish[p.id] ? 'var(--rose-400)' : 'var(--ink-700)'} strokeWidth="1.4"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z"/></svg>
              </IconButton>
            </div>

            <div style={{ marginTop: 28 }}>
              {[['Livraison & retours', 'Offerte dès 30 € · retours gratuits sous 30 jours.'],
                ['Matière & entretien', 'Laiton plaqué or 3 microns. Éviter eau et parfum.']].map(([title, d]) => (
                <div key={title} style={{ borderTop: '1px solid var(--line-soft)', padding: '16px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', fontSize: 13.5, letterSpacing: '.04em', color: 'var(--ink-900)' }}>
                    <span>{title}</span><span style={{ color: 'var(--gold-500)' }}>＋</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-500)', marginTop: 8 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VOUS AIMEREZ AUSSI */}
      <section style={{ ...wrap, marginTop: 96 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="vx-eyebrow">Pour compléter</span>
          <h2 className="vx-display" style={{ fontSize: 42, marginTop: 12 }}>Vous aimerez aussi</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26 }}>
          {related.map((r) => (
            <VintageCard key={r.id} p={r} wishlisted={!!wish[r.id]} onWishlist={() => toggleWish(r.id)}
              onAdd={() => addToCart(r)} onClick={() => go('product', r)} />
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Product });
