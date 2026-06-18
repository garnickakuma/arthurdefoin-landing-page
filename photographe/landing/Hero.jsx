// Hero.jsx — editorial split hero
function Hero() {
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <section className="section hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>
              <span className="num">01</span>
              <span>Publicité Meta pour photographes</span>
            </div>
            <h1>
              <span className="small-lead">Vous photographiez —</span>
              nous attirons vos <em>clients</em>.
            </h1>
            <p className="lede">
              Je suis photographe, comme vous, et media buyer spécialisé Meta&nbsp;Ads.
              Pendant que vous êtes derrière l'objectif, vos campagnes travaillent&nbsp;:
              elles placent vos plus belles images devant les bonnes personnes,
              au bon moment.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#simulateur" onClick={go('simulateur')}>
                Calculer mon retour <span className="arrow">→</span>
              </a>
              <a className="btn btn-link" href="#benefices" onClick={go('benefices')}>
                Voir ce que ça change
              </a>
            </div>
            <div className="trust-strip">
              <span><strong>54</strong> photographes accompagnés</span>
              <span className="dot"></span>
              <span>France · Belgique · Suisse</span>
              <span className="dot"></span>
              <span>Sans engagement</span>
            </div>
          </div>

          <div className="hero-portrait">
            <image-slot id="hero-portrait" shape="rect" fit="cover" class="ph"
            placeholder="Glissez un portrait d'Arthur ou une de vos plus belles images"></image-slot>
          </div>
        </div>

        <div className="hero-meta">
          <div className="stat">
            <span className="num">× <em>4,2</em></span>
            <span className="lbl">ROAS moyen constaté</span>
          </div>
          <div className="stat">
            <span className="num">€&nbsp;<em>12</em></span>
            <span className="lbl">Coût par lead qualifié</span>
          </div>
          <div className="stat">
            <span className="num">+ <em>38</em><span style={{ fontSize: 28 }}> </span></span>
            <span className="lbl">Demandes de réservation / mois</span>
          </div>
          <div className="stat">
            <span className="num"><em>5</em><span style={{ fontSize: 28 }}> jours.</span></span>
            <span className="lbl">Avant les premiers résultats</span>
          </div>
        </div>
      </div>
    </section>);

}

window.Hero = Hero;