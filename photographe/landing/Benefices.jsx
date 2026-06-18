// Benefices.jsx — the three outcomes the ads can deliver
function Dot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2.5,7.5 5.5,10.5 11.5,3.5" />
    </svg>);

}

function Benefices() {
  const items = [
  {
    n: '01',
    icon: 'user-round-search',
    title: 'Des prospects qualifiés',
    desc: "Des photographes intéressés laissent leurs coordonnées via un formulaire. Vous recevez des leads chauds — déjà séduits par vos images, prêts à parler d'un shooting.",
    list: ['Leads reçus par e-mail ou SMS', 'Ciblage local ou national', 'Vous rappelez, vous closez'],
    tag: 'Idéal pour les prestations mariage, studio et extérieur'
  },
  {
    n: '02',
    icon: 'calendar-check',
    title: 'Des réservations automatiques',
    desc: "Vous proposez des séances gratuites ? Je mets en place un tunnel de vente : les prospects réservent eux-mêmes leur créneau et deviennent vos clients, sans intervention de votre part.",
    list: ['Tunnel de réservation complet', 'Agenda qui se remplit seul', 'Conversion en vente à la séance'],
    tag: 'Idéal si vous avez ou voulez faire des réservations gratuites'
  },
  {
    n: '03',
    icon: 'eye',
    title: 'De la visibilité',
    desc: "Faire connaître votre studio, votre site et vos pages Facebook & Instagram. On installe votre nom dans l'esprit de votre clientèle locale — pour qu'on pense à vous le moment venu.",
    list: ['Trafic vers votre site', 'Croissance des abonnés Insta / FB', 'Notoriété sur votre zone'],
    tag: 'Idéal pour s\u2019installer durablement'
  }];


  return (
    <section className="section" id="benefices">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>
              <span className="num">03</span>
              <span>OBJECTIFS</span>
            </div>
            <h2>Trois façons<br /><em>de remplir votre agenda</em>.</h2>
          </div>
          <p className="lede">
            La publicité Meta n'est pas une dépense — c'est un investissement
            que l'on choisit selon votre objectif. On définit ensemble lequel
            de ces trois leviers sert le mieux votre studio.
          </p>
        </div>

        <div className="benefices-grid">
          {items.map((b) =>
          <div className="benefice" key={b.n}>
              <div className="b-head">
                <span className="b-num">{b.n}</span>
                <i className="b-ico" data-lucide={b.icon} style={{ width: 28, height: 28 }}></i>
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <ul className="b-list">
                {b.list.map((f, i) =>
              <li key={i}><Dot />{f}</li>
              )}
              </ul>
              <span className="b-tag">{b.tag}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

}

window.Benefices = Benefices;