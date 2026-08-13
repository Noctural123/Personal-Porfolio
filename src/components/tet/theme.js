// Shared design tokens for the Tết theme. New components style inline (same
// convention as TetHero) and pull every color/font from here.

export const PALETTE = {
  linen: '#E8DCC4',        // drawer paper
  paperBg: '#C9B896',      // hero linen base
  ink: '#2E2416',
  inkSoft: '#33291D',
  brown: '#4A3A2C',
  engraved: '#6b5c44',     // background sketch-line brown
  rule: 'rgba(46,36,22,0.28)',
  cardBg: 'rgba(46,36,22,0.045)',
  fieldBg: 'rgba(255,252,242,0.5)',
  seal: '#B3402A',
  sealDark: '#8a2f22',
  success: '#4A5D3A',
  error: '#8a2f22',
};

export const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";
export const SERIF = "'STIX Two Text', Georgia, serif";

// hero internals use 1–6, hero grain uses 10 — chrome/overlays sit above
export const Z = { chrome: 12, backdrop: 20, drawer: 21, lightbox: 30 };

export const asset = (p) => `${process.env.PUBLIC_URL}${p}`;
