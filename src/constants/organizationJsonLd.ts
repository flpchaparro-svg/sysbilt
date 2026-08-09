import { SEO_META, SITE_ORIGIN } from './seoMeta';

/** Visible NAP on /contact. Byte-identical everywhere we show public business details. */
export const VISIBLE_NAP = {
  name: 'SYSBILT',
  localityLine: 'Stanmore NSW 2048, Australia',
  abnDisplay: 'ABN 56 115 228 020',
  email: 'hello@sysbilt.com',
  url: SITE_ORIGIN,
} as const;

/**
 * Public phone for GBP / site / schema.
 * Omit until a call-capable number is confirmed (Twilio one-way SMS must never go here).
 * When ready, set E.164 e.g. '+61400000000' — buildProfessionalServiceJsonLd picks it up as one key.
 */
export const PUBLIC_TELEPHONE: string | null = null;

/** Public social profiles. Keep byte-identical with GlobalFooter + GBP social fields. */
export const SOCIAL_PROFILE_URLS = [
  'https://www.linkedin.com/company/112107023',
  'https://www.instagram.com/sysbilt/',
  'https://www.facebook.com/profile.php?id=61577590740296',
] as const;

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization` as const;

/** Reference only — use wherever a route would otherwise duplicate the org object. */
export function organizationIdRef(): { '@id': typeof ORGANIZATION_ID } {
  return { '@id': ORGANIZATION_ID };
}

/** Homepage / contact ProfessionalService node (LocalBusiness subtype). Build-time source of truth. */
export function buildProfessionalServiceJsonLd(): Record<string, unknown> {
  const logoUrl = `${SITE_ORIGIN}/images/og-sysbilt.png`;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: 'SYSBILT',
    legalName: 'Felipe Eduardo Chaparro Goitiandia',
    url: `${SITE_ORIGIN}/`,
    logo: { '@type': 'ImageObject', url: logoUrl },
    image: logoUrl,
    description: SEO_META.home.description,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'ABN', value: '56115228020' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stanmore',
      addressRegion: 'NSW',
      postalCode: '2048',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'City', name: 'Sydney' },
      { '@type': 'State', name: 'New South Wales' },
      { '@type': 'Country', name: 'Australia' },
    ],
    email: 'hello@sysbilt.com',
    knowsLanguage: ['en-AU'],
    founder: { '@type': 'Person', name: 'Felipe Chaparro' },
    sameAs: [...SOCIAL_PROFILE_URLS],
  };

  if (PUBLIC_TELEPHONE) {
    schema.telephone = PUBLIC_TELEPHONE;
  }

  return schema;
}
