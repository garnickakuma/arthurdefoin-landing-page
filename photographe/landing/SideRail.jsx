// SideRail.jsx — fixed right-side section indicator
const { useState: useStateRail, useEffect: useEffectRail } = React;

function SideRail() {
  const sections = [
    { id: 'top',        n: '01' },
    { id: 'studio',     n: '02' },
    { id: 'benefices',  n: '03' },
    { id: 'preuves',    n: '04' },
    { id: 'simulateur', n: '05' },
    { id: 'rappel',     n: '06' },
  ];
  const [active, setActive] = useStateRail('top');

  useEffectRail(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let cur = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="side-rail" aria-hidden="true">
      {sections.map((s) => (
        <a key={s.id} className={active === s.id ? 'active' : ''}
           onClick={(e) => { e.preventDefault(); const el = document.getElementById(s.id); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' }); }}>
          {s.n}
        </a>
      ))}
    </div>
  );
}

window.SideRail = SideRail;
