/** Design tokens — copied from Built to Work HTML template CSS variables. */
export const BTW_TOKENS = {
  cream: '#FFF2EC',
  creamLight: '#FFF8F5',
  creamWarm: '#FFF9F0',
  ink: '#1A1A1A',
  inkDeep: '#111111',
  inkOpener: '#16130F',
  gold: '#C5A059',
  goldOnCream: '#8B6914',
  goldOnDark: '#D4A84B',
  proseMeasure: '60ch',
} as const

export const BTW_TOKEN_CSS = `
.btw-root {
  --btw-cream: ${BTW_TOKENS.cream};
  --btw-cream-light: ${BTW_TOKENS.creamLight};
  --btw-ink: ${BTW_TOKENS.ink};
  --btw-ink-deep: ${BTW_TOKENS.inkDeep};
  --btw-ink-opener: ${BTW_TOKENS.inkOpener};
  --btw-gold: ${BTW_TOKENS.gold};
  --btw-gold-cream: ${BTW_TOKENS.goldOnCream};
  --btw-gold-dark: ${BTW_TOKENS.goldOnDark};
  --btw-prose: ${BTW_TOKENS.proseMeasure};
  --font-serif: Lora, Georgia, 'Times New Roman', serif;
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace;
}
`
