// Barbara Style — Boutique vintage : panier (tiroir latéral)

function CartDrawer({ open, onClose, items, setItems, go }) {
  const { Button, QuantityStepper, IconButton } = window.BarbaraStyleDesignSystem_eb9639;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const offer = window.computeOffer(items);
  const afterOffer = subtotal - offer.freeValue;
  const FREE = 30;
  const remaining = Math.max(0, FREE - afterOffer);
  const pct = Math.min(100, (afterOffer / FREE) * 100);
  const step = window.nextOfferStep(offer.qty);

  const setQty = (id, qty) => setItems((arr) => arr.map((it) => it.id === id ? { ...it, qty } : it));
  const remove = (id) => setItems((arr) => arr.filter((it) => it.id !== id));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: open ? 'auto' : 'none' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(42,32,24,.34)',
        opacity: open ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)' }} />
      <aside style={{
        position: 'absolute', top: 0, right: 0, height: '100%', width: 420, maxWidth: '92vw',
        background: 'var(--linen-100)', boxShadow: 'var(--shadow-lg)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur-slow) var(--ease-out)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sun s={20} c="var(--gold-400)" />
            <div className="vx-display" style={{ fontSize: 26 }}>Votre panier</div>
          </div>
          <IconButton aria-label="Fermer" variant="plain" onClick={onClose}><Icon.close/></IconButton>
        </div>

        {/* Bandeau offre 2+1 / 4+1 */}
        <div style={{ padding: '13px 24px', background: 'var(--surface-sun)', borderBottom: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ color: 'var(--gold-500)', flex: '0 0 auto' }}><Sun s={18} c="var(--gold-500)" /></span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.4, color: 'var(--ink-700)' }}>
            {offer.free > 0
              ? <span><b style={{ color: 'var(--ink-900)' }}>Offre {offer.free === 1 ? '2+1' : '4+2'}</b> — {offer.free} article{offer.free > 1 ? 's' : ''} offert{offer.free > 1 ? 's' : ''} ({window.eur(offer.freeValue)}).</span>
              : step
                ? <span>Ajoutez <b style={{ color: 'var(--ink-900)' }}>{step.need}</b> article{step.need > 1 ? 's' : ''} {step.label} <span style={{ color: 'var(--gold-500)' }}>({step.tier})</span>.</span>
                : <span><b style={{ color: 'var(--ink-900)' }}>2 achetés = 1 offert</b> · 4 achetés = 2 offerts.</span>}
          </span>
        </div>

        {/* Barre livraison offerte */}
        <div style={{ padding: '16px 24px', background: 'var(--surface-sun)' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--ink-700)', marginBottom: 9 }}>
            {remaining > 0
              ? <span>Plus que <b style={{ color: 'var(--ink-900)' }}>{remaining.toFixed(2).replace('.', ',')} €</b> pour la livraison offerte&nbsp;✦</span>
              : <span><b style={{ color: 'var(--ink-900)' }}>Livraison offerte</b> débloquée&nbsp;!&nbsp;✦</span>}
          </div>
          <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,.6)' }}>
            <div style={{ height: '100%', width: pct + '%', borderRadius: 999, background: 'var(--gold-500)', transition: 'width var(--dur-base) var(--ease-out)' }} />
          </div>
        </div>

        {/* Lignes */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--ink-500)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
              <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}><Sun s={34}/></div>
              Votre panier est vide.
            </div>
          )}
          {items.map((it) => (
            <div key={it.id} style={{ display: 'flex', gap: 14, padding: '18px 0', borderBottom: '1px solid var(--line-soft)' }}>
              <div className="vx-grain" style={{ position: 'relative', width: 76, height: 92, borderRadius: 'var(--vx-radius-card)', flex: '0 0 auto', overflow: 'hidden', ...it.grad }}>
                <image-slot id={`prod-${it.id}-0`} fit="cover" shape="rect" placeholder=""
                  style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>{it.cat}</div>
                    <div className="vx-display" style={{ fontSize: 20, marginTop: 2 }}>{it.name}</div>
                  </div>
                  <button onClick={() => remove(it.id)} aria-label="Retirer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-500)', height: 20 }}><Icon.close width="15" height="15"/></button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <QuantityStepper value={it.qty} onChange={(q) => setQty(it.id, q)} />
                  <VintagePrice price={it.price * it.qty} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pied */}
        <div style={{ padding: '20px 24px 26px', borderTop: '1px solid var(--line-soft)', background: 'var(--white-pure)' }}>
          {offer.freeValue > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--gold-500)' }}>Offre {offer.free === 1 ? '2+1' : '4+2'}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--price-sale)' }}>− {window.eur(offer.freeValue)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-500)' }}>Sous-total</span>
            <VintagePrice price={afterOffer} size="md" />
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-500)', marginBottom: 16 }}>Taxes incluses. Livraison calculée à l'étape suivante.</p>
          <Button variant="gold" size="lg" full disabled={items.length === 0} onClick={() => { onClose(); go && go('checkout'); }}>Passer la commande</Button>
          <button onClick={onClose} style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 12.5, letterSpacing: '.08em', color: 'var(--ink-500)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Continuer mes achats</button>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { CartDrawer });
