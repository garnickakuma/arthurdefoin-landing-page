// Nav.jsx — fixed top navigation, transparent at rest, ivory-blur on scroll
const { useState: useStateNav, useEffect: useEffectNav } = React;

function Nav({ ctaLabel = 'Réserver un appel' }) {
  const [scrolled, setScrolled] = useStateNav(false);
  const [open, setOpen] = useStateNav(false);
  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // refresh lucide icons when the burger state changes
  useEffectNav(() => {if (window.lucide) window.lucide.createIcons();}, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "") + (open ? " menu-open" : "")}>
      <div className="container">
        <div className="nav-inner">
          <a className="nav-brand" href="#top" onClick={go('top')}>
            <img className="nav-logo" src="landing/logo-a.png" alt="Arthur Defoin" />
            <span className="brand-text">
              <span className="name">Arthur Defoin</span>
              <span className="tag">Publicité Meta · Photographes</span>
            </span>
          </a>

          <div className="nav-links">
            <a onClick={go('mecanisme')}>Méthode</a>
            <a onClick={go('studio')}>Mon studio</a>
            <a onClick={go('benefices')}>Objectifs</a>
            <a onClick={go('preuves')}>Résultats</a>
            <a onClick={go('simulateur')}>Simulateur</a>
            <button className="nav-cta nav-cta-mobile" onClick={go('rappel')}>{ctaLabel}</button>
          </div>

          <button className="nav-cta nav-cta-desktop" onClick={go('rappel')}>{ctaLabel}</button>

          <button className="nav-burger" aria-label="Menu" aria-expanded={open}
          onClick={() => setOpen((o) => !o)}>
            <i data-lucide={open ? 'x' : 'menu'}></i>
          </button>
        </div>
      </div>
    </nav>);

}

window.Nav = Nav;