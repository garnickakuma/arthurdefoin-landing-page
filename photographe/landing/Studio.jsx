// Studio.jsx — "Amour & Lumière" proof: Arthur lives the craft
function Studio() {
  // Agenda d'avril 2026 — reconstitué (preuve : agenda plein)
  const jours = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
  const semaines = [
  [
  { d: null }, { d: null },
  { d: 1, ev: [['16:00', 'Lili', 'Constant'], ['18:00', 'Myriam', 'Ndjave']] },
  { d: 2, ev: [['14:00', 'Axel', 'Schneider'], ['17:00', 'Awa', 'Traoré']] },
  { d: 3, ev: [['15:00', 'Laura', 'Lachaud'], ['17:00', 'Camelia', 'Aymen']] },
  { d: 4, ev: [['10:00', 'Oceane', 'Courtas'], ['14:00', 'Jessica', 'Vincent'], ['17:00', 'Hélène', 'Barbe M.']] },
  { d: 5, ev: [['10:00', 'Gaelle', 'Cazadieu'], ['16:00', 'Alexia', 'Ribeiro']] }],

  [
  { d: 6, ferie: 'Lundi de Pâques' },
  { d: 7, ev: [['15:30', 'Oceane', 'Bizet'], ['18:00', 'Lauriane', 'Coulon']] },
  { d: 8, ev: [['11:00', 'Daniela', 'Santos'], ['17:00', 'Clara', 'Vasseur']] },
  { d: 9 },
  { d: 10, ev: [['11:00', 'Joana', 'Pouvreau'], ['16:00', 'Sophie', 'Marchand']] },
  { d: 11, ev: [['10:00', 'Prescilia', 'Da costa'], ['14:00', 'Melinda', 'Da costa'], ['17:00', 'Mélanie', 'Focqueu']] },
  { d: 12, ev: [['11:00', 'Marine', 'Minard'], ['16:00', 'Lorie', 'Lorente']] }],

  [
  { d: 13, ev: [['11:00', 'Ousmane', 'Dramé'], ['17:00', 'Ravaka', 'Razafindra']] },
  { d: 14, ev: [['16:00', 'Estelle', 'Heullant'], ['18:00', 'Fanny', 'Schalk']] },
  { d: 15, ev: [['11:00', 'Kaoutar', 'Kssir'], ['16:00', 'Isabelle', 'Brice']] },
  { d: 16 },
  { d: 17, ev: [['15:30', 'Laure', 'Martins']] },
  { d: 18, ev: [['10:00', 'Bérengère', 'Simon'], ['13:00', 'Inès', 'Bonnet'], ['16:00', 'Manon', 'Delaunay']] },
  { d: 19, ev: [['11:00', 'Alexia', 'Souza s.'], ['15:30', 'Capucine', 'Reboul']] }],

  [
  { d: 20, ev: [['11:00', 'Marie-Louise', 'Salomon'], ['17:00', 'Laetitia', 'Gaillard']] },
  { d: 21, ev: [['14:00', 'Sébastian', 'Billard'], ['16:00', 'Bocar', 'Sow']] },
  { d: 22, ev: [['11:00', 'Laëtitia', 'Verraleweck'], ['14:00', 'Emanuela', 'Haxhi']] },
  { d: 23 },
  { d: 24, ev: [['15:00', 'Nadia', 'Ali cherif']] },
  { d: 25, ev: [['10:00', 'Pauline', 'Marty'], ['12:00', 'Chloé', 'Perrin'], ['15:00', 'Théo', 'Roussel']] },
  { d: 26, ev: [['11:00', 'Léna', 'Fontaine'], ['16:00', 'Maël', 'Guérin']] }]];

  // Quelques images du studio — rythme vertical / horizontal
  const photos = [
  { src: 'landing/assets/studio-soeurs.jpg', alt: 'Deux sœurs au studio' },
  { src: 'landing/assets/studio-couple.jpg', alt: 'Séance couple' },
  { src: 'landing/assets/studio-nouveaune1.jpg', alt: 'Nouveau-né' },
  { src: 'landing/assets/studio-garcon.jpg', alt: 'Portrait enfant' },
  { src: 'landing/assets/studio-maman.jpg', alt: 'Maman et son bébé' },
  { src: 'landing/assets/studio-bebe-bow.jpg', alt: 'Bébé en séance' },
  { src: 'landing/assets/studio-nouveaune2.jpg', alt: 'Nouveau-né' },
  { src: 'landing/assets/studio-papa.jpg', alt: 'Papa et son bébé' }];



  return (
    <section className="section studio" id="studio">
      <div className="container">
        <div className="studio-inner">
          <div className="studio-head">
            <div className="eyebrow">
              <span className="rule"></span>
              <span className="num">02</span>
              <span>LE STUDIO AMOUR ET LUMIÈRE</span>
            </div>
            <h2>
              Je connais votre métier —<br /><em>je le vis aussi</em>.
            </h2>
          </div>

          <div className="studio-gallery">
            <img className="studio-logo-top" src="landing/assets/amour-lumiere-logo.png"
            alt="Amour et Lumière" />
            <div className="studio-portrait-wrap">
              <img className="studio-portrait" src="landing/assets/arthur-studio.jpg"
              alt="Arthur, photographe au studio Amour et Lumière" />
            </div>
            <div className="studio-contact">
              {photos.map((p, i) =>
              <figure className="contact-item" key={i}>
                  <img src={p.src} alt={p.alt} />
                </figure>
              )}
            </div>
          </div>

          <div className="studio-body">
            <p className="lede">
              Amour et Lumière, c'est notre studio. Nous sommes deux photographes et nous faisons principalement des séances famille et enfants ainsi que des mariages. C'est en remplissant 

              <em> notre propre</em> agenda
              grâce à la publicité Meta que j'ai compris ce qui fonctionne vraiment
              pour un photographe — et ce qui fait perdre du budget.
            </p>

            <div className="studio-stats">
              <div className="stat">
                <span className="num">+ <em>45</em></span>
                <span className="lbl">RÉSERVATIONS PAR MOIS</span>
              </div>
              <div className="stat">
                <span className="num"><em>90</em>&nbsp;%</span>
                <span className="lbl">d'agenda rempli via la pub</span>
              </div>
              <div className="stat">
                <span className="num"><em>0</em></span>
                <span className="lbl">€ dépensé en démarchage</span>
              </div>
            </div>

            <p className="studio-sign">
              «&nbsp;Je ne vous vends pas une méthode théorique. Je vous transmets
              celle qui remplit <strong>notre agenda</strong>.&nbsp;»
            </p>
          </div>
        </div>

        {/* ----- Preuve : l'agenda d'avril ----- */}
        <div className="studio-agenda">
          <div className="agenda-head">
            <div className="eyebrow">
              <span className="rule"></span>
              <span>Notre agenda — avril 2026</span>
            </div>
            <p className="agenda-sub">
              Voici une vraie capture de notre planning. Chaque créneau&nbsp;= une séance
              réservée, presque toutes venues de la publicité Meta.
            </p>
          </div>

          <div className="agenda-cal" role="table" aria-label="Agenda avril 2026">
            <div className="agenda-dows" role="row">
              {jours.map((j) =>
              <span className="dow" key={j} role="columnheader">{j}</span>
              )}
            </div>
            <div className="agenda-weeks">
              {semaines.map((sem, wi) =>
              <div className="agenda-week" role="row" key={wi}>
                  {sem.map((cell, ci) =>
                <div
                  className={'agenda-cell' + (ci >= 5 ? ' weekend' : '') + (cell.d == null ? ' muted' : '')}
                  role="cell" key={ci}>

                      {cell.d != null &&
                  <span className="cell-day">{cell.d}</span>
                  }
                      {cell.ferie &&
                  <span className="cell-ferie">{cell.ferie}</span>
                  }
                      {cell.ev &&
                  <div className="cell-events">
                          {cell.ev.map((e, ei) =>
                    <span className="ev" key={ei}>
                              <span className="ev-time">{e[0]}</span>
                              <span className="ev-name">
                                {e[1]}&nbsp;{e[2].charAt(0)}<span className="ev-blur" aria-hidden="true">{e[2].slice(1)}</span>
                              </span>
                            </span>
                    )}
                        </div>
                  }
                    </div>
                )}
                </div>
              )}
            </div>
          </div>

          <p className="agenda-foot">
            <em>46</em> séances réservées sur les 4 premières semaines d'avril.
          </p>
        </div>
      </div>
    </section>);

}

window.Studio = Studio;