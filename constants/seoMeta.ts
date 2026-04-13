/** Per-page title + meta description for Helmet (indexed routes + shell pages). */

export const SITE_ORIGIN = 'https://sysbilt.com' as const;

export const SEO_META = {
  home: {
    title: 'SYSBILT | Business Systems for Growing Companies',
    description:
      'SYSBILT builds business systems for growing Australian companies. Websites, CRM, automation, AI, content, training, and dashboards that work together.',
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
    title: 'Websites & E-commerce for Australian Businesses | SYSBILT',
    description:
      'We build websites and e-commerce systems that capture leads and connect to your CRM. For Australian businesses doing $1M to $20M.',
    canonical: `${SITE_ORIGIN}/pillar1`,
  },
  pillar2: {
    title: 'CRM & Lead Tracking for Growing Businesses | SYSBILT',
    description:
      'We set up CRM systems that track every lead, every deal, and every follow-up in one place. HubSpot and Pipedrive specialists in Sydney.',
    canonical: `${SITE_ORIGIN}/pillar2`,
  },
  pillar3: {
    title: 'Business Automation for Australian Companies | SYSBILT',
    description:
      'We build automations that move data between your tools, send follow-ups, and handle admin. Using Make.com and n8n for businesses doing $1M to $20M.',
    canonical: `${SITE_ORIGIN}/pillar3`,
  },
  pillar4: {
    title: 'AI Assistants for Business | SYSBILT Sydney',
    description:
      'We build AI assistants that answer calls, qualify leads, and handle repetitive questions for your business. Custom AI chatbots and voice bots.',
    canonical: `${SITE_ORIGIN}/pillar4`,
  },
  pillar5: {
    title: 'Content Systems & Distribution | SYSBILT',
    description:
      'We build content systems that turn one voice note into a month of posts. Automated content production for busy Australian business owners.',
    canonical: `${SITE_ORIGIN}/pillar5`,
  },
  pillar6: {
    title: 'Team Training & System Adoption | SYSBILT',
    description:
      'We train your team to actually use the tools you paid for. SOPs, onboarding videos, and adoption tracking for Australian businesses.',
    canonical: `${SITE_ORIGIN}/pillar6`,
  },
  pillar7: {
    title: 'Business Dashboards & Reporting | SYSBILT',
    description:
      'We build dashboards that show your leads, revenue, and operations on one screen. Real-time business intelligence for growing Australian companies.',
    canonical: `${SITE_ORIGIN}/pillar7`,
  },
} as const;
