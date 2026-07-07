/**
 * Cross-guide chapter opener photos.
 * Landscape in shared/web — web chapter heroes (16:9).
 * Portrait in shared/print — A4 PDF openers.
 */
import type { GuideChapterCover } from './chapter-cover-types'

function shared(role: string): GuideChapterCover {
  return {
    webSrc: `/images/guides/shared/web/${role}.webp`,
    printSrc: `/images/guides/shared/print/${role}.webp`,
    alt: '',
  }
}

export const GUIDE_SHARED_COVERS = {
  ownershipKey: shared('ownership-key'),
  anatomyWireframe: shared('anatomy-wireframe'),
  pagesMockups: shared('pages-mockups'),
  featuresComponentsWeb: shared('features-components-web'),
  dailyDesk: shared('daily-desk'),
  healthGauge: shared('health-gauge'),
  discoveryMapPin: shared('discovery-map-pin'),
  hubSpokes: shared('hub-spokes'),
  growthSeedling: shared('growth-seedling'),
  aiKeyboard: shared('ai-keyboard'),
  glossaryNotebook: shared('glossary-notebook'),
} as const

export const BTW_GUIDE_COVERS = {
  phoneWebsite: {
    webSrc: '/images/guides/built-to-work/web/phone-website.webp',
    printSrc: '/images/guides/built-to-work/print/phone-website.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BTS_GUIDE_COVERS = {
  phoneStore: {
    webSrc: '/images/guides/built-to-sell/web/phone-store.png',
    printSrc: '/images/guides/built-to-sell/print/phone-store.png',
    alt: '',
  },
  ecommerceTiles: {
    webSrc: '/images/guides/built-to-sell/web/ecommerce-tiles.png',
    printSrc: '/images/guides/built-to-sell/print/ecommerce-tiles.png',
    alt: '',
  },
  productDataSearch: {
    webSrc: '/images/guides/built-to-sell/web/product-data-search.png',
    printSrc: '/images/guides/built-to-sell/print/product-data-search.png',
    alt: '',
  },
  channelsStorefront: {
    webSrc: '/images/guides/built-to-sell/web/channels-storefront.png',
    printSrc: '/images/guides/built-to-sell/print/channels-storefront.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BTC_GUIDE_COVERS = {
  ch01Memory: {
    webSrc: '/images/guides/built-to-close/web/ch01-memory.png',
    printSrc: '/images/guides/built-to-close/print/ch01-memory.png',
    alt: '',
  },
  ch03Pipeline: {
    webSrc: '/images/guides/built-to-close/web/ch03-pipeline.png',
    printSrc: '/images/guides/built-to-close/print/ch03-pipeline.png',
    alt: '',
  },
  ch04ContactRecord: {
    webSrc: '/images/guides/built-to-close/web/ch04-contact-record.png',
    printSrc: '/images/guides/built-to-close/print/ch04-contact-record.png',
    alt: '',
  },
  ch05FollowUpCards: {
    webSrc: '/images/guides/built-to-close/web/ch05-follow-up-cards.png',
    printSrc: '/images/guides/built-to-close/print/ch05-follow-up-cards.png',
    alt: '',
  },
  ch07MessageStacks: {
    webSrc: '/images/guides/built-to-close/web/ch07-message-stacks.png',
    printSrc: '/images/guides/built-to-close/print/ch07-message-stacks.png',
    alt: '',
  },
  ch08LeadTracking: {
    webSrc: '/images/guides/built-to-close/web/ch08-lead-tracking.png',
    printSrc: '/images/guides/built-to-close/print/ch08-lead-tracking.png',
    alt: '',
  },
  ch10BalanceScale: {
    webSrc: '/images/guides/built-to-close/web/ch10-balance-scale.png',
    printSrc: '/images/guides/built-to-close/print/ch10-balance-scale.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BTR_GUIDE_COVERS = {
  ch01HumanGlue: {
    webSrc: '/images/guides/built-to-run/web/ch01-human-glue.png',
    printSrc: '/images/guides/built-to-run/print/ch01-human-glue.png',
    alt: '',
  },
  ch03DemoCanyon: {
    webSrc: '/images/guides/built-to-run/web/ch03-demo-canyon.png',
    printSrc: '/images/guides/built-to-run/print/ch03-demo-canyon.png',
    alt: '',
  },
  ch04WeekAudit: {
    webSrc: '/images/guides/built-to-run/web/ch04-week-audit.png',
    printSrc: '/images/guides/built-to-run/print/ch04-week-audit.png',
    alt: '',
  },
  ch05LibraryShelves: {
    webSrc: '/images/guides/built-to-run/web/ch05-library-shelves.png',
    printSrc: '/images/guides/built-to-run/print/ch05-library-shelves.png',
    alt: '',
  },
  ch07CredentialsDecay: {
    webSrc: '/images/guides/built-to-run/web/ch07-credentials-decay.png',
    printSrc: '/images/guides/built-to-run/print/ch07-credentials-decay.png',
    alt: '',
  },
  ch08AiVsRules: {
    webSrc: '/images/guides/built-to-run/web/ch08-ai-vs-rules.png',
    printSrc: '/images/guides/built-to-run/print/ch08-ai-vs-rules.png',
    alt: '',
  },
  ch09NervousSystem: {
    webSrc: '/images/guides/built-to-run/web/ch09-nervous-system.png',
    printSrc: '/images/guides/built-to-run/print/ch09-nervous-system.png',
    alt: '',
  },
  ch10CostCrossover: {
    webSrc: '/images/guides/built-to-run/web/ch10-cost-crossover.png',
    printSrc: '/images/guides/built-to-run/print/ch10-cost-crossover.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BTT_GUIDE_COVERS = {
  ch01TwoTruths: {
    webSrc: '/images/guides/built-to-think/web/ch01-two-truths.png',
    printSrc: '/images/guides/built-to-think/print/ch01-two-truths.png',
    alt: '',
  },
  ch02PredictionMachine: {
    webSrc: '/images/guides/built-to-think/web/ch02-prediction-machine.png',
    printSrc: '/images/guides/built-to-think/print/ch02-prediction-machine.png',
    alt: '',
  },
  ch03FourGates: {
    webSrc: '/images/guides/built-to-think/web/ch03-four-gates.png',
    printSrc: '/images/guides/built-to-think/print/ch03-four-gates.png',
    alt: '',
  },
  ch04ThreeDoors: {
    webSrc: '/images/guides/built-to-think/web/ch04-three-doors.png',
    printSrc: '/images/guides/built-to-think/print/ch04-three-doors.png',
    alt: '',
  },
  ch05UseCaseLibrary: {
    webSrc: '/images/guides/built-to-think/web/ch05-use-case-library.png',
    printSrc: '/images/guides/built-to-think/print/ch05-use-case-library.png',
    alt: '',
  },
  ch08IcebergKnowledge: {
    webSrc: '/images/guides/built-to-think/web/ch08-iceberg-knowledge.png',
    printSrc: '/images/guides/built-to-think/print/ch08-iceberg-knowledge.png',
    alt: '',
  },
  ch09SystemPlugs: {
    webSrc: '/images/guides/built-to-think/web/ch09-system-plugs.png',
    printSrc: '/images/guides/built-to-think/print/ch09-system-plugs.png',
    alt: '',
  },
  ch10AdoptionLadder: {
    webSrc: '/images/guides/built-to-think/web/ch10-adoption-ladder.png',
    printSrc: '/images/guides/built-to-think/print/ch10-adoption-ladder.png',
    alt: '',
  },
  ch11PromptCards: {
    webSrc: '/images/guides/built-to-think/web/ch11-prompt-cards.png',
    printSrc: '/images/guides/built-to-think/print/ch11-prompt-cards.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BTM_GUIDE_COVERS = {
  ch01FloodVsSystem: {
    webSrc: '/images/guides/built-to-multiply/web/ch01-flood-vs-system.png',
    printSrc: '/images/guides/built-to-multiply/print/ch01-flood-vs-system.png',
    alt: '',
  },
  ch02ThreeJobs: {
    webSrc: '/images/guides/built-to-multiply/web/ch02-three-jobs.png',
    printSrc: '/images/guides/built-to-multiply/print/ch02-three-jobs.png',
    alt: '',
  },
  ch03HookValueAction: {
    webSrc: '/images/guides/built-to-multiply/web/ch03-hook-value-action.png',
    printSrc: '/images/guides/built-to-multiply/print/ch03-hook-value-action.png',
    alt: '',
  },
  ch04RepurposeTree: {
    webSrc: '/images/guides/built-to-multiply/web/ch04-repurpose-tree.png',
    printSrc: '/images/guides/built-to-multiply/print/ch04-repurpose-tree.png',
    alt: '',
  },
  ch05ContentToolkit: {
    webSrc: '/images/guides/built-to-multiply/web/ch05-content-toolkit.png',
    printSrc: '/images/guides/built-to-multiply/print/ch05-content-toolkit.png',
    alt: '',
  },
  ch08MetricsThatMatter: {
    webSrc: '/images/guides/built-to-multiply/web/ch08-metrics-that-matter.png',
    printSrc: '/images/guides/built-to-multiply/print/ch08-metrics-that-matter.png',
    alt: '',
  },
  ch09ContentChain: {
    webSrc: '/images/guides/built-to-multiply/web/ch09-content-chain.png',
    printSrc: '/images/guides/built-to-multiply/print/ch09-content-chain.png',
    alt: '',
  },
  ch10TeamTraining: {
    webSrc: '/images/guides/built-to-multiply/web/ch10-team-training.png',
    printSrc: '/images/guides/built-to-multiply/print/ch10-team-training.png',
    alt: '',
  },
  ch11PromptCards: {
    webSrc: '/images/guides/built-to-multiply/web/ch11-prompt-cards.png',
    printSrc: '/images/guides/built-to-multiply/print/ch11-prompt-cards.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BTE_GUIDE_COVERS = {
  ch01SystemsNeedPeople: {
    webSrc: '/images/guides/built-to-teach/web/ch01-systems-need-people.png',
    printSrc: '/images/guides/built-to-teach/print/ch01-systems-need-people.png',
    alt: '',
  },
  ch03ShowDoCheck: {
    webSrc: '/images/guides/built-to-teach/web/ch03-show-do-check.png',
    printSrc: '/images/guides/built-to-teach/print/ch03-show-do-check.png',
    alt: '',
  },
  ch04CaptureKnowledge: {
    webSrc: '/images/guides/built-to-teach/web/ch04-capture-knowledge.png',
    printSrc: '/images/guides/built-to-teach/print/ch04-capture-knowledge.png',
    alt: '',
  },
  ch05FormatLibrary: {
    webSrc: '/images/guides/built-to-teach/web/ch05-format-library.png',
    printSrc: '/images/guides/built-to-teach/print/ch05-format-library.png',
    alt: '',
  },
  ch07TrainingAgent: {
    webSrc: '/images/guides/built-to-teach/web/ch07-training-agent.png',
    printSrc: '/images/guides/built-to-teach/print/ch07-training-agent.png',
    alt: '',
  },
  ch08OnboardingPath: {
    webSrc: '/images/guides/built-to-teach/web/ch08-onboarding-path.png',
    printSrc: '/images/guides/built-to-teach/print/ch08-onboarding-path.png',
    alt: '',
  },
  ch09ChangeManagement: {
    webSrc: '/images/guides/built-to-teach/web/ch09-change-management.png',
    printSrc: '/images/guides/built-to-teach/print/ch09-change-management.png',
    alt: '',
  },
  ch10TrainingSignals: {
    webSrc: '/images/guides/built-to-teach/web/ch10-training-signals.png',
    printSrc: '/images/guides/built-to-teach/print/ch10-training-signals.png',
    alt: '',
  },
  ch11PromptCards: {
    webSrc: '/images/guides/built-to-teach/web/ch11-prompt-cards.png',
    printSrc: '/images/guides/built-to-teach/print/ch11-prompt-cards.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

export const BSE_GUIDE_COVERS = {
  ch01FlyingBlind: {
    webSrc: '/images/guides/built-to-see/web/ch01-flying-blind.png',
    printSrc: '/images/guides/built-to-see/print/ch01-flying-blind.png',
    alt: '',
  },
  ch03DashboardAnatomy: {
    webSrc: '/images/guides/built-to-see/web/ch03-dashboard-anatomy.png',
    printSrc: '/images/guides/built-to-see/print/ch03-dashboard-anatomy.png',
    alt: '',
  },
  ch04LeadingLagging: {
    webSrc: '/images/guides/built-to-see/web/ch04-leading-lagging.png',
    printSrc: '/images/guides/built-to-see/print/ch04-leading-lagging.png',
    alt: '',
  },
  ch05DashboardLibrary: {
    webSrc: '/images/guides/built-to-see/web/ch05-dashboard-library.png',
    printSrc: '/images/guides/built-to-see/print/ch05-dashboard-library.png',
    alt: '',
  },
  ch07KeepingHonest: {
    webSrc: '/images/guides/built-to-see/web/ch07-keeping-honest.png',
    printSrc: '/images/guides/built-to-see/print/ch07-keeping-honest.png',
    alt: '',
  },
  ch08AlertsThresholds: {
    webSrc: '/images/guides/built-to-see/web/ch08-alerts-thresholds.png',
    printSrc: '/images/guides/built-to-see/print/ch08-alerts-thresholds.png',
    alt: '',
  },
  ch09NervousSystemScreen: {
    webSrc: '/images/guides/built-to-see/web/ch09-nervous-system-screen.png',
    printSrc: '/images/guides/built-to-see/print/ch09-nervous-system-screen.png',
    alt: '',
  },
  ch10ThreeStages: {
    webSrc: '/images/guides/built-to-see/web/ch10-three-stages.png',
    printSrc: '/images/guides/built-to-see/print/ch10-three-stages.png',
    alt: '',
  },
  ch11PromptCards: {
    webSrc: '/images/guides/built-to-see/web/ch11-prompt-cards.png',
    printSrc: '/images/guides/built-to-see/print/ch11-prompt-cards.png',
    alt: '',
  },
} as const satisfies Record<string, GuideChapterCover>

/** Merge shared slot paths with chapter-specific alt text. */
export function withAlt(
  cover: GuideChapterCover,
  alt: string,
): GuideChapterCover {
  return { ...cover, alt }
}
