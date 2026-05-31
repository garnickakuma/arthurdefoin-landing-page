// HeroWow.jsx — hero treatments "WOW" (DA Variante B)
// variants: immersif | anime | aurora | typewriter | carousel | bento
const { useState: useStateHW, useEffect: useEffectHW } = React;

function HeroWow({ variant = 'immersif' }) {
  const [typed, setTyped] = useStateHW('');
  const [slide, setSlide] = useStateHW(0);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  // typewriter
  useEffectHW(() => {
    if (variant !== 'typewriter') return;
    const words = ['clients', 'mariages', 'grossesses', 'familles', 'abonnés'];
    let wi = 0,ci = 0,deleting = false,to;
    const tick = () => {
      const w = words[wi];
      if (!deleting) {
        ci++;setTyped(w.slice(0, ci));
        if (ci === w.length) {deleting = true;to = setTimeout(tick, 1500);return;}
      } else {
        ci--;setTyped(w.slice(0, ci));
        if (ci === 0) {deleting = false;wi = (wi + 1) % words.length;}
      }
      to = setTimeout(tick, deleting ? 55 : 100);
    };
    to = setTimeout(tick, 400);
    return () => clearTimeout(to);
  }, [variant]);

  // carousel auto-advance + active class toggling (DOM, avoids class/className issues)
  useEffectHW(() => {
    if (variant !== 'carousel') return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 4200);
    return () => clearInterval(id);
  }, [variant]);
  useEffectHW(() => {
    if (variant !== 'carousel') return;
    const slides = document.querySelectorAll('.hero-carousel .carousel-bg image-slot');
    slides.forEach((el, i) => el.classList.toggle('active', i === slide));
  }, [variant, slide]);

  const Actions = () =>
  <div className="hero-actions">
      <a className="btn btn-primary" href="#simulateur" onClick={go('simulateur')}>
        Voir le simulateur <span className="arrow">→</span>
      </a>
    </div>;

  const Eyebrow = () =>
  <div className="eyebrow">
      <span className="rule"></span>
      <span>Publicité Meta pour photographes</span>
    </div>;

  const Lede = () =>
  <p className="lede">Je suis photographe et media buyer Meta Ads.  
Je lance, gère et optimise vos publicités.

  </p>;


  // ---------- IMMERSIF ----------
  if (variant === 'immersif') {
    return (
      <section className="section hero hero-wow hero-immersif" id="top">
        <div className="hero-blob"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow />
              <h1>
                <span className="small-lead">Vous photographiez —</span>
                nous attirons vos <em>clients</em>.
              </h1>
              <p className="lede">
                Je suis photographe, comme vous, et media buyer spécialisé Meta Ads.
                Pendant que vous êtes derrière l'objectif, vos campagnes travaillent.
              </p>
              <Actions />
              <div className="trust-strip">
                <span><strong>22</strong> photographes accompagnés</span>
                <span className="dot"></span>
                <span>France · Belgique · Suisse</span>
              </div>
            </div>
            <div className="hero-visual">
              <image-slot id="hero-portrait" shape="rect" fit="cover" class="ph"
              placeholder="Glissez votre portrait"></image-slot>
              <div className="float-chip chip-1"><strong>× 4,2</strong><span>ROAS moyen</span></div>
              <div className="float-chip chip-2"><strong>12 €</strong><span>par lead qualifié</span></div>
              <div className="float-chip chip-3"><strong>+ 38 %</strong><span>demandes / mois</span></div>
            </div>
          </div>
        </div>
      </section>);

  }

  // ---------- ANIMÉ (mot qui défile) ----------
  if (variant === 'anime') {
    const words = ['prospects', 'clients', 'réservations', 'prospects'];
    return (
      <section className="section hero hero-wow hero-anime" id="top">
        <div className="hero-halo"></div>
        <div className="container">
          <div className="hero-center">
            <Eyebrow />
            <h1>
              <span className="small-lead">Vous photographiez —</span>
              nous attirons vos&nbsp;
              <span className="rotator"><ul>{words.map((w, i) => <li key={i}>{w}</li>)}</ul></span>
              <span className="dotfix">.</span>
            </h1>
            <Lede />
            <Actions />
          </div>
        </div>
      </section>);

  }

  // ---------- AURORA (dégradé animé dans le mot) ----------
  if (variant === 'aurora') {
    return (
      <section className="section hero hero-wow hero-aurora" id="top">
        <div className="aurora-bg"></div>
        <div className="container">
          <div className="hero-center">
            <Eyebrow />
            <h1>
              <span className="small-lead">Vous photographiez —</span>
              nous attirons vos <span className="aurora-word">clients</span>.
            </h1>
            <Lede />
            <Actions />
            <div className="trust-strip">
              <span><strong>22</strong> photographes accompagnés</span>
              <span className="dot"></span>
              <span>France · Belgique · Suisse</span>
            </div>
          </div>
        </div>
      </section>);

  }

  // ---------- MACHINE À ÉCRIRE ----------
  if (variant === 'typewriter') {
    return (
      <section className="section hero hero-wow hero-typewriter" id="top">
        <div className="hero-halo"></div>
        <div className="container">
          <div className="hero-center">
            <Eyebrow />
            <h1>
              <span className="small-lead">Vous photographiez —</span>
              nous attirons vos&nbsp;
              <span className="tw"><span className="tw-text">{typed}</span><span className="tw-caret"></span></span>
            </h1>
            <Lede />
            <Actions />
          </div>
        </div>
      </section>);

  }

  // ---------- CARROUSEL IMMERSIF (diaporama en fond) ----------
  if (variant === 'carousel') {
    return (
      <section className="section hero hero-wow hero-carousel" id="top">
        <div className="carousel-bg">
          <image-slot id="hero-portrait" shape="rect" fit="cover" class="ph" placeholder="Photo 1"></image-slot>
          <image-slot id="hero-slide-2" shape="rect" fit="cover" class="ph" placeholder="Photo 2"></image-slot>
          <image-slot id="hero-slide-3" shape="rect" fit="cover" class="ph" placeholder="Photo 3"></image-slot>
          <div className="carousel-veil"></div>
        </div>
        <div className="container">
          <div className="hero-center on-photo">
            <Eyebrow />
            <h1>
              <span className="small-lead">Vous photographiez —</span>
              nous attirons vos <em>clients</em>.
            </h1>
            <Lede />
            <Actions />
          </div>
        </div>
      </section>);

  }

  // ---------- BENTO ----------
  return (
    <section className="section hero hero-wow hero-bento" id="top">
      <div className="container">
        <div className="bento">
          <div className="bento-cell bento-head">
            <Eyebrow />
            <h1>
              <span className="small-lead">Vous photographiez —</span>
              nous attirons vos <em>clients</em>.
            </h1>
            <p className="lede">
              Media buyer Meta Ads, photographe comme vous. Vos campagnes
              remplissent votre agenda pendant que vous shootez.
            </p>
            <Actions />
          </div>
          <div className="bento-cell bento-photo">
            <image-slot id="hero-portrait" shape="rect" fit="cover" class="ph"
            placeholder="Glissez votre portrait"></image-slot>
          </div>
          <div className="bento-cell bento-stat"><strong>× 4,2</strong><span>ROAS moyen constaté</span></div>
          <div className="bento-cell bento-stat alt"><strong>12 €</strong><span>coût par lead qualifié</span></div>
          <div className="bento-cell bento-cta">
            <span className="bento-cta-lbl">Votre retour sur investissement&nbsp;?</span>
            <a className="btn" href="#simulateur" onClick={go('simulateur')}>
              Lancer le simulateur <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>);

}

window.HeroWow = HeroWow;