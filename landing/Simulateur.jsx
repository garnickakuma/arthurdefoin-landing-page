// Simulateur.jsx — ROI simulator (centerpiece)
const { useState: useStateSim, useMemo: useMemoSim, useEffect: useEffectSim, useRef: useRefSim } = React;

// ---- Hypothèses (fournies par Arthur) ------------------------------------
const CPL = 12; // coût moyen par lead qualifié (€)
const CPR = 20; // coût moyen par réservation gratuite (€)
const TAUX_ANNULATION = 25; // % de réservations gratuites annulées / no-show
const PANIER_SEUIL = 250; // au-delà : alerte en mode réservations
const BUDGET_MIN = 400;
const BUDGET_MAX = 4000;
const BUDGET_DEFAUT = 800;

// Prestation mise en avant → fixe le taux de conversion lead → client (mode Leads)
// ET pré-remplit un panier moyen réaliste.
// Mariage : closing plus long et plus sélectif → 10 %. Autres séances → 30 %.
const SIM_SPECIALITES = ['Mariage', 'Grossesse', 'Nouveau-né', 'Famille', 'Portrait', 'Corporate'];
const CONV_MARIAGE = 10;
const CONV_AUTRE = 30;
const convForSpec = (s) => s === 'Mariage' ? CONV_MARIAGE : CONV_AUTRE;
const PANIER_PAR_SPEC = { Mariage: 1500 };
const PANIER_AUTRE = 150;
const panierForSpec = (s) => PANIER_PAR_SPEC[s] ?? PANIER_AUTRE;

// Répartition budget total → abonnement (lancement, gestion, optimisation) + dépense pub Meta.
//   • 400 → 1000 € : l'abonnement va de 190 à 490 € (≈ moitié du budget).
//   • au-delà de 1000 € : abonnement = 490 € + 10 % de ce qui est ajouté ; tout le reste part en pub.
function repartitionBudget(B) {
  let abonnement, pub;
  if (B <= 1000) {
    abonnement = 0.5 * B - 10;
    pub = 0.5 * B + 10;
  } else {
    abonnement = 490 + 0.10 * (B - 1000);
    pub = B - abonnement;
  }
  return { abonnement, pub };
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

function fmtEURsim(n) {return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' €';}
function fmtXsim(n) {return '× ' + new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);}
function fmtIntSim(n) {return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n));}

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
    </div>);

}

function Simulateur() {
  const [spec, setSpec] = useStateSim('Mariage'); // prestation mise en avant
  const [mode, setMode] = useStateSim('leads'); // 'leads' | 'reservations'
  const [cart, setCart] = useStateSim(panierForSpec('Mariage'));
  const [budget, setBudget] = useStateSim(BUDGET_DEFAUT);

  const conv = convForSpec(spec);
  const pickSpec = (s) => {setSpec(s);setCart(panierForSpec(s));};

  const cpx = mode === 'leads' ? CPL : CPR;
  const showWarn = mode === 'reservations' && cart > PANIER_SEUIL;
  const aboPct = budget > 0 ? Math.round(repartitionBudget(budget).abonnement / budget * 100) : 0;

  const result = useMemoSim(() => {
    const { abonnement, pub } = repartitionBudget(budget);
    let volume, clients;
    if (mode === 'leads') {
      volume = pub / CPL; // leads qualifiés
      clients = volume * (conv / 100); // → prestations signées
    } else {
      volume = pub / CPR; // réservations gratuites
      clients = volume * (1 - TAUX_ANNULATION / 100); // − annulations
    }
    const revenue = clients * cart;
    const benefice = revenue - budget; // budget TOTAL déduit
    const roas = budget > 0 ? revenue / budget : 0;
    return { abonnement, pub, volume, clients, revenue, benefice, roas };
  }, [mode, cart, conv, budget]);
  const dVolume = useCounterSim(result.volume);
  const dClients = useCounterSim(result.clients);
  const dRevenue = useCounterSim(result.revenue);
  const dBenefice = useCounterSim(result.benefice);
  const dRoas = useCounterSim(result.roas);
  const dAbo = useCounterSim(result.abonnement);
  const dPub = useCounterSim(result.pub);

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
                <span className="sim-field-lbl">Budget mensuel total</span>
                <span className="sim-field-val"><em>{fmtIntSim(budget)}</em>&nbsp;€</span>
              </div>
              <SimSlider value={budget} min={BUDGET_MIN} max={BUDGET_MAX} step={50} onChange={setBudget}
              ticks={['400 €', '2 200 €', '4 000 €']} />

              <div className="sim-split2">
                <div className="ss2-cell">
                  <span className="ss2-lbl">Abonnement</span>
                  <span className="ss2-val">{fmtEURsim(dAbo)}</span>
                  <span className="ss2-sub">lancement, gestion &amp; optimisation</span>
                </div>
                <div className="ss2-cell accent">
                  <span className="ss2-lbl">Dépense publicitaire</span>
                  <span className="ss2-val">{fmtEURsim(dPub)}</span>
                  <span className="ss2-sub">investie directement sur Meta</span>
                </div>
              </div>

              <div className="sim-repart">
                <div className="sim-repart-track">
                  <div className="sr-seg sr-abo" style={{ width: aboPct + '%' }}>
                    <span className="sr-pct">{aboPct}&nbsp;%</span>
                  </div>
                  <div className="sr-seg sr-pub" style={{ width: 100 - aboPct + '%' }}>
                    <span className="sr-pct">{100 - aboPct}&nbsp;%</span>
                  </div>
                </div>
                <div className="sim-repart-legend">
                  <span><i className="sr-dot abo"></i>Abonnement</span>
                  <span><i className="sr-dot pub"></i>Dépense publicitaire</span>
                </div>
              </div>

              <p className="sim-hint" style={{ marginTop: 14 }}>
                Plus vous investissez en publicité, plus la part de l'abonnement
                s'allège — et plus chaque euro travaille pour vous.
              </p>
            </div>
          </div>

          <div className="sim-result">
            <div>
              <span className="res-eyebrow">Projection sur un mois</span>
              <div className="res-volume" style={{ marginTop: 14 }}>
                <span className="rv-num">{fmtIntSim(mode === 'leads' ? dVolume : dClients)}</span>
                <span className="rv-lbl">
                  {mode === 'leads' ? 'leads qualifiés' : Math.round(dClients) > 1 ? 'nouveaux clients' : 'nouveau client'}
                </span>
              </div>
              {mode === 'leads' ?
              <p className="res-sub" style={{ marginTop: 8 }}>
                soit ≈ {fmtIntSim(dClients)} {Math.round(dClients) > 1 ? 'prestations signées' : 'prestation signée'} à {fmtIntSim(conv)}&nbsp;% de conversion.
              </p> :
              <p className="res-sub" style={{ marginTop: 8 }}>
                soit ≈ {fmtIntSim(dVolume)} réservations, dont {TAUX_ANNULATION}&nbsp;% d'annulation déduites.
              </p>
              }
            </div>

            <div>
              <span className="res-eyebrow">Bénéfice estimé</span>
              <div className="res-num benefice-num"><em>{fmtEURsim(dBenefice)}</em></div>
              <span className="res-unit">budget total déduit</span>
            </div>

            <div className="sim-breakdown">
              <div className="sim-row">
                <span className="k">Chiffre d'affaires généré</span>
                <span className="v">{fmtEURsim(dRevenue)}</span>
              </div>
              <div className="sim-row">
                <span className="k">Budget total <em className="k-sub">abonnement + pub</em></span>
                <span className="v">− {fmtEURsim(budget)}</span>
              </div>
              {mode === 'reservations' &&
              <div className="sim-row">
                <span className="k">Taux d'annulation pris en compte</span>
                <span className="v">{TAUX_ANNULATION}&nbsp;%</span>
              </div>
              }
              <div className="sim-row">
                <span className="k">Bénéfice net</span>
                <span className="v"><em>{fmtEURsim(dBenefice)}</em></span>
              </div>
              <div className="sim-row">
                <span className="k">Retour sur investissement (ROAS)</span>
                <span className="v"><em>{fmtXsim(dRoas)}</em></span>
              </div>
            </div>

            <div className="sim-cta-wrap">
              <a className="btn btn-gold" href="#rappel" onClick={go('rappel')}>
                Je veux gagner ces clients <span className="arrow">→</span>
              </a>
              <p className="sim-cta-sub">Estimation indicative · Sans engagement

              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Simulateur = Simulateur;