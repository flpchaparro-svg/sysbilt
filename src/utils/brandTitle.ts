/** Strip a trailing `| SYSBILT` so we never double-brand titles. */
export function stripSysbiltBrand(title: string): string {
  return String(title || '')
    .trim()
    .replace(/\s*\|\s*SYSBILT\s*$/i, '')
    .trim()
}

/** Brand a page title once: `Headline | SYSBILT`. */
export function brandTitle(raw: string | null | undefined, fallback = 'SYSBILT'): string {
  const stripped = stripSysbiltBrand(raw || '')
  if (!stripped) return fallback
  return `${stripped} | SYSBILT`
}
