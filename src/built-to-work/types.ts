export type BtwBlock =
  | { type: 'sectionEyebrow'; text: string }
  | { type: 'h2'; text: string; label?: string; closing?: boolean; divider?: boolean }
  | { type: 'h3'; text: string; label?: string }
  | { type: 'h4'; text: string }
  | { type: 'p'; text: string; lead?: boolean }
  | { type: 'pullQuote'; text: string; emphasis?: string }
  | { type: 'realPicture'; title?: string; leadIn?: string; paragraphs: string[] }
  | { type: 'realPictureLead'; text: string }
  | { type: 'realPictureBox'; text: string; title?: string; first?: boolean; last?: boolean }
  | { type: 'diagram'; id: string; caption: string }
  | { type: 'image'; id: string; caption: string }
  | { type: 'fireDrill'; title?: string; tag?: string; steps: (string | { title: string; body: string })[] }
  | { type: 'checklist'; title?: string; tag?: string; items: string[] }
  | { type: 'promptCard'; title: string; body: string }
  | { type: 'glossary'; title?: string; intro?: string; continued?: boolean; entries: { term: string; definition: string }[] }
  | { type: 'glossaryIntro'; title?: string; intro?: string }
  | { type: 'glossaryEntry'; term: string; definition: string }
  | { type: 'featureCard'; title: string; what: string; does: string; use: string; next: string }
  | { type: 'featureIntro' }
  | { type: 'bullets'; items: string[] }
  | { type: 'contents'; items: { num: number; title: string; page?: number }[] }
  | { type: 'chapterOpener'; num: number; title: string; subtitle?: string; imageSrc?: string; imageAlt?: string; imageCaption?: string }
  | { type: 'spacer' }

export type BtwPageLayout = 'flow' | 'contents' | 'opener'

export type BtwPage = {
  layout?: BtwPageLayout
  blocks: BtwBlock[]
}

export const BTW_META = {
  slug: 'built-to-work',
  title: 'Built to Work',
  subtitle: 'How websites really work now, and why the businesses that adapt pull ahead.',
  coverLegend: 'For Australian businesses who know their website should be doing more',
  badgeLabel: 'The System',
  badgeLink: '/system',
  seoTitle: 'Built to Work — How Modern Websites Run Your Business',
  seoDescription:
    'A deep guide to lead-generation websites: ownership, conversion, features, automation, SEO, and growing your site as a business hub. Free from SYSBILT.',
} as const
