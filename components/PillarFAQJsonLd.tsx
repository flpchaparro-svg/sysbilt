import type { FC, ReactNode } from 'react';
import { Helmet as HelmetImpl } from 'react-helmet-async';
import { generateFAQSchema, type FAQ } from '../constants/faqData';

/** react-helmet-async + React 19 JSX types */
const Helmet = HelmetImpl as FC<{ children?: ReactNode }>;

/** FAQPage JSON-LD for pillar routes — same Q&A as FAQSection / faqData. */
export default function PillarFAQJsonLd({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(generateFAQSchema(faqs))}</script>
    </Helmet>
  );
}
