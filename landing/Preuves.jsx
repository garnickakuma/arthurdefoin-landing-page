// Preuves.jsx — proof: results from photographers + testimonials
function Preuves() {
  const results = [
  { meta: 'Mariage', num: '12€', desc: "En moyenne le coût d'un lead pour du mariage." },
  { meta: 'Réservations gratuites', num: '20€', desc: "Coût moyen par réservation effectuée" },
  { meta: "Chiffre d'affaire mai 2026", num: '6824€', desc: "On a dépensé 1476€ en publicité sur le mois de mai 2026." }];


  const quotes = [
  {
    q: "En trois mois, j'ai signé plus de mariages que sur toute l'année précédente. Et surtout, je <em>sais</em> enfin d'où viennent mes clients.",
    name: 'Camille R.',
    role: 'Photographe mariage · Nantes'
  },
  {
    q: "Arthur parle photo avant de parler pub. Il a compris mon studio en un appel. Mon agenda grossesse est plein <em>deux mois à l'avance</em>.",
    name: 'Léa M.',
    role: 'Studio grossesse · Annecy'
  }];


  return (
    <section className="section preuves" id="preuves">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>
              <span className="num">04</span>
              <span>Résultats</span>
            </div>
            <h2>Des chiffres,<br /><em>pas des promesses</em>.</h2>
          </div>
          <p className="lede">Je vous montre nos résultats avec Amour et Lumière. Même moyenne constatée sur les +50 photographes que j'accompagne.



          </p>
        </div>

        <div className="results-grid">
          {results.map((r, i) =>
          <div className="result-card" key={i}>
              <span className="r-meta">{r.meta}</span>
              <span className="r-num"><em>{r.num}</em></span>
              <p className="r-desc">{r.desc}</p>
            </div>
          )}
        </div>

        <div className="testimonials">
          {quotes.map((t, i) =>
          <div className="testimonial" key={i}>
              <blockquote dangerouslySetInnerHTML={{ __html: '«\u00A0' + t.q + '\u00A0»' }}></blockquote>
              <div className="t-author">
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

window.Preuves = Preuves;