// Barbara Style — Boutique vintage : données & motifs décoratifs
// Placeholders : dégradés chauds dorés (remplaçables par les visuels fournis
// via les <image-slot> drag & drop).

const warm = (a, b, c) => ({
  background: `radial-gradient(120% 95% at 68% 18%, ${a}, ${b} 46%, ${c} 100%)`,
});

const GRADS = {
  gold:   warm('#ffe9c2', '#e9c7a0', '#cf9d83'),
  rose:   warm('#fbe3df', '#ecc6bf', '#cf9aa0'),
  sand:   warm('#fdeccf', '#e7cfa6', '#c9a37c'),
  amber:  warm('#ffe2b0', '#e3b487', '#b9836a'),
  blush:  warm('#fdeae0', '#edcab6', '#d2a088'),
  honey:  warm('#ffedc4', '#edcf94', '#caa05e'),
  azur:   warm('#dcebe6', '#bcd4cd', '#8fb0a8'),
};

const PRODUCTS = [
  { id: 'creoles-soleil',  cat: "Boucles d'oreilles", name: 'Créoles Soleil',     price: 24.9, was: 32, badge: 'Nouveau',     bv: 'gold', rating: 4.5, count: 128, grad: GRADS.gold },
  { id: 'camelia-poudre',  cat: 'Cache-boutons',      name: 'Camélia Poudré',     price: 16.9,         badge: 'Best-seller', bv: 'rose', rating: 5,   count: 64,  grad: GRADS.rose },
  { id: 'collier-riviera', cat: 'Colliers',           name: 'Collier Riviera',    price: 29.9,                                              rating: 4.5, count: 41,  grad: GRADS.sand },
  { id: 'jonc-azur',       cat: 'Bracelets',          name: "Jonc d'Azur",        price: 22.5, was: 28, badge: '−20%',        bv: 'sale', rating: 4,   count: 33,  grad: GRADS.azur },
  { id: 'puces-lumiere',   cat: "Boucles d'oreilles", name: 'Puces Lumière',      price: 18.9,                                              rating: 5,   count: 97,  grad: GRADS.honey },
  { id: 'bague-mistral',   cat: 'Bagues',             name: 'Bague Mistral',      price: 26.0,         badge: 'Nouveau',     bv: 'gold', rating: 4.5, count: 52,  grad: GRADS.blush },
  { id: 'cache-perle',     cat: 'Cache-boutons',      name: 'Cache-bouton Perle', price: 14.9,                                              rating: 4.5, count: 76,  grad: GRADS.sand },
  { id: 'medaille-ete',    cat: 'Colliers',           name: "Médaille d'Été",     price: 27.5,         badge: 'Best-seller', bv: 'rose', rating: 5,   count: 88,  grad: GRADS.gold },
];

const CATEGORIES = [
  { name: "Boucles d'oreilles", note: 'Créoles & puces', grad: GRADS.gold,  slot: 'cat-bo' },
  { name: 'Colliers',           note: 'Médailles & sautoirs', grad: GRADS.rose,  slot: 'cat-col' },
  { name: 'Bracelets',          note: 'Joncs & gourmettes', grad: GRADS.amber, slot: 'cat-br' },
  { name: 'Cache-boutons',      note: "L'astuce chic", grad: GRADS.sand,  slot: 'cat-cb' },
];

/* ───────────────── Motifs décoratifs (SVG trait fin) ───────────────── */

const Sun = ({ s = 26, c = 'var(--gold-400)', sw = 1.3 }) => (
  <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round">
    <circle cx="32" cy="32" r="10.5" />
    <line x1="32" y1="6" x2="32" y2="13.5" /><line x1="32" y1="50.5" x2="32" y2="58" />
    <line x1="6" y1="32" x2="13.5" y2="32" /><line x1="50.5" y1="32" x2="58" y2="32" />
    <line x1="13.4" y1="13.4" x2="18.7" y2="18.7" /><line x1="45.3" y1="45.3" x2="50.6" y2="50.6" />
    <line x1="50.6" y1="13.4" x2="45.3" y2="18.7" /><line x1="18.7" y1="45.3" x2="13.4" y2="50.6" />
  </svg>
);

// Soleil rayonnant 70s — demi-disque de rayons (pour les héros)
const SunBurst = ({ c = 'var(--gold-300)', op = 0.5, rays = 24 }) => (
  <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', height: '100%', opacity: op }} aria-hidden="true">
    {Array.from({ length: rays }).map((_, i) => {
      const a = (Math.PI * i) / (rays - 1);
      const x = 100 + Math.cos(Math.PI - a) * 200;
      const y = 100 - Math.sin(a) * 200;
      return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke={c} strokeWidth="2.2" />;
    })}
  </svg>
);

// Arcs concentriques (couché de soleil)
const SunArcs = ({ c = 'var(--gold-400)', op = 0.8 }) => (
  <svg viewBox="0 0 120 70" fill="none" stroke={c} strokeWidth="1.4" style={{ opacity: op }} aria-hidden="true">
    <circle cx="60" cy="64" r="14" />
    {[24, 34, 44, 54].map((r) => (
      <path key={r} d={`M ${60 - r} 64 A ${r} ${r} 0 0 1 ${60 + r} 64`} />
    ))}
  </svg>
);

// Palmier — silhouette trait fin
const Palm = ({ s = 120, c = 'var(--gold-400)', op = 0.55 }) => (
  <svg width={s} height={s * 1.4} viewBox="0 0 100 140" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" style={{ opacity: op }} aria-hidden="true">
    <path d="M50 60 C 49 90 47 116 44 138" />
    <path d="M50 60 C 30 52 14 54 4 64 C 22 56 38 58 50 62" fill={c} fillOpacity=".06" />
    <path d="M50 60 C 70 52 86 54 96 64 C 78 56 62 58 50 62" fill={c} fillOpacity=".06" />
    <path d="M50 60 C 36 44 24 30 20 14 C 34 30 44 44 50 60" fill={c} fillOpacity=".06" />
    <path d="M50 60 C 64 44 76 30 80 14 C 66 30 56 44 50 60" fill={c} fillOpacity=".06" />
    <path d="M50 60 C 48 42 50 24 56 6 C 50 26 50 44 50 60" fill={c} fillOpacity=".06" />
    <path d="M44 138 q 6 -3 12 0" />
  </svg>
);

// Vague (mer) — filet ondulé
const Wave = ({ c = 'var(--vx-azur)', op = 0.5, w = 120 }) => (
  <svg width={w} height="14" viewBox="0 0 120 14" fill="none" stroke={c} strokeWidth="1.4" style={{ opacity: op }} aria-hidden="true">
    <path d="M0 7 q 7.5 -6 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0" />
  </svg>
);

// Cachet de la poste — cachet rond « CÔTE D'AZUR · FRANCE », soleil au centre,
// avec quelques vagues d'oblitération qui filent derrière, en bas. Direction retenue.
const Postmark = ({ s = 96 }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" aria-hidden="true" style={{ mixBlendMode: 'multiply' }}>
    <defs>
      <path id="pm-top" d="M50 47 m -32 0 a 32 32 0 0 1 64 0" />
      <path id="pm-bot" d="M50 47 m -32 0 a 32 32 0 0 0 64 0" />
    </defs>
    {/* Vagues d'oblitération — courtes, derrière le cachet et débordant en bas */}
    <g fill="none" stroke="var(--vx-azur)" strokeWidth="1.3" strokeLinecap="round" opacity="0.85">
      {[80, 86, 92].map((y, i) => (
        <path key={i} d={`M26 ${y} q 6 -3.4 12 0 t 12 0 t 12 0 t 12 0`} />
      ))}
    </g>
    {/* Anneaux du cachet */}
    <circle cx="50" cy="47" r="37" fill="none" stroke="var(--vx-azur)" strokeWidth="1.4" />
    <circle cx="50" cy="47" r="30" fill="none" stroke="var(--vx-azur)" strokeWidth="1" strokeDasharray="2 2.4" />
    <text fill="var(--vx-azur)" fontFamily="var(--font-sans)" fontSize="7.4" letterSpacing="2.4">
      <textPath href="#pm-top" startOffset="50%" textAnchor="middle">CÔTE D'AZUR</textPath>
    </text>
    <text fill="var(--vx-azur)" fontFamily="var(--font-sans)" fontSize="7.4" letterSpacing="2.4">
      <textPath href="#pm-bot" startOffset="50%" textAnchor="middle">· FRANCE ·</textPath>
    </text>
    {/* Soleil au centre */}
    <g stroke="var(--vx-azur)" strokeWidth="1.2" fill="none" strokeLinecap="round" transform="translate(50 47)">
      <circle r="5.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (Math.PI * 2 * i) / 12;
        return <line key={i} x1={Math.cos(a) * 8.5} y1={Math.sin(a) * 8.5} x2={Math.cos(a) * 12} y2={Math.sin(a) * 12} />;
      })}
    </g>
  </svg>
);

// Icônes Lucide (trait fin)
const Icon = {
  search: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>),
  user:   (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></svg>),
  heart:  (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 10.8 3.5 12.5 5 14l7 7 7-7Z"/></svg>),
  bag:    (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>),
  close:  (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>),
  menu:   (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>),
  arrow:  (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  truck:  (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>),
  gem:    (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}><path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3 7 9l5 12 5-12-2-6"/></svg>),
  leaf:   (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}><path d="M4 20c0-9 7-15 16-15 0 9-6 16-16 15z"/><path d="M9 15c2-2 5-3 8-3"/></svg>),
};

Object.assign(window, { GRADS, PRODUCTS, CATEGORIES, warm, Sun, SunBurst, SunArcs, Palm, Wave, Postmark, Icon });
