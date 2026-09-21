/** GA4 lead events after a successful save. Never fire on honeypot or validation errors. */

export type LeadFormDestination = 'contact' | 'sybil' | 'funnel_access';

type LeadEventParams = {
  form_id: string;
  form_destination: LeadFormDestination;
  product?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function pushEvent(name: string, params: LeadEventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export function trackGenerateLead(input: {
  formId: string;
  formDestination: LeadFormDestination;
  product?: string;
}): void {
  const params: LeadEventParams = {
    form_id: input.formId,
    form_destination: input.formDestination,
  };
  if (input.product) params.product = input.product;
  pushEvent('generate_lead', params);
  pushEvent('form_submit', params);
}
