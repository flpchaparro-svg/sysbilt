import type { FC, ReactNode } from 'react';
import { Helmet as HelmetImpl } from 'react-helmet-async';
import { buildPillarServiceJsonLd, type PillarServiceKey } from '../constants/pillarServiceJsonLd';

/** react-helmet-async + React 19 JSX types */
const Helmet = HelmetImpl as FC<{ children?: ReactNode }>;

/** Per-pillar Service JSON-LD — strengthens entity signals vs sitewide ProfessionalService on home. */
export default function PillarServiceJsonLd({ pillarKey }: { pillarKey: PillarServiceKey }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(buildPillarServiceJsonLd(pillarKey))}</script>
    </Helmet>
  );
}
