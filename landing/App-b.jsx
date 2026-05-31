// App-b.jsx — Variante B (DA pastel/SaaS) assembly + Tweaks
const { useEffect: useEffectAppB } = React;

const TWEAK_DEFAULTS_B = /*EDITMODE-BEGIN*/{
  "hero": "Animé",
  "accent": "#8B5CF6",
  "layout": "Standard",
  "heroHeadline": "Vous photographiez — nous attirons vos clients.",
  "showRail": true
}/*EDITMODE-END*/;

// Hero treatments — 'Standard' = original split, others are the WOW variants.
const HEROES = {
  'Standard':  'standard',
  'Immersif':  'immersif',
  'Animé':     'anime',
  'Bento':     'bento',
};

// Layout variations — same DA, different page composition.
const LAYOUTS = {
  'Standard':          '',
  'Centré':            'layout-centre',
  'Alterné (zigzag)':  'layout-zigzag',
  'Magazine':          'layout-mag',
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_B);

  useEffectAppB(() => {
    document.documentElement.style.setProperty('--or', t.accent);
  }, [t.accent]);

  useEffectAppB(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  useEffectAppB(() => {
    if (t.hero === 'Animé') return;            // animated hero keeps its own headline (rotating word)
    const h = document.querySelector('.hero h1');
    if (!h) return;
    const text = t.heroHeadline || '';
    const parts = text.split('—');
    const lead = parts.length > 1 ? parts[0].trim() + ' —' : '';
    const rest = (parts.length > 1 ? parts.slice(1).join('—') : text).trim();
    const words = rest.split(' ');
    const last = words.pop();
    h.innerHTML =
      (lead ? `<span class="small-lead">${lead}</span>` : '') +
      words.join(' ') + ' <em>' + last + '</em>';
  }, [t.heroHeadline, t.hero]);

  return (
    <div className={"page " + (LAYOUTS[t.layout] || '')}>
      <Nav />
      {t.showRail && <SideRail />}
      <main>
        {t.hero === 'Standard' ? <Hero /> : <HeroWow variant={HEROES[t.hero]} />}
        <Schema />
        <Studio />
        <Benefices />
        <Preuves />
        <Simulateur />
        <Callback />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakSelect label="Style du hero" value={t.hero}
                     options={Object.keys(HEROES)}
                     onChange={(v) => setTweak('hero', v)} />
        <TweakSection label="Mise en page" />
        <TweakSelect label="Agencement" value={t.layout}
                     options={Object.keys(LAYOUTS)}
                     onChange={(v) => setTweak('layout', v)} />
        <TweakSection label="Identité" />
        <TweakColor label="Accent" value={t.accent}
                    options={['#8B5CF6', '#6D3FE0', '#EC6F8E', '#3B82F6', '#10B981']}
                    onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Accroche du hero" />
        <TweakSelect label="Variante" value={t.heroHeadline}
                     options={[
                       'Vous photographiez — nous attirons vos clients.',
                       'Concentrez-vous sur l\u2019image — on s\u2019occupe des clients.',
                       'Vos photos méritent — d\u2019être vues.',
                       'Pendant que vous photographiez — votre agenda se remplit.',
                     ]}
                     onChange={(v) => setTweak('heroHeadline', v)} />
        <TweakSection label="Mise en page" />
        <TweakToggle label="Repère latéral" value={t.showRail}
                     onChange={(v) => setTweak('showRail', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
