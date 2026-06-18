// Simulateur.jsx — ROI simulator (centerpiece)
const { useState: useStateSim, useMemo: useMemoSim, useEffect: useEffectSim, useRef: useRefSim } = React;

// ---- Hypothèses (fournies par Arthur) ------------------------------------
const CPL = 12;             // coût moyen par lead qualifié (€)
const CPR = 20;             // coût moyen par réservation gratuite (€)
const TAUX_ANNULATION = 25; // % de réservations gratuites annulées / no-show
const PANIER_SEUIL = 250;   // au-delà : alerte en mode réservations
const PUB_MIN = 100;
const PUB_MAX = 3500;
const PUB_DEFAUT = 500;

const SIM_SPECIALITES = ['Mariage', 'Grossesse', 'Nouveau-né', 'Famille', 'Portrait', 'Corporate'];
const CONV_MARIAGE = 10;
const CONV_AUTRE = 30;
const convForSpec = (s) => s === 'Mariage' ? CONV_MARIAGE : CONV_AUTRE;
const PANIER_PAR_SPEC = { Mariage: 1500 };
const PANIER_AUTRE = 150;
const panierForSpec = (s) => PANIER_PAR_SPEC[s] ?? PANIER_AUTRE;

// Abonnement : 390 € minimum, puis 15 % de la dépense pub
function calcAbo(pub) {
  return Math.max(390, pub * 0.15);
}

function useCounterSim(value, duration = 480) {
  const [display, setDisplay] = useStateSim(value);
  const ref = useRefSim({ from: value, to: value, start: 0 });
  useEffectSim(() => {
    ref.current = { from: display, to: value, start: performance.now() };
    let raf;
    const tick = (t) => {
      const { from, to, start } = ref.current;
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplay(from + (to - from) * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return display;
}

function fmtEURsim(n) { return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' €'; }
function fmtXsim(n) { return '× ' + new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n); }
function fmtIntSim(n) { return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)); }

function SimSlider({ value, min, max, step = 1, onChange, ticks }) {
  const pct = (value - min) / (max - min) * 100;
  return (
    <div>
      <div className="sim-slider">
        <div className="sim-track">
          <div className="sim-fill" style={{ width: pct + '%' }}></div>
        </div>
        <div className="sim-thumb" style={{ left: pct + '%' }}></div>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))} />
      </div>
      {ticks &&
        <div className="sim-ticks">
          {ticks.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      }
    </div>
  );
}

function Simulateur() {
  const [spec, setSpec] = useStateSim('Mariage');
  const [mode, setMode] = useStateSim('leads');
  const [cart, setCart] = useStateSim(panierForSpec('Mariage'));
  const [pub, setPub] = useStateSim(PUB_DEFAUT);

  const conv = convForSpec(spec);
  const pickSpec = (s) => { setSpec(s); setCart(panierForSpec(s)); };

  const cpx = mode === 'leads' ? CPL : CPR;
  const showWarn = mode === 'reservations' && cart > PANIER_SEUIL;

  const result = useMemoSim(() => {
    const abo = calcAbo(pub);
    let volume, clients;
    if (mode === 'leads') {
      volume = pub / CPL;
      clients = volume * (conv / 100);
    } else {
      volume = pub / CPR;
      clients = volume * (1 - TAUX_ANNULATION / 100);
    }
    const revenue = clients * cart;
    const benefice = revenue - pub;
    const roas = pub > 0 ? revenue / pub : 0;
    return { abo, volume, clients, revenue, benefice, roas };
  }, [mode, cart, conv, pub]);

  const dVolume   = useCounterSim(result.volume);
  const dClients  = useCounterSim(result.clients);
  const dRevenue  = useCounterSim(result.revenue);
  const dBenefice = useCounterSim(result.benefice);
  const dRoas     = useCounterSim(result.roas);
  const dAbo      = useCounterSim(result.abo);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <section className="section" id="simulateur">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>
              <span className="num">05</span>
              <span>Simulateur</span>
            </div>
            <h2>Combien rapporterait<br /><em>un mois de publicité</em>&nbsp;?</h2>
          </div>
          <p className="lede">Quelques réglages, une estimation chiffrée. Les projections reposent sur les performances moyennes des campagnes en cours.</p>
        </div>

        <div className="sim">
          {/* ── CONTRÔLES ── */}
          <div className="sim-controls">
            <h3>Votre activité</h3>

            <div className="sim-field">
              <div className="sim-field-head">
                <span className="sim-field-lbl">Quelle prestation mettre en avant&nbsp;?</span>
              </div>
              <div className="sim-chips">
                {SIM_SPECIALITES.map((s) =>
                  <button key={s}
                    className={"sim-chip" + (spec === s ? " active" : "")}
                    onClick={() => pickSpec(s)}>{s}</button>
                )}
              </div>
              {mode === 'leads' &&
                <p className="sim-conv-note">
                  Taux de conversion moyen retenu&nbsp;: <em>{fmtIntSim(conv)}&nbsp;%</em>
                  <span className="scn-sub">{spec === 'Mariage' ? 'closing mariage, plus sélectif' : 'séances studio, portrait & extérieur'}</span>
                </p>
              }
            </div>

            <div className="sim-field sim-objectif">
              <div className="sim-field-head">
                <span className="sim-field-lbl">Objectif des campagnes</span>
              </div>
              <div className="sim-reco">
                <span className="sim-reco-text">
                  <span className="sim-reco-label">Notre méthode chez</span>
                  <img className="sim-reco-logo" src="landing/assets/amour-lumiere-logo.png" alt="Amour et Lumière" />
                </span>
                <svg className="sim-reco-arrow" viewBox="0 0 48 44" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 4 C 20 6, 38 12, 39 33" />
                  <path d="M31 26 L 39 35 L 46 25" />
                </svg>
              </div>
              <div className="sim-seg">
                <button className={mode === 'leads' ? 'active' : ''} onClick={() => setMode('leads')}>
                  Des leads
                  <span className="seg-sub">prospects à rappeler</span>
                </button>
                <button className={mode === 'reservations' ? 'active' : ''} onClick={() => setMode('reservations')}>
                  Réservations gratuites
                  <span className="seg-sub">ils réservent seuls</span>
                </button>
              </div>
              <p className="sim-cpx">
                <i data-lucide="target"></i>
                Coût moyen <em>{fmtEURsim(cpx)}</em>&nbsp;
                {mode === 'leads' ? 'par lead qualifié' : 'par réservation gratuite'}
              </p>
            </div>

            <div className="sim-field">
              <div className="sim-field-head">
                <span className="sim-field-lbl">Panier moyen par client</span>
              </div>
              <div className="sim-input-wrap">
                <input className="sim-input" type="number" min="0" step="10" value={cart}
                  onChange={(e) => setCart(Math.max(0, Number(e.target.value)))} />
                <span className="sim-input-suffix">€</span>
              </div>
              {showWarn &&
                <p className="sim-warn reveal" key="warn">
                  <i data-lucide="alert-triangle"></i>
                  <span>
                    Panier élevé&nbsp;: la réservation gratuite attire surtout des
                    profils en quête de gratuité — elle convertit souvent moins bien
                    et coûte plus cher à l'acquisition. Au-delà de {PANIER_SEUIL}&nbsp;€,
                    les <em>leads qualifiés</em> sont en général plus rentables.
                  </span>
                </p>
              }
            </div>

            <div className="sim-field" style={{ marginBottom: 0 }}>
              <div className="sim-field-head">
                <span className="sim-field-lbl">Dépense publicitaire mensuelle</span>
                <span className="sim-field-val"><em>{fmtIntSim(pub)}</em>&nbsp;€</span>
              </div>
              <SimSlider value={pub} min={PUB_MIN} max={PUB_MAX} step={50} onChange={setPub}
                ticks={['100 €', '1 800 €', '3 500 €']} />

              <div className="sim-abo-badge">
                <i data-lucide="plus-circle"></i>
                <span><strong>{fmtEURsim(dAbo)}</strong> d'abonnement <span className="sim-abo-sub">(gestion &amp; optimisation, non inclus dans les projections)</span></span>
              </div>

              <p className="sim-hint" style={{ marginTop: 14 }}>
                L'abonnement démarre à 390&nbsp;€/mois et représente 15&nbsp;% de votre dépense pub au-delà de ce montant.
              </p>
            </div>
          </div>

          {/* ── RÉSULTATS ── */}
          <div className="sim-result">
            <div>
              <span className="res-eyebrow">Chiffre d'affaires estimé</span>
              <div className="res-num" style={{ marginTop: 14 }}>
                <em>{fmtEURsim(dRevenue)}</em>
              </div>
              <p className="res-sub" style={{ marginTop: 8 }}>
                {mode === 'leads'
                  ? <>≈ {fmtIntSim(dClients)} {Math.round(dClients) > 1 ? 'prestations signées' : 'prestation signée'} · {fmtIntSim(dVolume)} leads</>
                  : <>≈ {fmtIntSim(dClients)} {Math.round(dClients) > 1 ? 'clients confirmés' : 'client confirmé'} · {fmtIntSim(dVolume)} réservations</>
                }
              </p>
            </div>

            <div>
              <span className="res-eyebrow">Bénéfice estimé</span>
              <div className="res-num benefice-num"><em>{fmtEURsim(dBenefice)}</em></div>
              <span className="res-unit">dépense publicitaire déduite</span>
            </div>

            <div className="sim-breakdown">
              <div className="sim-row">
                <span className="k">Chiffre d'affaires généré</span>
                <span className="v">{fmtEURsim(dRevenue)}</span>
              </div>
              <div className="sim-row">
                <span className="k">
                  {mode === 'leads' ? 'Leads qualifiés' : 'Réservations gratuites'}
                </span>
                <span className="v">{fmtIntSim(dVolume)}</span>
              </div>
              <div className="sim-row">
                <span className="k">
                  {mode === 'leads'
                    ? <>Prestations signées <em className="k-sub">à {conv}&nbsp;% de conversion</em></>
                    : <>Clients confirmés <em className="k-sub">{TAUX_ANNULATION}&nbsp;% annulations déduites</em></>
                  }
                </span>
                <span className="v">{fmtIntSim(dClients)}</span>
              </div>
              <div className="sim-row">
                <span className="k">Dépense publicitaire</span>
                <span className="v">− {fmtEURsim(pub)}</span>
              </div>
              <div className="sim-row">
                <span className="k">Bénéfice net</span>
                <span className="v"><em>{fmtEURsim(dBenefice)}</em></span>
              </div>
              <div className="sim-row">
                <span className="k">Retour sur investissement (ROAS)</span>
                <span className="v"><em>{fmtXsim(dRoas)}</em></span>
              </div>
              <div className="sim-row sim-row-abo">
                <span className="k">+ Abonnement <em className="k-sub">hors projections</em></span>
                <span className="v">{fmtEURsim(dAbo)}</span>
              </div>
            </div>

            <div className="sim-cta-wrap">
              <a className="btn btn-gold" href="#rappel" onClick={go('rappel')}>
                Je veux gagner ces clients <span className="arrow">→</span>
              </a>
              <p className="sim-cta-sub">Estimation indicative · Sans engagement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Simulateur = Simulateur;
