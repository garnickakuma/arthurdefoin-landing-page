// Barbara Style — Boutique vintage : page collection

function Collection({ go, addToCart, wish, toggleWish }) {
  const { Checkbox, Badge } = window.BarbaraStyleDesignSystem_eb9639;
  const wrap = { maxWidth: 1240, margin: '0 auto', padding: '0 32px' };
  const [filters, setFilters] = React.useState({ or: true, rose: false, perle: false, bo: true });
  const set = (k) => setFilters((f) => ({ ...f, [k]: !f[k] }));

  const FilterGroup = ({ title, children }) => (
    <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>{children}</div>
    </div>
  );

  return (
    <div>
      {/* En-tête de collection */}
      <section className="vx-paper" style={{ position: 'relative', background: 'var(--surface-rose)', padding: '60px 0 56px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 24, left: 40, opacity: .5 }}><Postmark s={88} /></div>
        <div style={{ position: 'absolute', bottom: -10, right: 48, pointerEvents: 'none' }}><Palm s={120} c="var(--rose-500)" op={.22} /></div>
        <div style={{ ...wrap, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '.1em', color: 'var(--ink-500)', marginBottom: 16 }}>
            Accueil&nbsp;·&nbsp;<span style={{ color: 'var(--ink-900)' }}>Bijoux</span>
          </div>
          <h1 className="vx-display" style={{ fontWeight: 400, fontSize: 62, lineHeight: 1 }}>La Boutique</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-700)', marginTop: 14 }}>Toutes nos pièces qui attrapent la lumière — {window.PRODUCTS.length} modèles.</p>
        </div>
      </section>

      <section style={{ ...wrap, marginTop: 46, display: 'grid', gridTemplateColumns: '232px 1fr', gap: 46, alignItems: 'start' }}>
        {/* FILTRES */}
        <aside>
          <div className="vx-display" style={{ fontSize: 26, marginBottom: 22 }}>Filtrer</div>
          <FilterGroup title="Catégorie">
            <Checkbox label="Boucles d'oreilles" checked={filters.bo} onChange={() => set('bo')} />
            <Checkbox label="Colliers" onChange={() => {}} />
            <Checkbox label="Bracelets" onChange={() => {}} />
            <Checkbox label="Cache-boutons" onChange={() => {}} />
          </FilterGroup>
          <FilterGroup title="Matière">
            <Checkbox label="Plaqué or" checked={filters.or} onChange={() => set('or')} />
            <Checkbox label="Nacre & perle" checked={filters.perle} onChange={() => set('perle')} />
            <Checkbox label="Rose poudré" checked={filters.rose} onChange={() => set('rose')} />
          </FilterGroup>
          <FilterGroup title="Prix">
            <Checkbox label="Moins de 20 €" onChange={() => {}} />
            <Checkbox label="20 € – 30 €" onChange={() => {}} />
            <Checkbox label="Plus de 30 €" onChange={() => {}} />
          </FilterGroup>
        </aside>

        {/* GRILLE */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge variant="cream">Plaqué or ✕</Badge>
              <Badge variant="cream">Boucles d'oreilles ✕</Badge>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-500)' }}>Trier&nbsp;:&nbsp;<span style={{ color: 'var(--ink-900)' }}>Nouveautés ▾</span></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
            {window.PRODUCTS.map((p) => (
              <VintageCard key={p.id} p={p} wishlisted={!!wish[p.id]} onWishlist={() => toggleWish(p.id)}
                onAdd={() => addToCart(p)} onClick={() => go('product', p)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Collection });
