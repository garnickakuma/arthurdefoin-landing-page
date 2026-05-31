// Schema.jsx — schéma animé du mécanisme : photographe → pub Meta → prospects → CA
function Schema() {
  const steps = [
    { ico: 'camera',      step: '1', title: 'Vous photographiez', sub: 'Vous faites ce que vous faites de mieux.' },
    { ico: 'megaphone',   step: '2', title: 'Je place vos images', sub: 'Campagnes Meta ciblées sur les bons profils.' },
    { ico: 'users',       step: '3', title: 'Des prospects qualifiés', sub: 'Les bonnes personnes vous écrivent.' },
    { ico: 'trending-up', step: '4', title: 'Votre CA augmente', sub: 'Automatiquement, mois après mois.', payoff: true },
  ];
  return (
    <section className="section schema" id="mecanisme">
      <div className="container">
        <div className="schema-head">
          <div className="eyebrow">
            <span className="rule"></span>
            <span>Le mécanisme</span>
          </div>
          <h2>Vous photographiez. <em>Le reste tourne tout seul.</em></h2>
          <p className="lede">
            Pas de tunnel compliqué&nbsp;: quatre temps, et une boucle qui
            s'entretient d'elle-même pendant que vous êtes derrière l'objectif.
          </p>
        </div>

        <div className="schema-flow">
          {steps.map((s, i) => (
            <React.Fragment key={s.step}>
              <div className={"node" + (s.payoff ? " payoff" : "")}>
                <div className="node-badge"><i data-lucide={s.ico}></i></div>
                <div className="node-step">{s.step}</div>
                <div className="node-title">{s.title}</div>
                <div className="node-sub">{s.sub}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="connector" style={{ '--d': i * 0.5 + 's' }}>
                  <span className="dot"></span>
                  <i data-lucide="chevron-right"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="schema-loop">
          <span className="loop-line"></span>
          <span className="loop-chip">
            <i data-lucide="refresh-cw"></i>
            En continu — pendant que vous photographiez
          </span>
          <span className="loop-line"></span>
        </div>
      </div>
    </section>
  );
}

window.Schema = Schema;
