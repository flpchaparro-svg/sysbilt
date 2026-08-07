import { SITE_ORIGIN } from './seoMeta';
import { organizationIdRef } from './organizationJsonLd';
import { pillar1Copy } from './pillar1Copy';
import { pillar2Copy } from './pillar2Copy';
import { pillar3Copy } from './pillar3Copy';
import { pillar4Copy } from './pillar4Copy';
import { pillar5Copy } from './pillar5Copy';
import { pillar6Copy } from './pillar6Copy';
import { pillar7Copy } from './pillar7Copy';

export type PillarServiceKey =
  | 'pillar1'
  | 'pillar2'
  | 'pillar3'
  | 'pillar4'
  | 'pillar5'
  | 'pillar6'
  | 'pillar7';

/** Short labels for structured data; descriptions come from each pillar’s hero.sub */
const PILLAR_SERVICE_META: Record<
  PillarServiceKey,
  { name: string; serviceType: string; url: string }
> = {
  pillar1: {
    name: 'Website development & lead capture',
    serviceType: 'Website development',
    url: `${SITE_ORIGIN}/pillar1`,
  },
  pillar2: {
    name: 'CRM & lead tracking',
    serviceType: 'CRM implementation',
    url: `${SITE_ORIGIN}/pillar2`,
  },
  pillar3: {
    name: 'Business workflow automation',
    serviceType: 'Process automation',
    url: `${SITE_ORIGIN}/pillar3`,
  },
  pillar4: {
    name: 'AI assistants for business',
    serviceType: 'AI implementation',
    url: `${SITE_ORIGIN}/pillar4`,
  },
  pillar5: {
    name: 'Content systems & distribution',
    serviceType: 'Content marketing systems',
    url: `${SITE_ORIGIN}/pillar5`,
  },
  pillar6: {
    name: 'Team training & system adoption',
    serviceType: 'Workforce training',
    url: `${SITE_ORIGIN}/pillar6`,
  },
  pillar7: {
    name: 'Business dashboards & reporting',
    serviceType: 'Analytics & reporting',
    url: `${SITE_ORIGIN}/pillar7`,
  },
};

const PILLAR_DESCRIPTION: Record<PillarServiceKey, string> = {
  pillar1: pillar1Copy.hero.sub,
  pillar2: pillar2Copy.hero.sub,
  pillar3: pillar3Copy.hero.sub,
  pillar4: pillar4Copy.hero.sub,
  pillar5: pillar5Copy.hero.sub,
  pillar6: pillar6Copy.hero.sub,
  pillar7: pillar7Copy.hero.sub,
};

/** Schema.org Service JSON-LD for a pillar route (distinct from sitewide ProfessionalService on home). */
export function buildPillarServiceJsonLd(pillarKey: PillarServiceKey): Record<string, unknown> {
  const meta = PILLAR_SERVICE_META[pillarKey];
  const description = PILLAR_DESCRIPTION[pillarKey];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${meta.url}#service`,
    name: meta.name,
    description,
    serviceType: meta.serviceType,
    url: meta.url,
    image: `${SITE_ORIGIN}/images/og-sysbilt.png`,
    provider: organizationIdRef(),
    areaServed: [
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'AdministrativeArea', name: 'New South Wales' },
    ],
  };
}
