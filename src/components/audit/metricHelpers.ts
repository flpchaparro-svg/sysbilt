import { isMissingSignal } from '@/types/deepAuditReport';

/** Exact metric labels from the model → helper blurbs. No fallback string for unknown labels. */
export const metricHelpers: Record<string, string> = {
  'Google rankings on key terms':
    'Where you show up when prospects search the terms your business depends on.',
  'Knowledge panel presence':
    'Whether Google has built a summary card for your business in search results. Seeing "Own this business?" on the public page is normal, even when the profile is already claimed.',
  'Search-visible reviews': 'Review platforms that appear when someone Googles your name.',
  'Local pack visibility': 'Whether you show up in the map results for local searches.',
  'Value proposition clarity':
    'How quickly a first-time visitor understands what you do and who it is for.',
  'Call to action strength': 'How clearly your website tells a visitor what to do next.',
  'Brand consistency':
    'Whether your visual identity and tone read consistently across pages and channels.',
  'Copy readability': 'How readable your written content is, in plain English, without jargon.',
  'Google review volume': 'How many reviews you have collected on Google Maps for your business.',
  'Google review rating': 'Your average star rating on Google Maps.',
  'Social presence': 'Where your business shows up across social and review platforms.',
  'Review recency': 'How recent your most visible feedback is.',
};

export function metricHelperForLabel(label: string): string | undefined {
  const h = metricHelpers[label.trim()];
  return h;
}

/**
 * We could not observe this signal (paywall, tooling limits, etc.).
 * Treated like a weak tile visually, but the rating badge shows "unknown". We are not claiming low/medium/high.
 */
export function isMetricValueUnknown(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  const lower = v.toLowerCase();
  if (lower === 'unknown') return true;
  if (lower.startsWith('hidden behind')) return true;
  if (lower.startsWith('could not verify')) return true;
  return false;
}

/** Empty or weak values: dashed tile treatment, helper stays full opacity. */
export function isMetricValueEmpty(value: string): boolean {
  const v = value.trim();
  if (!v || isMissingSignal(v)) return true;
  const lower = v.toLowerCase();
  if (isMetricValueUnknown(v)) return false;
  if (lower.includes('not detected')) return true;
  if (lower.startsWith('not ')) return true;
  return false;
}
