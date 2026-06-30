const WA_LINK = "https://wa.me/33668019999?text=" +
  encodeURIComponent("Bonjour Audran, je souhaite réserver une séance photo au studio Stellar.");

function FloatingButton() {
  return (
    <a href={WA_LINK} className="float-btn" aria-label="Contactez-moi sur WhatsApp">
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink-900)' }} />
      Contactez-moi
    </a>
  );
}

function App() {
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      document.documentElement.classList.add('anim');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
      document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
      return () => io.disconnect();
    }
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Advantages />
        <Photographer />
        <Pricing />
        <Reviews />
        <Studio />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingButton />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
