import type {CSSProperties} from 'react'

/**
 * Funnel colour system on the SYSBILT brand spectrum.
 * Same 60/30/10 psychology as before — cream ground, ink authority,
 * gold structure, red isolation for CTAs only.
 */
export const FUNNEL_COLOURS = {
  /** 60% — cream reading ground */
  ground: '#FFF2EC',
  /** Raised surface (warmer cream) */
  surface: '#FFF8F4',
  /** Soft gold wash for benefit bands */
  surfaceGold: '#F7EDE0',
  /** 30% — ink / charcoal authority */
  ink: '#1A1A1A',
  /** Soft charcoal for secondary dark bands */
  inkSoft: '#242424',
  /** Body muted on cream */
  muted: '#4A4540',
  /** Structural warm charcoal (labels) */
  steel: '#5C534C',
  /** Gold — structure, growth, positive */
  gold: '#C5A059',
  /** Deeper gold */
  goldDeep: '#A8843F',
  /** Light gold for rules / accents on dark */
  goldLight: '#D4B57A',
  /** 10% — conversion accent (CTA / FAIL only) */
  accent: '#E21E3F',
  accentDeep: '#9A1730',
  /** Caution / SLOW — warm gold-amber in brand range */
  caution: '#B8893A',
  /** Text on ink */
  onInk: '#FFF2EC',
  /**
   * Soft mock UI (skeleton bars, dashed empties, mini chrome).
   * Tuned to read on cream/white without shouting.
   */
  mockWash: '#1A1A1A14',
  mockFill: '#1A1A1A2A',
  mockBar: '#1A1A1A3D',
  mockBorder: '#1A1A1A48',
  mockLabel: '#5C534C',
} as const

export type FunnelColourKey = keyof typeof FUNNEL_COLOURS

export const FUNNEL_CSS_VARS: CSSProperties = {
  ['--funnel-ground' as string]: FUNNEL_COLOURS.ground,
  ['--funnel-surface' as string]: FUNNEL_COLOURS.surface,
  ['--funnel-surface-gold' as string]: FUNNEL_COLOURS.surfaceGold,
  ['--funnel-ink' as string]: FUNNEL_COLOURS.ink,
  ['--funnel-ink-soft' as string]: FUNNEL_COLOURS.inkSoft,
  ['--funnel-muted' as string]: FUNNEL_COLOURS.muted,
  ['--funnel-steel' as string]: FUNNEL_COLOURS.steel,
  ['--funnel-gold' as string]: FUNNEL_COLOURS.gold,
  ['--funnel-accent' as string]: FUNNEL_COLOURS.accent,
  ['--funnel-accent-deep' as string]: FUNNEL_COLOURS.accentDeep,
  ['--funnel-caution' as string]: FUNNEL_COLOURS.caution,
  ['--funnel-on-ink' as string]: FUNNEL_COLOURS.onInk,
}
