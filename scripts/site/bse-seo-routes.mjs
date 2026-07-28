/**
 * Single source of truth for Built to See public routes and per-chapter SEO meta.
 */
export const BSE_HUB_ROUTE = '/guides/built-to-see'

export const BSE_CHAPTER_SLUGS = [
  'why-youre-flying-blind-even-with-all-this-data',
  'what-you-own-the-data-of-your-business',
  'the-anatomy-of-a-dashboard-that-gets-used',
  'the-numbers-that-matter',
  'the-dashboard-library',
  'running-it-day-to-day',
  'keeping-it-honest',
  'knowing-where-to-look-and-when',
  'the-dashboard-as-the-nervous-systems-screen',
  'growing-it-over-time',
  'the-prompt-pack',
  'glossary-and-who-to-call',
]

export const BSE_CHAPTER_META_BY_SLUG = {
  'why-youre-flying-blind-even-with-all-this-data': {
    title: 'Why You\'re Flying Blind, Even With All This Data | SYSBILT',
    description:
      'Too little data or too much scattered data. The rear-view problem, drowning in dashboards, and seeing clearly instead.',
  },
  'what-you-own-the-data-of-your-business': {
    title: 'What You Own: The Data of Your Business | SYSBILT',
    description:
      'The asset every system was building, owned and exportable data, and shared definitions that decide if numbers are true.',
  },
  'the-anatomy-of-a-dashboard-that-gets-used': {
    title: 'The Anatomy of a Dashboard That Gets Used | SYSBILT',
    description:
      'One question per view, a handful of numbers, context on every figure, and built for the five-second glance.',
  },
  'the-numbers-that-matter': {
    title: 'The Numbers That Matter | SYSBILT',
    description:
      'Leading versus lagging numbers, the core set most businesses need, and vanity numbers to ignore.',
  },
  'the-dashboard-library': {
    title: 'The Dashboard Library | SYSBILT',
    description:
      'Daily glance, pipeline, marketing, money, operations, and content views, and choosing what you need.',
  },
  'running-it-day-to-day': {
    title: 'Running Dashboards Day to Day | SYSBILT',
    description:
      'Daily, weekly, and monthly rhythms, only show what you will act on, and meetings from one screen.',
  },
  'keeping-it-honest': {
    title: 'Keeping Dashboards Honest | SYSBILT',
    description:
      'Garbage in gospel out, definitions held over time, who sees what, and silent failure when connections freeze.',
  },
  'knowing-where-to-look-and-when': {
    title: 'Knowing Where to Look, and When | SYSBILT',
    description:
      'Alerts and thresholds, anomaly flags, plain-language questions of your data, and forecasts as guidance.',
  },
  'the-dashboard-as-the-nervous-systems-screen': {
    title: 'The Dashboard as the Nervous System\'s Screen | SYSBILT',
    description:
      'Where the whole connected business becomes visible, one enquiry through the loop, and the pipes behind the screen.',
  },
  'growing-it-over-time': {
    title: 'Growing Dashboards Over Time | SYSBILT',
    description:
      'See, understand, anticipate: the three stages, build when the decision needs it, grow without over-building.',
  },
  'the-prompt-pack': {
    title: 'The Dashboard Prompt Pack | SYSBILT',
    description:
      'Ten copy-ready briefings for monthly summaries, weekly reviews, channel analysis, and sanity-checking numbers.',
  },
  'glossary-and-who-to-call': {
    title: 'Dashboard Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English dashboard glossary, plus how to request a Dashboard Systems Review from SYSBILT.',
  },
}

export const BSE_HUB_META = {
  title: 'Built to See: Know What\'s Actually Happening | SYSBILT',
  description:
    'How to know what is actually happening in your business before it is too late to act: owned data, dashboards that get used, alerts, and the screen where the whole system becomes visible. Free from SYSBILT.',
}

export function bsePublicRoutes() {
  return [BSE_HUB_ROUTE, ...BSE_CHAPTER_SLUGS.map((s) => `${BSE_HUB_ROUTE}/${s}`)]
}
