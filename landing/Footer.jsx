// Footer.jsx
function Footer() {
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-brand-lockup">
              <img className="footer-logo" src="landing/logo-a.png" alt="Arthur Defoin" />
              <span className="name">Arthur Defoin</span>
            </span>
            <p>Photographe au studio Amour & Lumière et media buyer spécialiste Meta Ads pour photographes. J'accompagne + de 50 photographes en France, Belgique et Suisse.</p>
          </div>
          <div>
            <h4>Naviguer</h4>
            <ul>
              <li><a href="#studio" onClick={go('studio')}>Le studio</a></li>
              <li><a href="#benefices" onClick={go('benefices')}>Bénéfices</a></li>
              <li><a href="#preuves" onClick={go('preuves')}>Résultats</a></li>
              <li><a href="#simulateur" onClick={go('simulateur')}>Simulateur</a></li>
            </ul>
          </div>
          <div>
            <h4>Photographes</h4>
            <ul>
              <li><a>Mariage</a></li>
              <li><a>Grossesse &amp; nouveau-né</a></li>
              <li><a>Famille &amp; portrait</a></li>
              <li><a>Couple</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a>defoin.arthur@gmail.com</a></li>
              <li><a href="#rappel" onClick={go('rappel')}>Réserver un appel</a></li>
              <li><a>France · Belgique · Suisse</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Arthur Defoin • Media Buyer</span>
          <span>Mentions légales · Politique de confidentialité</span>
        </div>
      </div>
    </footer>);

}

window.Footer = Footer;