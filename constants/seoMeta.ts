/** Per-page title + meta description for Helmet (indexed routes + shell pages). */

export const SITE_ORIGIN = 'https://sysbilt.com' as const;

export const SEO_META = {
  home: {
    title: 'SYSBILT | Business Systems for Growing Companies',
    description:
      'SYSBILT builds business systems for Australian companies doing $1M to $20M. Websites, CRM, automation, AI, content, training, and dashboards.',
    canonical: `${SITE_ORIGIN}/`,
  },
  process: {
    title: 'Our Process | SYSBILT',
    description:
      'From discovery to deployment in four phases. See how SYSBILT builds business systems that actually work.',
    canonical: `${SITE_ORIGIN}/process`,
  },
  architect: {
    title: 'About SYSBILT | Business Systems Team',
    description:
      'Meet the SYSBILT team. We build business systems for Australian companies doing $1M to $20M in revenue.',
    canonical: `${SITE_ORIGIN}/architect`,
  },
  proof: {
    title: 'Proof | SYSBILT',
    description:
      'Real results from real businesses. See how SYSBILT systems drive revenue, save time, and reduce manual work.',
    canonical: `${SITE_ORIGIN}/proof`,
  },
  blogIndex: {
    title: 'Insights | SYSBILT',
    description:
      'Practical advice for businesses that want to grow without the grind. Systems, automation, and growth strategies.',
    canonical: `${SITE_ORIGIN}/blog`,
  },
  news: {
    title: 'News | SYSBILT',
    description:
      'Industry news and updates for Australian businesses. Filtered by growth stage.',
    canonical: `${SITE_ORIGIN}/news`,
  },
  contact: {
    title: "Let's Talk | SYSBILT",
    description:
      'Book a call with SYSBILT. We build business systems for growing Australian companies.',
    canonical: `${SITE_ORIGIN}/contact`,
  },
  system: {
    title: 'The System | SYSBILT',
    description:
      'Seven pillars that work together. See how SYSBILT connects websites, CRM, automation, AI, content, training, and dashboards.',
    canonical: `${SITE_ORIGIN}/system`,
  },
  evidenceVault: {
    title: 'Evidence Vault | SYSBILT',
    description: 'Technical proof and build details from SYSBILT client work.',
    canonical: `${SITE_ORIGIN}/evidence-vault`,
  },
  privacy: {
    title: 'Privacy Policy | SYSBILT',
    description: 'How SYSBILT collects, uses, and protects your information.',
    canonical: `${SITE_ORIGIN}/privacy`,
  },
  notFound: {
    title: 'Page not found | SYSBILT',
    description: 'The page you are looking for does not exist.',
  },
  pillar1: {
    canonical: `${SITE_ORIGIN}/pillar1`,
  },
  pillar2: {
    canonical: `${SITE_ORIGIN}/pillar2`,
  },
  pillar3: {
    canonical: `${SITE_ORIGIN}/pillar3`,
  },
  pillar4: {
    canonical: `${SITE_ORIGIN}/pillar4`,
  },
  pillar5: {
    canonical: `${SITE_ORIGIN}/pillar5`,
  },
  pillar6: {
    canonical: `${SITE_ORIGIN}/pillar6`,
  },
  pillar7: {
    canonical: `${SITE_ORIGIN}/pillar7`,
  },
} as const;
