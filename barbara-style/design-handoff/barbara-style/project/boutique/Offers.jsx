// Barbara Style — Boutique vintage : offre phare « 2+1 & 4+1 offert »
// Logique d'offre + composants réutilisables (accueil, fiche produit, panier, checkout).

/* ───────────────── Logique d'offre ─────────────────
   Exactement deux offres, la meilleure applicable s'applique :
   · 2 achetés = 1 offert   → 1 article offert dès 3 pièces (jusqu'à 5)
   · 4 achetés = 2 offerts  → 2 articles offerts dès 6 pièces
   L'article offert est toujours le moins cher (équité côté cliente). */

function computeOffer(items) {
  const units = [];
  (items || []).forEach((it) => { for (let i = 0; i < it.qty; i++) units.push(it.price); });
  const qty = units.length;
  let free = 0;
  if (qty >= 6) free = 2;        // 4+2
  else if (qty >= 3) free = 1;   // 2+1
  units.sort((a, b) => a - b);
  const freeUnits = units.slice(0, free);
  const freeValue = freeUnits.reduce((s, v) => s + v, 0);
  return { qty, free, freeValue, freeUnits };
}

// Message de progression vers la prochaine offre (null une fois le 4+2 atteint)
function nextOfferStep(qty) {
  if (qty < 3) return { need: 3 - qty, label: 'pour votre article offert', tier: '2+1', total: 1 };
  if (qty < 6) return { need: 6 - qty, label: 'pour 2 articles offerts', tier: '4+2', total: 2 };
  return null;
}

const eur = (n) => Number(n).toFixed(2).replace('.', ',') + '\u00A0€';

/* ───────────────── Petits compléments (upsells checkout) ───────────────── */
const UPSELLS = [
  { id: 'ecrin',   name: 'Écrin cadeau',          note: 'Coffret lin & ruban doré',        price: 3.9, grad: 'rose'  },
  { id: 'polish',  name: 'Lingette éclat',        note: 'Ravive le plaqué or',             price: 4.9, grad: 'honey' },
  { id: 'rallonge',name: 'Chaînette de rallonge', note: '+5 cm, plaqué or fin',            price: 5.9, grad: 'gold'  },
];

/* ───────────────── Ruban / ticket : signature « coupon » ───────────────── */

// Encoche de ticket (cercles évidés sur les bords)
const TicketNotch = ({ side }) => (
  <span style={{
    position: 'absolute', top: '50%', [side]: -9, width: 18, height: 18, borderRadius: '50%',
    background: 'var(--surface-page)', transform: 'translateY(-50%)',
    boxShadow: 'inset 0 0 0 1px var(--line-gold, var(--gold-300))',
  }} aria-hidden="true" />
);

/* ── A. Bloc accueil — pleine largeur, deux tickets cadeaux mis en avant ── */
function OfferHighlight({ go, sunburst = true }) {
  const { Button } = window.BarbaraStyleDesignSystem_eb9639;
  const Card = ({ buy, free, title, sub }) => (
    <div className="vx-paper" style={{
      position: 'relative', flex: 1, minWidth: 0,
      background: 'var(--white-pure)', border: '1px solid var(--line-gold, var(--gold-300))',
      borderRadius: 'var(--radius-lg)', padding: '30px 30px 28px', overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <TicketNotch side="left" />
      <TicketNotch side="right" />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span className="vx-display" style={{ fontSize: 78, lineHeight: .8, fontWeight: 500, color: 'var(--ink-900)' }}>{buy}</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 30, fontWeight: 300, color: 'var(--gold-500)' }}>+</span>
        <span className="vx-display" style={{ fontSize: 78, lineHeight: .8, fontWeight: 500, color: 'var(--gold-500)', fontStyle: 'italic' }}>{free}</span>
      </div>
      <div className="vx-display" style={{ fontSize: 27, fontWeight: 500, marginTop: 14 }}>{title}</div>
      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-500)', marginTop: 6, maxWidth: 280 }}>{sub}</p>
    </div>
  );

  return (
    <section style={{ maxWidth: 1240, margin: '92px auto 0', padding: '0 32px' }}>
      <div className="vx-grain" style={{
        position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-cream)', border: '1px solid var(--line-soft)',
        padding: '48px 44px',
      }}>
        {sunburst && (
          <div style={{ position: 'absolute', top: -70, left: '50%', transform: 'translateX(-50%)', width: 760, height: 320, pointerEvents: 'none', zIndex: 0 }}>
            <SunBurst c="var(--gold-300)" op={.32} rays={30} />
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 44, alignItems: 'center' }}>
          {/* Pitch */}
          <div>
            <span className="vx-eyebrow" style={{ marginBottom: 16 }}>L'offre de l'été</span>
            <h2 className="vx-display" style={{ fontSize: 52, lineHeight: 1.02, fontWeight: 400, margin: '4px 0 0' }}>
              Le bijou de plus,<br /><em>c'est nous qui l'offrons</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--ink-700)', margin: '20px 0 26px', maxWidth: 380 }}>
              Composez votre parure&nbsp;: le moins cher de vos articles vous est offert. Cumulable sur toute la boutique, ajouté automatiquement au panier.
            </p>
            <Button variant="gold" size="lg" onClick={() => go('collection')}>J'en profite</Button>
          </div>
          {/* Tickets */}
          <div style={{ display: 'flex', gap: 22 }}>
            <Card buy="2" free="1" title="Le 3ᵉ offert" sub="Achetez-en 2, le moins cher est pour vous." />
            <Card buy="4" free="2" title="Deux pièces offertes" sub="Allez plus loin : 2 articles offerts dès 6 pièces." />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── B. Bandeau compact — fiche produit (sous le prix) ── */
function OfferStrip({ onPickPack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: 'var(--surface-sun)', border: '1px solid var(--line-gold, var(--gold-300))',
      borderRadius: 'var(--radius-md)', padding: '14px 16px',
    }}>
      <span style={{ flex: '0 0 auto', color: 'var(--gold-500)' }}><Sun s={26} c="var(--gold-500)" /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="vx-display" style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.1 }}>
          2 achetés = <em>1 offert</em> · 4 achetés = <em>2 offerts</em>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-500)', marginTop: 3 }}>
          Le moins cher offert · appliqué automatiquement au panier.
        </div>
      </div>
    </div>
  );
}

/* ── C. Sélecteur de pack — fiche produit ── */
function PackSelector({ unitPrice, value, onChange }) {
  const packs = [
    { qty: 1, label: 'À l\u2019unité',  free: 0, tag: null },
    { qty: 3, label: 'Pack 2 + 1',  free: 1, tag: '1 offert' },
    { qty: 6, label: 'Pack 4 + 2',  free: 2, tag: '2 offerts' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      {packs.map((p) => {
        const active = value === p.qty;
        const total = (p.qty - p.free) * unitPrice;
        return (
          <button key={p.qty} onClick={() => onChange(p.qty)} style={{
            position: 'relative', cursor: 'pointer', textAlign: 'left', padding: '13px 14px',
            background: active ? 'var(--surface-sun)' : 'var(--white-pure)',
            border: active ? '1.5px solid var(--gold-400)' : '1px solid var(--line-soft)',
            borderRadius: 'var(--radius-md)', transition: 'border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
          }}>
            {p.tag && (
              <span style={{
                position: 'absolute', top: -9, right: 10,
                fontFamily: 'var(--font-sans)', fontSize: 8.5, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase',
                color: 'var(--white-pure)', background: 'var(--gold-500)', padding: '2px 7px', borderRadius: 999,
              }}>{p.tag}</span>
            )}
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: active ? 'var(--gold-500)' : 'var(--ink-700)' }}>{p.label}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{p.qty} pièce{p.qty > 1 ? 's' : ''}</div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 22, color: 'var(--price-now)', fontVariantNumeric: 'lining-nums tabular-nums' }}>{eur(total)}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { computeOffer, nextOfferStep, eur, UPSELLS, OfferHighlight, OfferStrip, PackSelector });
