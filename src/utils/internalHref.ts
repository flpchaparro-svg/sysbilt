const SITE_HOSTS = new Set(['sysbilt.com', 'www.sysbilt.com'])

/** Path for same-site hrefs so React Router can take over. External hrefs return null. */
export function toInternalPath(href: string | undefined | null): string | null {
  if (!href) return null
  const trimmed = href.trim()
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return null
  }
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed
  try {
    const url = new URL(trimmed)
    if (!SITE_HOSTS.has(url.hostname)) return null
    return `${url.pathname}${url.search}${url.hash}` || '/'
  } catch {
    return null
  }
}
