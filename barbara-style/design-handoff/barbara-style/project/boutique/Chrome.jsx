// Barbara Style — Boutique vintage : en-tête & pied de page

function Header({ route, go, cartCount, onOpenCart }) {
  const { IconButton } = window.BarbaraStyleDesignSystem_eb9639;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = ['Nouveautés', 'Bijoux', 'Cache-boutons', 'Maison'];
  const link = (label) => {
    const to = label === 'Maison' ? 'home' : 'collection';
    const active = route === 'collection' && label === 'Bijoux';
    return (
      <button key={label} onClick={() => go(to)} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 400,
        letterSpacing: '.16em', textTransform: 'uppercase',
        color: active ? 'var(--gold-500)' : 'var(--ink-700)',
        borderBottom: active ? '1.5px solid var(--gold-400)' : '1.5px solid transparent',
        transition: 'color var(--dur-base) var(--ease-out)'
      }}>{label}</button>);

  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30 }}>
      {/* Bandeau annonce */}
      <div style={{ height: 34, background: 'var(--ink-900)', color: 'var(--linen-200)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, whiteSpace: 'nowrap', overflow: 'hidden',
        fontFamily: 'var(--font-sans)', fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase' }}>
        <Sun s={13} c="var(--gold-300)" sw={1.6} />
        <span>2 achetés = 1 offert&nbsp;· 4 achetés = 2 offerts</span>
        <span style={{ opacity: .4 }}>·</span>
        <span>Livraison offerte dès 30&nbsp;€</span>
        <Sun s={13} c="var(--gold-300)" sw={1.6} />
      </div>

      {/* Barre principale */}
      <div style={{
        background: scrolled ? 'rgba(254,251,246,.85)' : 'var(--surface-page)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: '1px solid var(--line-soft)',
        transition: 'background var(--dur-base) var(--ease-out)'
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', height: 78,
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
          <nav style={{ display: 'flex', gap: 26 }}>{nav.map(link)}</nav>

          <button onClick={() => go('home')} style={{ background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span className="vx-display" style={{ fontWeight: 500, fontSize: 32, lineHeight: .9, letterSpacing: '.01em' }}>Barbara</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 18, height: 1, background: 'var(--gold-300)' }}></span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 7.5, letterSpacing: '.42em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>STYLE</span>
              <span style={{ width: 18, height: 1, background: 'var(--gold-300)' }}></span>
            </span>
          </button>

          <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton aria-label="Recherche" variant="plain"><Icon.search /></IconButton>
            <IconButton aria-label="Compte" variant="plain"><Icon.user /></IconButton>
            <IconButton aria-label="Favoris" variant="plain"><Icon.heart /></IconButton>
            <IconButton aria-label="Panier" variant="outline" badge={cartCount || undefined} onClick={onOpenCart}><Icon.bag /></IconButton>
          </div>
        </div>
      </div>
    </header>);

}

function Footer({ go }) {
  const { Input, Button } = window.BarbaraStyleDesignSystem_eb9639;
  const col = (title, items) =>
  <div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-300)', marginBottom: 16 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {items.map((t) => <a key={t} onClick={() => go('collection')} style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--linen-200)', opacity: .82, cursor: 'pointer' }}>{t}</a>)}
      </div>
    </div>;


  return (
    <footer style={{ background: 'var(--ink-900)', color: 'var(--linen-100)', marginTop: 110, position: 'relative', overflow: 'hidden' }}>
      {/* frise vagues */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '26px 0 0', opacity: .5 }}>
        <Wave c="var(--gold-300)" op={1} w={260} />
      </div>
      {/* palmiers décoratifs */}
      <div style={{ position: 'absolute', right: 40, bottom: 60, pointerEvents: 'none' }}>
        <Palm s={130} c="var(--gold-300)" op={.18} />
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 32px 40px',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr', gap: 48, position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Sun s={24} c="var(--gold-300)" />
            <span className="vx-display" style={{ fontSize: 30, color: 'var(--linen-100)' }}>Barbara</span>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.7, color: 'var(--linen-200)', opacity: .8, maxWidth: 260 }}>
            Des bijoux qui scintillent au soleil, pensés pour celles qui aiment se faire plaisir. Imaginé en France, sur la Côte d'Azur.
          </p>
        </div>
        {col('La Boutique', ["Boucles d'oreilles", 'Colliers', 'Bracelets', 'Cache-boutons'])}
        {col('La Maison', ['Notre histoire', 'Le journal', 'Nos boutiques', 'Nous écrire'])}
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold-300)', marginBottom: 16 }}>Carte postale</div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--linen-200)', opacity: .8, marginBottom: 16 }}>Un rayon de soleil dans votre boîte mail — nouveautés &amp; petites attentions.</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <Input variant="line" placeholder="Votre e-mail" style={{ flex: 1 }} />
            <Button variant="gold" size="sm">OK</Button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '.06em', color: 'var(--linen-200)', opacity: .7 }}>
          <span>© 2026 Barbara Style · Côte d'Azur</span>
          <span>CGV · Confidentialité · Livraison &amp; retours</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Header, Footer });