// Barbara Style — propositions « pastille » & « timbre »
// Marques vectorielles, déclinaisons à comparer sur le canevas.

const GOLD = '#cda152', GOLD_D = '#b98a3a', GOLD_L = '#e3c988';
const AZUR = '#6f9a9a', INK = '#2a2018', CREAM = '#f1e7d4', PAPER = '#ffffff', LINEN = '#fbf7f0';
const SERIF = "'Cormorant Garamond', serif";
const SANS = "'Jost', sans-serif";
const CARD_GRAD = 'radial-gradient(120% 95% at 68% 18%, #ffe9c2, #e9c7a0 46%, #cf9d83 100%)';

/* ════════════════ CONTEXTES ════════════════ */

// Mini carte produit pour poser la pastille
function MiniCard({ children, ribbon }) {
  return (
    <div style={{ width: 208, fontFamily: SANS }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 8, overflow: 'hidden', background: CARD_GRAD, boxShadow: '0 10px 26px -16px rgba(120,80,40,.5)' }}>
        <div style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.4"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z"/></svg>
        </div>
        {ribbon ? children : <div style={{ position: 'absolute', top: 12, left: 12 }}>{children}</div>}
      </div>
      <div style={{ paddingTop: 12 }}>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD_D }}>Boucles d'oreilles</div>
        <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 500, color: INK, margin: '4px 0 6px' }}>Créoles Soleil</div>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, color: INK }}>24<sup style={{ fontSize: '.52em', verticalAlign: '.62em' }}>90</sup><span style={{ fontSize: 14, marginLeft: 3 }}>€</span></div>
      </div>
    </div>
  );
}

// Panneau papier crème pour poser le timbre (coin de carte postale)
function PaperPanel({ children, w = 264, h = 196 }) {
  return (
    <div style={{ width: w, height: h, background: CREAM, borderRadius: 6, position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px #e7d8c1' }}>
      {/* lignes d'adresse fanées */}
      <div style={{ position: 'absolute', right: 18, bottom: 22, display: 'flex', flexDirection: 'column', gap: 11, opacity: .5 }}>
        {[120, 150, 110].map((wl, i) => <div key={i} style={{ width: wl, height: 1, background: AZUR }} />)}
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}

const Cap = ({ children, sub }) => (
  <div style={{ marginTop: 14, textAlign: 'center', fontFamily: SANS }}>
    <div style={{ fontSize: 13, fontWeight: 500, color: INK }}>{children}</div>
    {sub && <div style={{ fontSize: 11.5, color: '#9b8a72', marginTop: 3, maxWidth: 220 }}>{sub}</div>}
  </div>
);

/* ════════════════ PASTILLES ════════════════ */

// 01 — Pleine or (actuelle)
const PFill = () => (
  <span style={{ display: 'inline-flex', fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 999, lineHeight: 1, background: GOLD, color: INK }}>Nouveau</span>
);

// 02 — Contour fin
const POutline = () => (
  <span style={{ display: 'inline-flex', fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 999, lineHeight: 1, background: 'rgba(255,255,255,.7)', color: GOLD_D, border: `1px solid ${GOLD}`, backdropFilter: 'blur(3px)' }}>Nouveau</span>
);

// 03 — Mot serif italique + filet (sans cadre)
const PSerif = () => (
  <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: 26, lineHeight: .9, color: GOLD_D, textShadow: '0 1px 0 rgba(255,255,255,.5)' }}>Nouveau</span>
    <span style={{ width: 40, height: 1.5, background: GOLD, marginTop: 4 }} />
  </span>
);

// 04 — Cartouche postal (double filet)
const PCartouche = () => (
  <span style={{ display: 'inline-flex', fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 2, lineHeight: 1, background: 'rgba(251,247,240,.92)', color: INK, border: `1px solid ${INK}`, boxShadow: `inset 0 0 0 2.5px ${LINEN}, inset 0 0 0 3.5px ${INK}` }}>Nouveau</span>
);

// 05 — Cachet rond (sceau soleil)
const PSeal = () => (
  <svg width="52" height="52" viewBox="0 0 52 52">
    <circle cx="26" cy="26" r="25" fill={GOLD} />
    <circle cx="26" cy="26" r="20.5" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
    {Array.from({ length: 16 }).map((_, i) => { const a = (Math.PI * 2 * i) / 16; return <line key={i} x1={26 + Math.cos(a) * 21.5} y1={26 + Math.sin(a) * 21.5} x2={26 + Math.cos(a) * 24} y2={26 + Math.sin(a) * 24} stroke="rgba(255,255,255,.55)" strokeWidth="1.1" />; })}
    <text x="26" y="23.5" textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize="13" fill={INK} fontWeight="600">New</text>
    <text x="26" y="34" textAnchor="middle" fontFamily={SANS} fontSize="5.4" letterSpacing="1.4" fill={INK} opacity=".75">SAISON</text>
  </svg>
);

// 06 — Coin ruban (bannière diagonale)
const PRibbon = () => (
  <div style={{ position: 'absolute', top: 16, left: -42, width: 160, transform: 'rotate(-45deg)', transformOrigin: 'center', background: GOLD, color: INK, textAlign: 'center', fontFamily: SANS, fontSize: 9.5, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', padding: '5px 0', boxShadow: '0 4px 10px -4px rgba(120,80,40,.6)', zIndex: 4 }}>Nouveau</div>
);

/* ════════════════ TIMBRES ════════════════ */

// Perforations : petits cercles couleur fond qui « mordent » le papier blanc
function perfHoles(w, h, bg, r = 3.3, step = 8.6) {
  const holes = [];
  const nx = Math.max(2, Math.round((w - 6) / step));
  const ny = Math.max(2, Math.round((h - 6) / step));
  for (let i = 0; i <= nx; i++) { const x = 3 + (i * (w - 6)) / nx; holes.push([x, 3]); holes.push([x, h - 3]); }
  for (let j = 1; j < ny; j++) { const y = 3 + (j * (h - 6)) / ny; holes.push([3, y]); holes.push([w - 3, y]); }
  return holes.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={r} fill={bg} />);
}

const SunMark = ({ cx, cy, r = 7, c = GOLD_D, sw = 1.1 }) => (
  <g stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round">
    <circle cx={cx} cy={cy} r={r * 0.5} />
    {Array.from({ length: 12 }).map((_, i) => { const a = (Math.PI * 2 * i) / 12; return <line key={i} x1={cx + Math.cos(a) * r * 0.72} y1={cy + Math.sin(a) * r * 0.72} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} />; })}
  </g>
);

// Vagues d'oblitération — lignes ondulées parallèles (les « barres tueuses »)
function wavePath(x0, y, len, amp = 3, seg = 11) {
  let d = `M ${x0} ${y}`, x = x0, dir = -1;
  while (x < x0 + len) { d += ` q ${seg / 2} ${amp * dir} ${seg} 0`; x += seg; dir *= -1; }
  return d;
}
const Waves = ({ x, y, count = 5, len = 138, gap = 6, amp = 3, c = AZUR, sw = 1.5, op = 0.85 }) => (
  <g stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" opacity={op}>
    {Array.from({ length: count }).map((_, i) => <path key={i} d={wavePath(x, y + (i - (count - 1) / 2) * gap, len, amp)} />)}
  </g>
);

// Cachet rond paramétrable (texte courbé + soleil ou date au centre)
function RoundStamp({ id, cx = 50, cy = 56, r = 34, c = AZUR, top = "CÔTE D'AZUR", bot = '· FRANCE ·', sw = 1.4, dashed = true, children }) {
  const tr = r - 7;
  return (
    <g>
      <defs>
        <path id={`${id}t`} d={`M${cx} ${cy} m ${-tr} 0 a ${tr} ${tr} 0 0 1 ${tr * 2} 0`} />
        <path id={`${id}b`} d={`M${cx} ${cy} m ${-tr} 0 a ${tr} ${tr} 0 0 0 ${tr * 2} 0`} />
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={sw} />
      {dashed && <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke={c} strokeWidth=".9" strokeDasharray="2 2.4" />}
      <text fill={c} fontFamily={SANS} fontSize="7.4" letterSpacing="2.2"><textPath href={`#${id}t`} startOffset="50%" textAnchor="middle">{top}</textPath></text>
      <text fill={c} fontFamily={SANS} fontSize="7.4" letterSpacing="2.2"><textPath href={`#${id}b`} startOffset="50%" textAnchor="middle">{bot}</textPath></text>
      {children}
    </g>
  );
}

// 01 — Oblitération classique : cachet + vagues qui filent à droite (azur)
function TWave1() {
  return (
    <svg width="236" height="112" viewBox="0 0 236 112" style={{ mixBlendMode: 'multiply' }}>
      <RoundStamp id="w1" cx={50} cy={56} r={34} c={AZUR}>
        <SunMark cx={50} cy={56} r={10} c={AZUR} sw={1.3} />
      </RoundStamp>
      <Waves x={88} y={56} count={5} len={140} gap={6} amp={3} c={AZUR} sw={1.5} />
    </svg>
  );
}

// 02 — Vagues traversantes : l'oblitération passe par-dessus le cachet (azur)
function TWave2() {
  return (
    <svg width="236" height="112" viewBox="0 0 236 112" style={{ mixBlendMode: 'multiply' }}>
      <RoundStamp id="w2" cx={62} cy={56} r={34} c={AZUR}>
        <SunMark cx={62} cy={56} r={10} c={AZUR} sw={1.3} />
      </RoundStamp>
      <g transform="rotate(-6 118 56)">
        <Waves x={10} y={56} count={4} len={224} gap={7.5} amp={3.2} c={AZUR} sw={1.6} op={0.8} />
      </g>
    </svg>
  );
}

// 03 — Cachet à date : date au centre entre deux filets + vagues (azur)
function TWave3() {
  const cx = 50, cy = 56;
  return (
    <svg width="236" height="112" viewBox="0 0 236 112" style={{ mixBlendMode: 'multiply' }}>
      <RoundStamp id="w3" cx={cx} cy={cy} r={34} c={AZUR} top="BARBARA · STYLE" bot="CÔTE D'AZUR">
        <line x1={cx - 19} y1={cy - 7} x2={cx + 19} y2={cy - 7} stroke={AZUR} strokeWidth=".9" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={SERIF} fontSize="13" fontWeight="600" fill={AZUR}>7 JUIN</text>
        <line x1={cx - 19} y1={cy + 9} x2={cx + 19} y2={cy + 9} stroke={AZUR} strokeWidth=".9" />
        <text x={cx} y={cy + 17.5} textAnchor="middle" fontFamily={SANS} fontSize="6.6" letterSpacing="2" fill={AZUR}>2026</text>
      </RoundStamp>
      <Waves x={88} y={56} count={5} len={140} gap={6} amp={3} c={AZUR} sw={1.5} />
    </svg>
  );
}

// 04 — Version or : la 01 en or solaire
function TWave4() {
  return (
    <svg width="236" height="112" viewBox="0 0 236 112" style={{ mixBlendMode: 'multiply' }}>
      <RoundStamp id="w4" cx={50} cy={56} r={34} c={GOLD_D}>
        <SunMark cx={50} cy={56} r={10} c={GOLD_D} sw={1.3} />
      </RoundStamp>
      <Waves x={88} y={56} count={5} len={140} gap={6} amp={3} c={GOLD_D} sw={1.5} />
    </svg>
  );
}

// 05 — Oblitération soleil : les vagues rayonnent en éventail (or)
function TWave5() {
  return (
    <svg width="236" height="120" viewBox="0 0 236 120" style={{ mixBlendMode: 'multiply' }}>
      <RoundStamp id="w5" cx={52} cy={60} r={34} c={GOLD_D}>
        <SunMark cx={52} cy={60} r={10} c={GOLD_D} sw={1.3} />
      </RoundStamp>
      <g stroke={GOLD_D} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.85}>
        {[-30, -20, -10, 0, 10, 20, 30].map((a) => (
          <path key={a} d={wavePath(88, 60, 130, 2.6)} transform={`rotate(${a} 88 60)`} />
        ))}
      </g>
    </svg>
  );
}

// 06 — Grand cachet voyagé : longues vagues larges (azur appuyé)
function TWave6() {
  const cx = 56, cy = 58;
  return (
    <svg width="248" height="116" viewBox="0 0 248 116" style={{ mixBlendMode: 'multiply' }}>
      <RoundStamp id="w6" cx={cx} cy={cy} r={40} c={AZUR} sw={1.6} top="BARBARA · STYLE" bot="CÔTE D'AZUR · FRANCE">
        <SunMark cx={cx} cy={cy - 5} r={11} c={AZUR} sw={1.3} />
        <text x={cx} y={cy + 17} textAnchor="middle" fontFamily={SANS} fontSize="6.4" letterSpacing="1.8" fill={AZUR}>7 · 06 · 26</text>
      </RoundStamp>
      <Waves x={100} y={58} count={6} len={146} gap={6.6} amp={3.4} c={AZUR} sw={1.7} />
    </svg>
  );
}

Object.assign(window, {
  MiniCard, PaperPanel, Cap,
  PFill, POutline, PSerif, PCartouche, PSeal, PRibbon,
  TWave1, TWave2, TWave3, TWave4, TWave5, TWave6,
});
