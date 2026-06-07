// Barbara Style — Boutique vintage : page d'accueil
// 3 directions de héro (carte postale / Riviera 70s / affiche voyage),
// pilotées par le tweak `hero`.

function Home({ go, addToCart, wish, toggleWish, t }) {
  const { Button } = window.BarbaraStyleDesignSystem_eb9639;
  const wrap = { maxWidth: 1240, margin: '0 auto', padding: '0 32px' };
  const kicker = t.heroKicker || 'Nouvelle collection · Été';
  const title = t.heroTitle || 'Scintiller au';
  const accent = t.heroAccent || 'soleil';

  const HeroCTAs = ({ light }) =>
  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      <Button variant="gold" size="lg" onClick={() => go('collection')}>Découvrir la collection</Button>
      <Button variant="ghost" size="lg" onClick={() => go('collection')}
    style={light ? { color: '#fff', borderColor: 'rgba(255,255,255,.7)' } : undefined}>Les nouveautés</Button>
    </div>;


  /* ---------- HÉRO A — Carte postale ---------- */
  const HeroPostcard = () =>
  <section style={{ ...wrap, paddingTop: 30 }}>
      <div className="vx-postcard vx-rise" style={{ borderRadius: 4 }}>
        <div className="vx-postcard-inner" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', minHeight: 540 }}>
          {/* Visuel */}
          <div className="vx-grain vx-veil" style={{ position: 'relative', ...window.GRADS.gold }}>
            <image-slot id="hero-postcard" fit="cover" shape="rect" placeholder="Déposez votre visuel Riviera"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
            <div style={{ position: 'absolute', left: 36, bottom: 34, zIndex: 4, color: '#fff' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', opacity: .95, marginBottom: 10 }}>{kicker}</div>
              <h1 className="vx-display" style={{ color: '#fff', fontSize: 64, lineHeight: .96, fontWeight: 400 }}>
                {title}<br /><em style={{ color: 'var(--gold-200)' }}>{accent}</em>
              </h1>
            </div>
          </div>
          {/* Panneau message */}
          <div className="vx-paper" style={{ position: 'relative', background: 'var(--linen-200)', padding: '44px 38px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: 22, right: 24 }}><Postmark s={92} /></div>
            <div className="vx-script" style={{ fontSize: 58, color: 'var(--gold-500)', lineHeight: .8, marginBottom: 10 }}>Bonjour</div>
            <span className="vx-eyebrow solo" style={{ marginBottom: 14 }}>De la Côte d'Azur</span>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-700)', marginBottom: 24, maxWidth: 320 }}>Des pièces qui attrapent la lumière, à prix légers. L'élégance de la femme, en toute légèreté.

          </p>
            <hr className="vx-perf" style={{ margin: '0 0 24px' }} />
            <HeroCTAs />
          </div>
        </div>
      </div>
    </section>;


  /* ---------- HÉRO B — Riviera 70s (split + rayons) ---------- */
  const HeroRiviera = () =>
  <section style={{ ...wrap, paddingTop: 30 }}>
      <div className="vx-rise" style={{ display: 'grid', gridTemplateColumns: '1fr 1.04fr', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', minHeight: 560 }}>
        {/* Panneau texte + soleil */}
        <div className="vx-paper" style={{ position: 'relative', background: 'var(--cream-300)', padding: '0 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          {t.sunburst &&
        <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 520, height: 260, pointerEvents: 'none' }}>
              <SunBurst c="var(--gold-300)" op={.5} rays={26} />
            </div>
        }
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
            <span className="vx-eyebrow" style={{ marginBottom: 20 }}>{kicker}</span>
            <h1 className="vx-display" style={{ fontSize: 86, lineHeight: .92, fontWeight: 400, margin: '4px 0 0' }}>
              {title}<br /><em>{accent}</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 16.5, lineHeight: 1.7, color: 'var(--ink-700)', margin: '24px 0 30px', maxWidth: 400 }}>
              Des pièces qui attrapent la lumière, à petits prix. L'élégance de la femme, en toute légèreté.
            </p>
            <HeroCTAs />
            <div style={{ marginTop: 30 }}><Wave c="var(--vx-azur)" op={.7} w={160} /></div>
          </div>
        </div>
        {/* Visuel */}
        <div className="vx-grain vx-veil" style={{ position: 'relative', ...window.GRADS.amber }}>
          <image-slot id="hero-riviera" fit="cover" shape="rect" placeholder="Déposez votre visuel mannequin"
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
        </div>
      </div>
    </section>;


  /* ---------- HÉRO C — Affiche voyage (centré, plein cadre) ---------- */
  const HeroPoster = () =>
  <section style={{ ...wrap, paddingTop: 30 }}>
      <div className="vx-grain vx-veil vx-rise" style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 600, ...window.GRADS.honey, boxShadow: 'var(--shadow-md)' }}>
        <image-slot id="hero-poster" fit="cover" shape="rect" placeholder="Déposez votre visuel pleine page"
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
        {t.sunburst &&
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 760, height: 360, zIndex: 3, pointerEvents: 'none' }}>
            <SunBurst c="rgba(255,255,255,.55)" op={.5} rays={30} />
          </div>
      }
        <div style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', padding: '0 24px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '.3em', textTransform: 'uppercase', marginBottom: 18, opacity: .95, whiteSpace: 'nowrap' }}>{kicker}</span>
          <h1 className="vx-display" style={{ color: '#fff', fontSize: 82, lineHeight: .94, fontWeight: 400, whiteSpace: 'nowrap' }}>
            {title} <em style={{ color: 'var(--gold-200)' }}>{accent}</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 17, lineHeight: 1.6, opacity: .95, margin: '22px 0 32px', maxWidth: 460 }}>
            Des pièces qui attrapent la lumière, à petits prix — l'élégance en toute légèreté.
          </p>
          <HeroCTAs light />
        </div>
      </div>
    </section>;


  const Hero = t.hero === 'riviera' ? HeroRiviera : t.hero === 'poster' ? HeroPoster : HeroPostcard;

  return (
    <div>
      <Hero />

      {/* OFFRE PHARE — 2+1 & 4+1 offert */}
      <OfferHighlight go={go} sunburst={t.sunburst} />

      {/* CATÉGORIES */}
      <section style={{ ...wrap, marginTop: 90 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="vx-eyebrow">Explorer</span>
          <h2 className="vx-display" style={{ fontSize: 44, marginTop: 12 }}>Par envie</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          {window.CATEGORIES.map((c) =>
          <button key={c.name} onClick={() => go('collection')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, textAlign: 'center' }}>
              <div className="vx-card-media vx-grain" style={{ position: 'relative', height: 260, ...c.grad, marginBottom: 16 }}>
                <image-slot id={c.slot} fit="cover" shape="rect" placeholder={c.name}
              style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
              </div>
              <div className="vx-display" style={{ fontSize: 23, fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '.04em', color: 'var(--ink-500)', marginTop: 3 }}>{c.note}</div>
            </button>
          )}
        </div>
      </section>

      {/* SÉLECTION */}
      <section style={{ ...wrap, marginTop: 96 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 34 }}>
          <div>
            <span className="vx-eyebrow">Coups de cœur</span>
            <h2 className="vx-display" style={{ fontSize: 44, marginTop: 12 }}>Sélection solaire</h2>
          </div>
          <span className="vx-link" onClick={() => go('collection')}>Tout voir</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26 }}>
          {window.PRODUCTS.slice(0, 4).map((p) =>
          <VintageCard key={p.id} p={p} wishlisted={!!wish[p.id]} onWishlist={() => toggleWish(p.id)}
          onAdd={() => addToCart(p)} onClick={() => go('product', p)} />
          )}
        </div>
      </section>

      {/* BANDE ÉDITORIALE — ambiance plein cadre */}
      <section style={{ marginTop: 104 }}>
        <div className="vx-grain vx-veil" style={{ position: 'relative', height: 420, ...window.GRADS.blush }}>
          <image-slot id="ambiance" fit="cover" shape="rect" placeholder="Déposez une ambiance plein cadre"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}></image-slot>
          <div style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', padding: '0 24px' }}>
            <div style={{ marginBottom: 14, opacity: .9 }}><SunArcs c="#fff" op={.85} /></div>
            <h2 className="vx-display" style={{ color: '#fff', fontSize: 52, fontWeight: 400, maxWidth: 720, lineHeight: 1.06 }}>
              « Le luxe d'un bijou, la <em style={{ color: 'var(--gold-200)' }}>douceur</em> d'un été »
            </h2>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '.26em', textTransform: 'uppercase', marginTop: 18, opacity: .9 }}>Imaginé en France</span>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="vx-paper" style={{ background: 'var(--surface-cream)', marginTop: 0, padding: '72px 0' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, textAlign: 'center' }}>
          {[
          { i: <Icon.gem />, t: 'Plaqué or fin', d: 'Des matières choisies, des finitions soignées qui durent.' },
          { i: <Icon.truck />, t: 'Livraison offerte', d: 'Dès 30 € en France · expédié sous 48 h depuis nos ateliers.' },
          { i: <Icon.leaf />, t: 'Imaginé en France', d: 'Dessiné avec amour sur la Côte d\u2019Azur, à petits prix.' }].
          map((x) =>
          <div key={x.t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13 }}>
              <span style={{ color: 'var(--gold-500)' }}>{x.i}</span>
              <div className="vx-display" style={{ fontSize: 25, fontWeight: 500 }}>{x.t}</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-500)', maxWidth: 260 }}>{x.d}</p>
            </div>
          )}
        </div>
      </section>

      {/* BEST-SELLERS */}
      <section style={{ ...wrap, marginTop: 96 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="vx-eyebrow">On les adore</span>
          <h2 className="vx-display" style={{ fontSize: 44, marginTop: 12 }}>Best-sellers</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26 }}>
          {window.PRODUCTS.slice(4, 8).map((p) =>
          <VintageCard key={p.id} p={p} wishlisted={!!wish[p.id]} onWishlist={() => toggleWish(p.id)}
          onAdd={() => addToCart(p)} onClick={() => go('product', p)} />
          )}
        </div>
      </section>
    </div>);

}

Object.assign(window, { Home });