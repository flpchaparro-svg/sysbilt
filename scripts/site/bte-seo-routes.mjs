/**
 * Single source of truth for Built to Teach public routes and per-chapter SEO meta.
 */
export const BTE_HUB_ROUTE = '/guides/built-to-teach'

export const BTE_CHAPTER_SLUGS = [
  'why-good-systems-fail-without-trained-people',
  'what-you-actually-own-the-knowledge-of-the-business',
  'the-anatomy-of-training-that-sticks',
  'capturing-whats-in-peoples-heads',
  'the-format-library',
  'running-it-day-to-day',
  'the-training-agent-a-teacher-that-never-sleeps',
  'onboarding-from-first-day-to-independent',
  'change-management-rolling-out-new-systems-without-the-revolt',
  'growing-it-and-knowing-it-works',
  'the-prompt-pack',
  'glossary-and-who-to-call',
]

export const BTE_CHAPTER_META_BY_SLUG = {
  'why-good-systems-fail-without-trained-people': {
    title: 'Why Good Systems Fail Without Trained People | SYSBILT',
    description:
      'Training got cheap. The bottleneck is not production. One job, adoption, and why knowledge trapped in heads is the real risk.',
  },
  'what-you-actually-own-the-knowledge-of-the-business': {
    title: 'What You Actually Own: The Knowledge of the Business | SYSBILT',
    description:
      'The asset nobody wrote down, the single source of truth, and key-person risk when knowledge lives only in heads.',
  },
  'the-anatomy-of-training-that-sticks': {
    title: 'The Anatomy of Training That Sticks | SYSBILT',
    description:
      'One skill at a time, show then do then check, short and close to need, spaced repetition, and confirming it landed.',
  },
  'capturing-whats-in-peoples-heads': {
    title: 'Capturing What Is in People\'s Heads | SYSBILT',
    description:
      'Record while doing, voice and screen turned into materials, and the document-as-you-go habit.',
  },
  'the-format-library': {
    title: 'The Training Format Library | SYSBILT',
    description:
      'Procedures, videos, podcasts, infographics, quizzes, avatar presenters, and when in-person still earns its place.',
  },
  'running-it-day-to-day': {
    title: 'Running Training Day to Day | SYSBILT',
    description:
      'Training in the flow of work, look it up first, and the update ritual that keeps materials trusted.',
  },
  'the-training-agent-a-teacher-that-never-sleeps': {
    title: 'The Training Agent: A Teacher That Never Sleeps | SYSBILT',
    description:
      'A number you can ring, learning by asking, and why the agent is only as good as the knowledge behind it.',
  },
  'onboarding-from-first-day-to-independent': {
    title: 'Onboarding: From First Day to Independent | SYSBILT',
    description:
      'Ready before they arrive, a path not a firehose, the blend that works, and time to independent.',
  },
  'change-management-rolling-out-new-systems-without-the-revolt': {
    title: 'Change Management Without the Revolt | SYSBILT',
    description:
      'Why people resist, explain why before how, support generously then commit fully, and shipping change with its story.',
  },
  'growing-it-and-knowing-it-works': {
    title: 'Growing It, and Knowing It Works | SYSBILT',
    description:
      'Signals you can read, the library that compounds, keeping it alive, and growing without over-building.',
  },
  'the-prompt-pack': {
    title: 'The Training Prompt Pack | SYSBILT',
    description:
      'Ten copy-ready briefings for procedures, quizzes, podcasts, change packs, onboarding paths, and gap spotting.',
  },
  'glossary-and-who-to-call': {
    title: 'Training Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English training glossary, plus how to request a Training Systems Review from SYSBILT.',
  },
}

export const BTE_HUB_META = {
  title: 'Built to Teach: Team Training at the Speed of Change | SYSBILT',
  description:
    'How to train your team at the speed your business changes: capture knowledge, the format library, the training agent, onboarding, and change management. Free from SYSBILT.',
}

export function btePublicRoutes() {
  return [BTE_HUB_ROUTE, ...BTE_CHAPTER_SLUGS.map((s) => `${BTE_HUB_ROUTE}/${s}`)]
}
