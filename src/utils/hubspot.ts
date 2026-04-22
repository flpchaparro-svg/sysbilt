// Loads the HubSpot tracker script. Separate from the HubSpot forms API
// in useContactForm.ts (direct POST, no script or cookies required).

const HUBSPOT_SCRIPT_ID = 'hs-script-loader';
const HUBSPOT_SRC = '//js-ap1.hs-scripts.com/442493227.js';
const HUBSPOT_PRECONNECTS = [
  'https://forms-ap1.hscollectedforms.net',
  'https://js-ap1.hscollectedforms.net',
];

function addPreconnects(): void {
  HUBSPOT_PRECONNECTS.forEach((href) => {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = '';
    document.head.appendChild(link);
  });
}

export function loadHubSpotTracker(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(HUBSPOT_SCRIPT_ID)) return;

  addPreconnects();

  const script = document.createElement('script');
  script.src = HUBSPOT_SRC;
  script.id = HUBSPOT_SCRIPT_ID;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

export function unloadHubSpotTracker(): void {
  if (typeof document === 'undefined') return;
  const hsCookies = ['__hstc', 'hubspotutk', '__hssc', '__hssrc', '__hs_initial_opt_in', '__hs_opt_out'];
  const host = location.hostname.replace(/^www\./, '');
  hsCookies.forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${host}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}
