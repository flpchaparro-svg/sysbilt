/** Strip a trailing `| SYSBILT` so we never double-brand titles. */
export function stripSysbiltBrand(title) {
  return String(title || '')
    .trim()
    .replace(/\s*\|\s*SYSBILT\s*$/i, '')
    .trim()
}

/** Brand a page title once: `Headline | SYSBILT`. */
export function brandTitle(raw, fallback = 'SYSBILT') {
  const stripped = stripSysbiltBrand(raw || '')
  if (!stripped) return fallback
  return `${stripped} | SYSBILT`
}
