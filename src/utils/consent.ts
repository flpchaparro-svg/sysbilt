// Single source of truth for cookie consent state.
// Versioned so we can invalidate old consent if we add new categories.

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = 'sysbilt_consent_v1';
export const CONSENT_EVENT = 'sysbilt:consent-change';
export const OPEN_BANNER_EVENT = 'sysbilt:open-consent';

export interface ConsentState {
  version: number;
  timestamp: string;
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

const defaultConsent: Omit<ConsentState, 'timestamp'> = {
  version: CONSENT_VERSION,
  essential: true,
  analytics: false,
  marketing: false,
};

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(input: { analytics: boolean; marketing: boolean }): ConsentState {
  const next: ConsentState = {
    ...defaultConsent,
    ...input,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: next }));
  } catch {
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: next }));
  }
  return next;
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* no-op */
  }
}

/** Subscribe to consent updates after `setConsent` (same-tab). Returns unsubscribe. */
export function subscribe(listener: (state: ConsentState) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const onConsent = (e: Event) => {
    listener((e as CustomEvent<ConsentState>).detail);
  };
  window.addEventListener(CONSENT_EVENT, onConsent as EventListener);
  return () => window.removeEventListener(CONSENT_EVENT, onConsent as EventListener);
}

export function isBotOrPrerender(): boolean {
  if (typeof window === 'undefined') return true;
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return true;
  const ua = navigator.userAgent || '';
  return /HeadlessChrome|Prerender|Googlebot|bingbot|Slackbot|Twitterbot|facebookexternalhit|LinkedInBot|Applebot|DuckDuckBot|YandexBot|Baiduspider/i.test(
    ua
  );
}
