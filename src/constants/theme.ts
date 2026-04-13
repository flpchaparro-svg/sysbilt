/**
 * Central palette for the site.
 * Use these in JS/TS (D3, canvas, style={{}}).
 * For Tailwind, use the same names: text-red-solid, bg-gold, etc.
 *
 * =============================================================================
 * WHEN TO USE EACH COLOR
 * =============================================================================
 *
 * --- RED (accent for GET CLIENTS / Phase 01) ---
 *   • Small text / labels on cream (readable, 4.5:1 contrast):
 *     → redText   (#9A1730)  Tailwind: text-red-text
 *   • Headlines & decorative (dots, icons, borders):
 *     → redSolid  (#E21E3F)  Tailwind: text-red-solid
 *   • On black/dark background (nav, footer, dark cards):
 *     → redOnDark (#FF6B6B)  Tailwind: text-red-on-dark
 *   Rule: If humans READ it → text-red-text. If decorative → text-red-solid.
 *
 * --- GOLD (accent for SCALE FASTER / Phase 02, and general highlight) ---
 *   • Headlines & titles on cream/light (e.g. "The Multiplier", "One Flow."):
 *     → gold      (#C5A059)  Tailwind: text-gold
 *   • Small labels, tags, nav links ON CREAM (need contrast):
 *     → goldOnCream (#8B6914)  Tailwind: text-gold-on-cream
 *   • Text on black/dark background (footer, dark cards, terminal):
 *     → goldOnDark (#D4A84B)  Tailwind: text-gold-on-dark
 *   • Muted gold (secondary labels, "3 Outcomes"):
 *     → goldMuted (#7A5D12)  Tailwind: text-gold-muted
 *
 * --- NEUTRALS ---
 *   • Body text, headlines (default):
 *     → dark      (#1a1a1a)  Tailwind: text-dark
 *   • Backgrounds:
 *     → cream (page bg), offWhite (cards), white
 *   • On dark/black background for body text:
 *     → white or white/80
 *
 * --- OTHER ---
 *   • Teal (e.g. Evidence vault arrow, "AFTER" badge): teal (#0F766E), text-teal
 *   • Grays: for canvas/D3/inline only (gray100–gray950).
 */
export const colors = {
  // Backgrounds
  cream: '#FFF2EC',
  creamLight: '#FFF8F5',
  creamWarm: '#FFF9F0',
  offWhite: '#FAFAFA',
  white: '#FFFFFF',
  dark: '#1a1a1a',

  // Red: redText for readable text on cream; redSolid for decorative; redOnDark on black
  red: '#9A1730',
  redSolid: '#E21E3F',
  redText: '#9A1730', // Accessible red for text on cream (4.5:1 contrast)
  redOnDark: '#FF6B6B',

  // Gold: use gold for titles; goldOnCream for labels on cream; goldOnDark on black
  gold: '#C5A059',
  goldOnCream: '#8B6914',
  goldOnDark: '#D4A84B',
  goldMuted: '#7A5D12',

  teal: '#0F766E',

  // Grays for canvas/D3/inline only
  gray50: '#F0F0F0',
  gray100: '#F4F4F4',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#9CA3AF',
  gray500: '#666666',
  gray600: '#444444',
  gray700: '#333333',
  gray800: '#222222',
  gray900: '#111111',
  gray950: '#0d0d0d',
} as const;
