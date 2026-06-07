// Barbara Style — Boutique vintage : page commande (checkout)

function Checkout({ go, items, setItems, insure, setInsure }) {
  const { Button, Input, Checkbox, QuantityStepper } = window.BarbaraStyleDesignSystem_eb9639;
  const FREE_SHIP = 30;
  const SHIP_FEE = 4.9;
  const INSURANCE = 1.99;

  const offer = window.computeOffer(items);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const afterOffer = subtotal - offer.freeValue;
  const shipping = afterOffer >= FREE_SHIP || afterOffer === 0 ? 0 : SHIP_FEE;
  const remaining = Math.max(0, FREE_SHIP - afterOffer);
  const insurance = insure ? INSURANCE : 0;
  const total = afterOffer + shipping + insurance;

  const setQty = (id, qty) => setItems((arr) => arr.map((it) => it.id === id ? { ...it, qty } : it));
  const remove = (id) => setItems((arr) => arr.filter((it) => it.id !== id));

  const inUpsell = (u) => items.some((it) => it.id === u.id);
  const addUpsell = (u) => setItems((arr) => arr.some((it) => it.id === u.id)
    ? arr
    : [...arr, { id: u.id, name: u.name, cat: 'Complément', price: u.price, grad: window.GRADS[u.grad], qty: 1, addon: true }]);

  const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 32px' };
  const labelEyebrow = { fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: 16 };
  const sectionCard = { background: 'var(--white-pure)', border: '1px solid var(--line-soft)', borderRadius: 'var(--radius-lg)', padding: '26px 28px', marginBottom: 18 };

  if (items.length === 0) {
    return (
      <section style={{ ...wrap, padding: '90px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Sun s={36} /></div>
        <h1 className="vx-display" style={{ fontSize: 40, fontWeight: 400 }}>Votre panier est vide</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-500)', margin: '12px 0 26px' }}>Quelques pièces solaires vous attendent dans la collection.</p>
        <Button variant="gold" size="lg" onClick={() => go('collection')}>Découvrir la collection</Button>
      </section>
    );
  }

  return (
    <div style={{ background: 'var(--surface-page)', paddingBottom: 90 }}>
      {/* Fil d'ariane + titre */}
      <section style={{ ...wrap, paddingTop: 30 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '.08em', color: 'var(--ink-500)', marginBottom: 22 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => go('home')}>Accueil</span>&nbsp;·&nbsp;
          <span style={{ color: 'var(--ink-900)' }}>Commande</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 30 }}>
          <h1 className="vx-display" style={{ fontSize: 48, fontWeight: 400 }}>Votre commande</h1>
          <span className="vx-link" onClick={() => go('collection')}>Continuer mes achats</span>
        </div>
      </section>

      <section style={{ ...wrap, display: 'grid', gridTemplateColumns: '1.25fr .95fr', gap: 40, alignItems: 'start' }}>
        {/* ───────── Colonne formulaire ───────── */}
        <div>
          <div style={sectionCard}>
            <div style={labelEyebrow}>1 · Coordonnées</div>
            <div style={{ display: 'grid', gap: 14 }}>
              <Input label="Adresse e-mail" type="email" placeholder="vous@exemple.fr" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input label="Prénom" placeholder="Camille" />
                <Input label="Nom" placeholder="Durand" />
              </div>
            </div>
          </div>

          <div style={sectionCard}>
            <div style={labelEyebrow}>2 · Livraison</div>
            <div style={{ display: 'grid', gap: 14 }}>
              <Input label="Adresse" placeholder="12 promenade des Anglais" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14 }}>
                <Input label="Code postal" placeholder="06000" />
                <Input label="Ville" placeholder="Nice" />
              </div>
            </div>

            {/* Expédition assurée — pré-cochée, décochable */}
            <div style={{
              marginTop: 18, display: 'flex', gap: 14, alignItems: 'flex-start',
              background: insure ? 'var(--surface-sun)' : 'var(--surface-cream)',
              border: '1px solid', borderColor: insure ? 'var(--gold-300)' : 'var(--line-soft)',
              borderRadius: 'var(--radius-md)', padding: '15px 16px',
              transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
            }}>
              <div style={{ paddingTop: 1 }}>
                <Checkbox checked={insure} onChange={(e) => setInsure(e.target.checked)} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ color: 'var(--gold-500)' }}><Icon.truck width="18" height="18" /></span>
                    <span className="vx-display" style={{ fontSize: 19, fontWeight: 500 }}>Expédition assurée</span>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 19, color: 'var(--ink-900)', fontVariantNumeric: 'lining-nums tabular-nums', whiteSpace: 'nowrap' }}>+ {window.eur(INSURANCE)}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-500)', marginTop: 5 }}>
                  Colis suivi &amp; remboursé en cas de perte, casse ou vol pendant le transport. Recommandé pour vos bijoux.
                </p>
              </div>
            </div>
          </div>

          {/* Compléments / upsells */}
          <div style={sectionCard}>
            <div style={labelEyebrow}>3 · Complétez votre écrin</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {window.UPSELLS.map((u) => {
                const added = inUpsell(u);
                return (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="vx-grain" style={{ position: 'relative', width: 58, height: 58, borderRadius: 'var(--radius-md)', overflow: 'hidden', flex: '0 0 auto', ...window.GRADS[u.grad] }}>
                      <image-slot id={`up-${u.id}`} fit="cover" shape="rect" placeholder="" style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="vx-display" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.1 }}>{u.name}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{u.note}</div>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 19, color: 'var(--price-now)', fontVariantNumeric: 'lining-nums tabular-nums' }}>{window.eur(u.price)}</span>
                    <button onClick={() => added ? remove(u.id) : addUpsell(u)} style={{
                      flex: '0 0 auto', cursor: 'pointer', width: 38, height: 38, borderRadius: '50%',
                      border: '1px solid', borderColor: added ? 'var(--gold-400)' : 'var(--line-ink, var(--ink-700))',
                      background: added ? 'var(--gold-400)' : 'transparent',
                      color: added ? 'var(--white-pure)' : 'var(--ink-900)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all var(--dur-base) var(--ease-out)',
                    }} aria-label={added ? 'Retirer' : 'Ajouter'}>
                      {added
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12l4.5 4.5L19 7" /></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14" /></svg>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ───────── Colonne récapitulatif ───────── */}
        <aside style={{ position: 'sticky', top: 96 }}>
          <div className="vx-paper" style={{ background: 'var(--white-pure)', border: '1px solid var(--line-soft)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '22px 24px 6px' }}>
              <div className="vx-display" style={{ fontSize: 26, fontWeight: 500 }}>Récapitulatif</div>
            </div>

            {/* Lignes articles */}
            <div style={{ padding: '8px 24px', maxHeight: 320, overflowY: 'auto' }}>
              {items.map((it) => (
                <div key={it.id} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--line-soft)' }}>
                  <div className="vx-grain" style={{ position: 'relative', width: 56, height: 68, borderRadius: 'var(--radius-md)', overflow: 'hidden', flex: '0 0 auto', ...it.grad }}>
                    <image-slot id={it.addon ? `up-${it.id}` : `prod-${it.id}-0`} fit="cover" shape="rect" placeholder="" style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <div className="vx-display" style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.15 }}>{it.name}</div>
                      <button onClick={() => remove(it.id)} aria-label="Retirer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-500)', height: 18, flex: '0 0 auto' }}><Icon.close width="14" height="14" /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      {it.addon
                        ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-500)' }}>Complément · ×1</span>
                        : <QuantityStepper value={it.qty} onChange={(q) => setQty(it.id, q)} />}
                      <VintagePrice price={it.price * it.qty} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Offre appliquée */}
            {offer.free > 0 && (
              <div style={{ margin: '4px 24px 0', padding: '12px 14px', background: 'var(--surface-sun)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--gold-500)', flex: '0 0 auto' }}><Sun s={20} c="var(--gold-500)" /></span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.4, color: 'var(--ink-700)' }}>
                  Offre <b style={{ color: 'var(--ink-900)' }}>{offer.free === 1 ? '2+1' : '4+2'}</b> appliquée — {offer.free} article{offer.free > 1 ? 's' : ''} offert{offer.free > 1 ? 's' : ''}.
                </span>
              </div>
            )}
            {offer.free === 0 && offer.qty > 0 && (() => {
              const step = window.nextOfferStep(offer.qty);
              return step ? (
                <div style={{ margin: '4px 24px 0', padding: '11px 14px', border: '1px dashed var(--gold-300)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-700)' }}>
                    Ajoutez <b style={{ color: 'var(--ink-900)' }}>{step.need}</b> article{step.need > 1 ? 's' : ''} {step.label} <span style={{ color: 'var(--gold-500)' }}>({step.tier})</span>
                  </span>
                </div>
              ) : null;
            })()}

            {/* Totaux */}
            <div style={{ padding: '18px 24px 4px', display: 'grid', gap: 9 }}>
              {[
                ['Sous-total', window.eur(subtotal)],
                ...(offer.freeValue > 0 ? [['Offre 2+1 / 4+2', '\u2212 ' + window.eur(offer.freeValue), 'gold']] : []),
                ['Livraison', shipping === 0 ? 'Offerte' : window.eur(shipping), shipping === 0 ? 'success' : null],
                ...(insure ? [['Expédition assurée', window.eur(INSURANCE)]] : []),
              ].map(([k, v, tone], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-500)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500, color: tone === 'gold' ? 'var(--price-sale)' : tone === 'success' ? 'var(--success, #6f8f6a)' : 'var(--ink-900)' }}>{v}</span>
                </div>
              ))}
              {shipping > 0 && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--gold-500)', marginTop: 1 }}>
                  Plus que {window.eur(remaining)} pour la livraison offerte.
                </div>
              )}
            </div>

            <div style={{ margin: '16px 24px 0', borderTop: '1px solid var(--line-soft)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-700)' }}>Total</span>
              <VintagePrice price={total} size="lg" />
            </div>

            <div style={{ padding: '18px 24px 24px' }}>
              <Button variant="gold" size="lg" full>Payer ma commande</Button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--ink-500)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="11" width="16" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                Paiement sécurisé · taxes incluses
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

Object.assign(window, { Checkout });
