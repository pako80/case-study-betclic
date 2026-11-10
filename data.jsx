// data.jsx — sample live events for the prototype

const SPORTS = {
  football: { label: 'Football', icon: 'football', color: '#d71920' },
  tennis:   { label: 'Tennis',   icon: 'tennis',   color: '#00dd70' },
  basketball:{label: 'Basketball', icon: 'basketball', color: '#fad749' },
  volleyball:{label: 'Volleyball', icon: 'volleyball', color: '#218afb' },
};

// Each league has a country code (used for flag color in accordion header)
const LEAGUES = {
  'Brasileirão Série A': { country: 'br' },
  'Brasileirão Série B': { country: 'br' },
  'Premier League':      { country: 'uk' },
  'La Liga':             { country: 'es' },
  'Serie A':             { country: 'it' },
  'Ligue 1':             { country: 'fr' },
  'Eredivisie':          { country: 'nl' },
  'Primeira Liga':       { country: 'pt' },
  'Bundesliga':          { country: 'de' },
  'Süper Lig':           { country: 'tr' },
  'J1 League':           { country: 'jp' },
  'US Open':             { country: 'us' },
  'ATP Masters':         { country: 'fr' },
  'WTA Tour':            { country: 'us' },
  'Roland-Garros':       { country: 'fr' },
  'ATP Challenger':      { country: 'intl' },
  'WTA 125':             { country: 'intl' },
  'Davis Cup':           { country: 'intl' },
  'NBA':                 { country: 'us' },
  'NBB':                 { country: 'br' },
  'EuroLeague':          { country: 'intl' },  'Liga ACB':            { country: 'es' },
  'BBL':                 { country: 'uk' },
  'Superliga':           { country: 'br' },
  'CEV Champions League':{ country: 'it' },
};

const FLAGS = {
  br: { bg: '#009b3a', stripe: '#fedd00' },
  us: { bg: '#bf0a30', stripe: '#ffffff' },
  es: { bg: '#aa151b', stripe: '#f1bf00' },
  it: { bg: '#008c45', stripe: '#cd212a' },
  ar: { bg: '#74acdf', stripe: '#ffffff' },
  cl: { bg: '#0039a6', stripe: '#d52b1e' },
  co: { bg: '#fcd116', stripe: '#003893' },
  fr: { bg: '#0055a4', stripe: '#ef4135' },
  uk: { bg: '#012169', stripe: '#c8102e' },
  nl: { bg: '#ae1c28', stripe: '#21468b' },
  pt: { bg: '#006600', stripe: '#ff0000' },
  de: { bg: '#000000', stripe: '#dd0000' },
  tr: { bg: '#e30a17', stripe: '#ffffff' },
  jp: { bg: '#ffffff', stripe: '#bc002d' },
  intl: { bg: '#1e1e1e', stripe: '#828282' },
};

const INITIAL_EVENTS = [
  // ── FOOTBALL ───────────────────────────────────────────────
  // Ligue 1 (3 events)
  {
    id: 'fl1', sport: 'football', league: 'Ligue 1', flag: 'fr',
    live: { minute: "58'" },
    home: { name: 'PSG', score: 2 },
    away: { name: 'Marseille', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.45' }, { label: 'X', price: '4.60' }, { label: '2', price: '6.50' }],
  },
  {
    id: 'fl2', sport: 'football', league: 'Ligue 1', flag: 'fr',
    live: { minute: "34'" },
    home: { name: 'Lyon', score: 0 },
    away: { name: 'Monaco', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '3.20' }, { label: 'X', price: '3.40' }, { label: '2', price: '2.15' }],
  },
  {
    id: 'fl3', sport: 'football', league: 'Ligue 1', flag: 'fr',
    live: { minute: "76'" },
    home: { name: 'Lille', score: 1 },
    away: { name: 'Nice', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.60' }, { label: 'X', price: '2.95' }, { label: '2', price: '2.90' }],
  },

  // Brasileirão Série A (4 events)
  {
    id: 'f1', sport: 'football', league: 'Brasileirão Série A', flag: 'br', az: true,
    live: { minute: "67'" }, hot: true, decisive: true,
    fomoMessage: 'FLAMENGO FIGHTING HARD FOR THE WIN!',
    home: { name: 'Flamengo',  score: 1 },
    away: { name: 'Palmeiras', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.85', trend: 'up' }, { label: 'X', price: '3.40' }, { label: '2', price: '4.20', trend: 'down' }],
    fomo: 'Trending',
  },
  {
    id: 'f1b', sport: 'football', league: 'Brasileirão Série A', flag: 'br', az: true,
    live: { minute: "90+'" }, hot: true,
    penalties: { home: 3, away: 2 },
    home: { name: 'Fluminense', score: 1 },
    away: { name: 'Bahia',      score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.89' }, { label: 'X', price: '3.22' }, { label: '2', price: '2.32', trend:'up' }],
    fomo: 'Hot',
  },
  {
    id: 'f1c', sport: 'football', league: 'Brasileirão Série A', flag: 'br', az: true,
    live: { minute: "23'" },
    home: { name: 'Atlético Mineiro', score: 0 },
    away: { name: 'Corinthians',      score: 0 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.10' }, { label: 'X', price: '3.05' }, { label: '2', price: '3.60' }],
  },
  {
    id: 'f1d', sport: 'football', league: 'Brasileirão Série A', flag: 'br', az: true,
    live: { minute: "55'" },
    home: { name: 'Cruzeiro',  score: 1 },
    away: { name: 'Vasco',     score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.95' }, { label: 'X', price: '3.20' }, { label: '2', price: '3.80' }],
  },

  // Premier League (3 events)
  {
    id: 'f2', sport: 'football', league: 'Premier League', flag: 'uk',
    live: { minute: "32'" }, hot: true,
    home: { name: 'Man City', score: 0 },
    away: { name: 'Arsenal',  score: 0 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.95' }, { label: 'X', price: '3.50' }, { label: '2', price: '3.80' }],
    fomo: 'Hot',
  },
  {
    id: 'f2b', sport: 'football', league: 'Premier League', flag: 'uk',
    live: { minute: "71'" },
    home: { name: 'Liverpool', score: 2 },
    away: { name: 'Chelsea',   score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.45' }, { label: 'X', price: '4.50' }, { label: '2', price: '6.20' }],
  },
  {
    id: 'f2c', sport: 'football', league: 'Premier League', flag: 'uk',
    live: { minute: "12'" },
    home: { name: 'Tottenham', score: 0 },
    away: { name: 'Newcastle', score: 0 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.05' }, { label: 'X', price: '3.30' }, { label: '2', price: '3.70' }],
  },

  // La Liga (2 events)
  {
    id: 'f3', sport: 'football', league: 'La Liga', flag: 'es',
    live: { minute: "78'" }, hot: true,
    home: { name: 'Real Madrid', score: 3 },
    away: { name: 'Barcelona',   score: 2 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.32' }, { label: 'X', price: '6.50' }, { label: '2', price: '9.00' }],
  },
  {
    id: 'f3b', sport: 'football', league: 'La Liga', flag: 'es',
    live: { minute: "45'" },
    home: { name: 'Atlético Madrid', score: 1 },
    away: { name: 'Sevilla',         score: 0 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.55' }, { label: 'X', price: '3.80' }, { label: '2', price: '5.50' }],
  },

  // Serie A (2 events)
  {
    id: 'f4', sport: 'football', league: 'Serie A', flag: 'it',
    live: { minute: "HT" },
    home: { name: 'Inter',    score: 1 },
    away: { name: 'Juventus', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.10' }, { label: 'X', price: '2.95' }, { label: '2', price: '3.60' }],
  },
  {
    id: 'f4b', sport: 'football', league: 'Serie A', flag: 'it',
    live: { minute: "62'" },
    home: { name: 'Milan',    score: 2 },
    away: { name: 'Napoli',   score: 2 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.45' }, { label: 'X', price: '3.10' }, { label: '2', price: '2.85' }],
  },

  // Bundesliga (2)
  {
    id: 'f7', sport: 'football', league: 'Bundesliga', flag: 'de',
    live: { minute: "71'" },
    home: { name: 'Bayern Munich', score: 2 },
    away: { name: 'Dortmund', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.55' }, { label: 'X', price: '4.20' }, { label: '2', price: '5.40' }],
  },
  {
    id: 'f7b', sport: 'football', league: 'Bundesliga', flag: 'de',
    live: { minute: "28'" },
    home: { name: 'Leverkusen', score: 0 },
    away: { name: 'RB Leipzig', score: 0 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.10' }, { label: 'X', price: '3.50' }, { label: '2', price: '3.30' }],
  },

  // ── TENNIS ─────────────────────────────────────────────────
  // US Open (2)
  {
    id: 't1', sport: 'tennis', league: 'US Open', flag: 'us',
    live: { minute: 'SET 3 GAME 5' }, hot: true,
    home: { name: 'Casper Ruud', sets: [6, 4, 5] },
    away: { name: 'Tommy Paul',  sets: [3, 6, 4] },
    market: 'Match Winner',
    odds: [{ label: 'Casper Ruud', price: '1.89', trend: 'up' }, { label: 'Tommy Paul', price: '2.05' }],
    twoWay: true,
    fomo: 'Trending',
  },
  {
    id: 't1b', sport: 'tennis', league: 'US Open', flag: 'us',
    live: { minute: 'SET 2 GAME 4' },
    home: { name: 'Coco Gauff',     sets: [6, 3] },
    away: { name: 'Jessica Pegula', sets: [4, 4] },
    market: 'Match Winner',
    odds: [{ label: 'Coco Gauff', price: '1.55' }, { label: 'Jessica Pegula', price: '2.40' }],
    twoWay: true,
  },

  // ATP Masters (1)
  {
    id: 't2', sport: 'tennis', league: 'ATP Masters', flag: 'fr',
    live: { minute: 'SET 2 GAME 8' }, hot: true,
    home: { name: 'Djokovic', sets: [7, 5] },
    away: { name: 'Alcaraz',  sets: [5, 6] },
    market: 'Match Winner',
    odds: [{ label: 'Djokovic', price: '1.65' }, { label: 'Alcaraz', price: '2.30' }],
    twoWay: true,
  },

  // WTA Tour (1)
  {
    id: 't3', sport: 'tennis', league: 'WTA Tour', flag: 'us',
    live: { minute: 'SET 1 GAME 4' },
    home: { name: 'Swiatek',   sets: [3] },
    away: { name: 'Sabalenka', sets: [2] },
    market: 'Match Winner',
    odds: [{ label: 'Swiatek', price: '1.48' }, { label: 'Sabalenka', price: '2.75', trend: 'down' }],
    twoWay: true,
  },

  // ── BASKETBALL ─────────────────────────────────────────────
  {
    id: 'b1', sport: 'basketball', league: 'NBA', flag: 'us',
    live: { minute: 'Q4 1:14' }, hot: true, decisive: true,
    fomoMessage: 'CELTICS ONE BUCKET AWAY FROM STEALING IT!',
    home: { name: 'LA Lakers',      score: 78 },
    away: { name: 'Boston Celtics', score: 82 },
    market: 'Match Winner',
    odds: [{ label: 'Lakers', price: '2.40' }, { label: 'Celtics', price: '1.55' }],
    twoWay: true,
    fomo: 'Hot',
  },
  {
    id: 'b1b', sport: 'basketball', league: 'NBA', flag: 'us',
    live: { minute: 'Q2 1:45' },
    home: { name: 'Golden State', score: 52 },
    away: { name: 'Phoenix Suns', score: 49 },
    market: 'Match Winner',
    odds: [{ label: 'Warriors', price: '1.85' }, { label: 'Suns', price: '1.95' }],
    twoWay: true,
  },
  {
    id: 'b2', sport: 'basketball', league: 'NBB', flag: 'br',
    live: { minute: 'Q2 6:18' },
    home: { name: 'Flamengo Basquete', score: 41 },
    away: { name: 'Minas',             score: 38 },
    market: 'Match Winner',
    odds: [{ label: 'Flamengo', price: '1.62' }, { label: 'Minas', price: '2.20' }],
    twoWay: true,
  },

  // ── VOLLEYBALL ─────────────────────────────────────────────
  {
    id: 'v1', sport: 'volleyball', league: 'Superliga', flag: 'br',
    live: { minute: 'SET 2' },
    home: { name: 'Sada Cruzeiro', sets: [25, 18] },
    away: { name: 'Minas Tênis',   sets: [22, 21] },
    market: 'Match Winner',
    odds: [{ label: 'Cruzeiro', price: '1.40' }, { label: 'Minas', price: '2.95' }],
    twoWay: true,
  },
  // ── A-Z (less-popular leagues, sorted alphabetically in the UI) ────
  // Football
  { id: 'fz1', sport: 'football', league: 'Eredivisie', flag: 'nl', az: true,
    live: { minute: "54'" }, home: { name: 'Ajax', score: 1 }, away: { name: 'Feyenoord', score: 1 },
    market: 'Match Winner', odds: [{ label: '1', price: '2.20' }, { label: 'X', price: '3.10' }, { label: '2', price: '2.95' }] },
  { id: 'fz2', sport: 'football', league: 'Primeira Liga', flag: 'pt', az: true,
    live: { minute: "38'" }, home: { name: 'Benfica', score: 0 }, away: { name: 'Porto', score: 0 },
    market: 'Match Winner', odds: [{ label: '1', price: '1.95' }, { label: 'X', price: '3.20' }, { label: '2', price: '3.80' }] },
  { id: 'fz4', sport: 'football', league: 'Süper Lig', flag: 'tr', az: true,
    live: { minute: "19'" }, home: { name: 'Fenerbahçe', score: 0 }, away: { name: 'Galatasaray', score: 0 },
    market: 'Match Winner', odds: [{ label: '1', price: '2.30' }, { label: 'X', price: '3.10' }, { label: '2', price: '2.90' }] },
  { id: 'fz5', sport: 'football', league: 'J1 League', flag: 'jp', az: true,
    live: { minute: "82'" }, home: { name: 'Kashima Antlers', score: 1 }, away: { name: 'Urawa Red Diamonds', score: 0 },
    market: 'Match Winner', odds: [{ label: '1', price: '1.40' }, { label: 'X', price: '4.50' }, { label: '2', price: '7.00' }] },

  // Tennis
  { id: 'tz1', sport: 'tennis', league: 'ATP Challenger', flag: 'intl', az: true,
    live: { minute: 'SET 2 GAME 3' }, twoWay: true,
    home: { name: 'Arnaldi', sets: [4, 1] }, away: { name: 'Zhang', sets: [6, 2] },
    market: 'Match Winner', odds: [{ label: 'Arnaldi', price: '3.10' }, { label: 'Zhang', price: '1.36' }] },
  { id: 'tz2', sport: 'tennis', league: 'WTA 125', flag: 'intl', az: true,
    live: { minute: 'SET 1 GAME 7' }, twoWay: true,
    home: { name: 'Bouzkova', sets: [4] }, away: { name: 'Cocciaretto', sets: [3] },
    market: 'Match Winner', odds: [{ label: 'Bouzkova', price: '1.72' }, { label: 'Cocciaretto', price: '2.10' }] },
  { id: 'tz3', sport: 'tennis', league: 'Davis Cup', flag: 'intl', az: true,
    live: { minute: 'SET 3 GAME 2' }, twoWay: true,
    home: { name: 'Norrie', sets: [4, 6, 1] }, away: { name: 'Cerundolo', sets: [6, 3, 1] },
    market: 'Match Winner', odds: [{ label: 'Norrie', price: '2.45' }, { label: 'Cerundolo', price: '1.55' }] },

  // Basketball
  { id: 'bz1', sport: 'basketball', league: 'EuroLeague', flag: 'intl', az: true,
    live: { minute: 'Q3 5:12' }, twoWay: true,
    home: { name: 'Real Madrid', score: 68 }, away: { name: 'Olympiacos', score: 64 },
    market: 'Match Winner', odds: [{ label: 'Real Madrid', price: '1.70' }, { label: 'Olympiacos', price: '2.10' }] },
  { id: 'bz2', sport: 'basketball', league: 'Liga ACB', flag: 'es', az: true,
    live: { minute: 'Q2 2:48' }, twoWay: true,
    home: { name: 'Baskonia', score: 45 }, away: { name: 'Valencia', score: 47 },
    market: 'Match Winner', odds: [{ label: 'Baskonia', price: '1.95' }, { label: 'Valencia', price: '1.85' }] },
  { id: 'bz3', sport: 'basketball', league: 'BBL', flag: 'uk', az: true,
    live: { minute: 'Q4 3:05' }, twoWay: true,
    home: { name: 'London Lions', score: 78 }, away: { name: 'Manchester Giants', score: 71 },
    market: 'Match Winner', odds: [{ label: 'London Lions', price: '1.45' }, { label: 'Manchester Giants', price: '2.70' }] },
];

window.SPORTS = SPORTS;
window.LEAGUES = LEAGUES;
window.FLAGS = FLAGS;
window.INITIAL_EVENTS = INITIAL_EVENTS;

// Roland Garros showcase — used by the "Roland Garros" variation of the Hot tab.
// High-profile QF / SF matchups; flagged rg:true so we can filter them in.
window.ROLAND_GARROS_EVENTS = [
  { id: 'rg-1', sport: 'tennis', league: 'Roland-Garros', flag: 'fr', rg: true, hot: true,
    live: { minute: 'SET 4 GAME 7' }, twoWay: true,
    home: { name: 'Sinner',   sets: [6, 4, 6, 4] },
    away: { name: 'Alcaraz',  sets: [3, 6, 4, 5] },
    market: 'Match Winner',
    odds: [{ label: 'Sinner', price: '1.45', trend:'down' }, { label: 'Alcaraz', price: '2.80' }],
    fomo: 'Sizzling' },
  { id: 'rg-2', sport: 'tennis', league: 'Roland-Garros', flag: 'fr', rg: true, hot: true,
    live: { minute: 'SET 3 GAME 4' }, twoWay: true,
    home: { name: 'Djokovic', sets: [4, 6, 3] },
    away: { name: 'Zverev',   sets: [6, 3, 5] },
    market: 'Match Winner',
    odds: [{ label: 'Djokovic', price: '2.20', trend:'up' }, { label: 'Zverev', price: '1.70' }],
    fomo: 'Hot' },
  { id: 'rg-3', sport: 'tennis', league: 'Roland-Garros', flag: 'fr', rg: true, hot: true,
    live: { minute: 'SET 2 GAME 9' }, twoWay: true,
    home: { name: 'Swiatek',  sets: [6, 5] },
    away: { name: 'Sabalenka',sets: [3, 4] },
    market: 'Match Winner',
    odds: [{ label: 'Swiatek', price: '1.32' }, { label: 'Sabalenka', price: '3.20', trend:'up' }],
    fomo: 'Sizzling' },
  { id: 'rg-4', sport: 'tennis', league: 'Roland-Garros', flag: 'fr', rg: true, hot: true,
    live: { minute: 'SET 1 GAME 8' }, twoWay: true,
    home: { name: 'Gauff',    sets: [5] },
    away: { name: 'Rybakina', sets: [4] },
    market: 'Match Winner',
    odds: [{ label: 'Gauff', price: '1.95' }, { label: 'Rybakina', price: '1.85', trend:'down' }],
    fomo: 'Hot' },
  { id: 'rg-5', sport: 'tennis', league: 'Roland-Garros', flag: 'fr', rg: true, hot: true,
    live: { minute: 'SET 3 GAME 2' }, twoWay: true,
    home: { name: 'Medvedev', sets: [6, 4, 1] },
    away: { name: 'Ruud',     sets: [4, 6, 1] },
    market: 'Match Winner',
    odds: [{ label: 'Medvedev', price: '1.85' }, { label: 'Ruud', price: '1.95' }],
    fomo: 'Trending' },
  { id: 'rgf-1', sport: 'football', league: 'Indian Super League', flag: 'intl', rg: true, hot: true,
    live: { minute: "38'" },
    home: { name: 'Mumbai City', score: 1 }, away: { name: 'Kerala Blasters', score: 0 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '1.62' }, { label: 'X', price: '3.80' }, { label: '2', price: '5.10' }] },
  { id: 'rgf-2', sport: 'football', league: 'J1 League', flag: 'jp', rg: true, hot: true,
    live: { minute: "63'" },
    home: { name: 'Vissel Kobe', score: 2 }, away: { name: 'Yokohama F. Marinos', score: 2 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.45' }, { label: 'X', price: '3.30' }, { label: '2', price: '2.70' }] },
  { id: 'rgf-3', sport: 'football', league: 'K League 1', flag: 'intl', rg: true, hot: true,
    live: { minute: "77'" },
    home: { name: 'Jeonbuk', score: 0 }, away: { name: 'Ulsan HD', score: 1 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '3.40' }, { label: 'X', price: '3.10' }, { label: '2', price: '2.15' }] },
];

// ─── Hottest Now demo pool ─────────────────────────────────
// Each entry is a fully-formed event we can drop into the Hottest Now slot.
// They span football / tennis / basketball; messages reference the live state.
window.HOTTEST_POOL = [
  // FOOTBALL — late draw, fight for the winner
  {
    id: 'hn-fb-1', sport: 'football', league: 'Brasileirão Série A', flag: 'br',
    live: { minute: "87'" }, hot: true, decisive: true,
    fomoMessage: 'FLAMENGO PUSHING FOR THE WINNER!',
    home: { name: 'Flamengo',  score: 1 },
    away: { name: 'Palmeiras', score: 1 },
    market: 'Next Goal',
    odds: [
      { label: 'Flamengo', price: '2.10', trend: 'down' },
      { label: 'No Goal',  price: '2.30' },
      { label: 'Palmeiras',price: '3.40' },
    ],
    fomo: 'Sizzling',
  },
  // FOOTBALL — penalty shootout-style stakes
  {
    id: 'hn-fb-2', sport: 'football', league: 'La Liga', flag: 'es',
    live: { minute: "78'" }, hot: true, decisive: true,
    fomoMessage: 'EL CLÁSICO ON A KNIFE EDGE — 78\u2032 AND COUNTING!',
    home: { name: 'Real Madrid', score: 2 },
    away: { name: 'Barcelona',   score: 2 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '2.90' }, { label: 'X', price: '2.60' }, { label: '2', price: '2.85', trend:'up' }],
    fomo: 'Sizzling',
  },
  // FOOTBALL — underdog leading late
  {
    id: 'hn-fb-3', sport: 'football', league: 'Premier League', flag: 'uk',
    live: { minute: "82'" }, hot: true, decisive: true,
    fomoMessage: 'ARSENAL ONE GOAL FROM A TITLE SHOCK!',
    home: { name: 'Man City', score: 1 },
    away: { name: 'Arsenal',  score: 2 },
    market: 'Match Winner',
    odds: [{ label: '1', price: '5.40' }, { label: 'X', price: '4.10' }, { label: '2', price: '1.55', trend:'down' }],
    fomo: 'Trending',
  },

  // TENNIS — decider in progress
  {
    id: 'hn-tn-1', sport: 'tennis', league: 'ATP Masters', flag: 'fr',
    live: { minute: 'SET 3 GAME 9' }, hot: true, decisive: true,
    fomoMessage: 'DJOKOVIC SERVING FOR THE MATCH!',
    home: { name: 'Djokovic', sets: [7, 5, 5] },
    away: { name: 'Alcaraz',  sets: [5, 7, 4] },
    market: 'Match Winner',
    odds: [{ label: 'Djokovic', price: '1.32', trend: 'down' }, { label: 'Alcaraz', price: '3.20' }],
    twoWay: true,
    fomo: 'Sizzling',
  },
  // TENNIS — break-point heroics
  {
    id: 'hn-tn-2', sport: 'tennis', league: 'US Open', flag: 'us',
    live: { minute: 'SET 4 GAME 11' }, hot: true, decisive: true,
    fomoMessage: 'RUUD ONE GAME FROM THE QUARTER-FINAL!',
    home: { name: 'Casper Ruud', sets: [6, 4, 6, 5] },
    away: { name: 'Tommy Paul',  sets: [3, 6, 4, 4] },
    market: 'Match Winner',
    odds: [{ label: 'Ruud', price: '1.22' }, { label: 'Paul', price: '4.40', trend: 'up' }],
    twoWay: true,
    fomo: 'Hot',
  },

  // BASKETBALL — clutch crunch time
  {
    id: 'hn-bb-1', sport: 'basketball', league: 'NBA', flag: 'us',
    live: { minute: 'Q4 0:42' }, hot: true, decisive: true,
    fomoMessage: 'CELTICS ONE BUCKET AWAY FROM STEALING IT!',
    home: { name: 'LA Lakers',      score: 102 },
    away: { name: 'Boston Celtics', score: 100 },
    market: 'Match Winner',
    odds: [{ label: 'Lakers', price: '1.65', trend: 'down' }, { label: 'Celtics', price: '2.30' }],
    twoWay: true,
    fomo: 'Sizzling',
  },
  // BASKETBALL — overtime drama
  {
    id: 'hn-bb-2', sport: 'basketball', league: 'NBA', flag: 'us',
    live: { minute: 'OT 1:08' }, hot: true, decisive: true,
    fomoMessage: 'OVERTIME — WARRIORS TRAILING BY TWO!',
    home: { name: 'Golden State', score: 117 },
    away: { name: 'Phoenix Suns', score: 119 },
    market: 'Match Winner',
    odds: [{ label: 'Warriors', price: '2.60', trend:'up' }, { label: 'Suns', price: '1.48' }],
    twoWay: true,
    fomo: 'Sizzling',
  },
  // BASKETBALL — Brazilian league hot moment
  {
    id: 'hn-bb-3', sport: 'basketball', league: 'NBB', flag: 'br',
    live: { minute: 'Q4 2:14' }, hot: true, decisive: true,
    fomoMessage: 'FLAMENGO HUNTING A LATE COMEBACK!',
    home: { name: 'Flamengo Basquete', score: 71 },
    away: { name: 'Minas',             score: 76 },
    market: 'Match Winner',
    odds: [{ label: 'Flamengo', price: '2.40', trend:'up' }, { label: 'Minas', price: '1.55' }],
    twoWay: true,
    fomo: 'Trending',
  },
];
