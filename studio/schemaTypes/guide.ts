import {defineArrayMember, defineField, defineType} from 'sanity'

const SERVICE_PILLAR_OPTIONS = [
  {title: 'Website & E-commerce', value: 'Website & E-commerce'},
  {title: 'CRM & Lead Tracking', value: 'CRM & Lead Tracking'},
  {title: 'Automation', value: 'Automation'},
  {title: 'AI Assistants', value: 'AI Assistants'},
  {title: 'Content Systems', value: 'Content Systems'},
  {title: 'Team Training', value: 'Team Training'},
  {title: 'Dashboards & Reporting', value: 'Dashboards & Reporting'},
  {title: 'Get Clients', value: 'Get Clients'},
  {title: 'Scale Faster', value: 'Scale Faster'},
  {title: 'See Clearly', value: 'See Clearly'},
  {title: 'The System', value: 'The System'},
] as const

const BUSINESS_PHASE_OPTIONS = [
  {title: 'Phase 01', value: 'Phase 01'},
  {title: 'Phase 02', value: 'Phase 02'},
  {title: 'Phase 03', value: 'Phase 03'},
  {title: 'All Phases', value: 'All Phases'},
] as const

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicePillar',
      title: 'Service Pillars & Categories',
      type: 'array',
      description: 'Check one or more. If multiple are checked, the frontend will automatically group them under a phase (e.g. Get Clients).',
      of: [{type: 'string'}],
      options: {
        list: [...SERVICE_PILLAR_OPTIONS],
      },
    }),
    defineField({
      name: 'businessPhase',
      title: 'Business phase',
      type: 'string',
      options: {
        list: [...BUSINESS_PHASE_OPTIONS],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverLegend',
      title: 'Cover legend',
      type: 'string',
      description: 'Text at the bottom of the cover page.',
      initialValue: 'For Australian businesses who know their website should be doing more',
    }),
    defineField({
      name: 'targetPersonas',
      title: 'Target Personas',
      type: 'array',
      description:
        'Select the specific persona document(s) this guide is tagged for. Backend / analytics only — not shown on the published guide.',
      of: [
        {
          type: 'reference',
          to: [{type: 'persona'}],
        },
      ],
    }),
    defineField({
      name: 'includeCtaPage',
      title: 'Include CTA end page',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA title',
      type: 'string',
      hidden: ({document}) => document?.includeCtaPage === false,
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA description',
      type: 'text',
      hidden: ({document}) => document?.includeCtaPage === false,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA button text',
      type: 'string',
      hidden: ({document}) => document?.includeCtaPage === false,
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA link',
      type: 'string',
      description: 'Full URL or path (e.g. https://… or /contact).',
      hidden: ({document}) => document?.includeCtaPage === false,
    }),
    defineField({
      name: 'ctaLegend',
      title: 'CTA page footer legend',
      type: 'text',
      description: 'Small print below the CTA button on the final page.',
      hidden: ({document}) => document?.includeCtaPage === false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus keyword',
      type: 'string',
    }),
    defineField({
      name: 'pages',
      title: 'A4 Pages',
      type: 'array',
      description: 'One entry = one physical PDF page. Paginate content explicitly for html2canvas A4 export.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'guidePage',
          title: 'A4 Page',
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'guideBlockContent',
            }),
          ],
          preview: {
            select: {
              blocks: 'content',
              pageKey: '_key',
            },
            prepare({blocks, pageKey}, ctx) {
              const count = Array.isArray(blocks) ? blocks.length : 0
              const subtitle = count ? `${count} block${count === 1 ? '' : 's'}` : 'Empty page'
              const doc = (ctx as {document?: {pages?: {_key?: string}[]}} | undefined)?.document
              const pages = doc?.pages
              let title = 'A4 Page'
              if (Array.isArray(pages) && pageKey) {
                const i = pages.findIndex((p) => p?._key === pageKey)
                if (i >= 0) title = `Page ${i + 2}`
              }
              return {title, subtitle}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled guide',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})