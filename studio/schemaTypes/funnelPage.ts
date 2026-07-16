import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Private /go/{slug} sales pages. Prices live only in authored copy fields
 * (ctaLabel, priceBlock text), never as numeric CMS fields.
 */
export default defineType({
  name: 'funnelPage',
  title: 'Funnel Page',
  type: 'document',
  groups: [
    {name: 'core', title: 'Core', default: true},
    {name: 'cta', title: 'CTAs'},
    {name: 'copy', title: 'Copy'},
    {name: 'faq', title: 'FAQ'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'core',
      description: 'Studio label and stamped HTML title base, e.g. Website Speed Fix',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'core',
      options: {source: 'title', maxLength: 64},
      description: 'Becomes /go/{slug}. Batch 1: speed-fix, missed-call, google-profile.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'h1',
      title: 'H1',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sub',
      title: 'Sub',
      type: 'text',
      rows: 3,
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ctaMode',
      title: 'CTA mode',
      type: 'string',
      group: 'cta',
      initialValue: 'buy',
      options: {
        list: [
          {title: 'Buy (Stripe primary, scheduler quiet)', value: 'buy'},
          {title: 'Call (scheduler primary)', value: 'call'},
          {title: 'Dual (price option cards)', value: 'dual'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary CTA label',
      type: 'string',
      group: 'cta',
      description: 'Includes the price as authored text, e.g. Fix my website, $1,200',
      hidden: ({parent}) => parent?.ctaMode === 'dual',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const mode = (context.parent as {ctaMode?: string} | undefined)?.ctaMode
          if (mode === 'dual') return true
          return value ? true : 'Required unless CTA mode is dual'
        }),
    }),
    defineField({
      name: 'stripeUrl',
      title: 'Stripe Payment Link URL',
      type: 'url',
      group: 'cta',
      hidden: ({parent}) => parent?.ctaMode === 'dual',
    }),
    defineField({
      name: 'schedulerUrl',
      title: 'Scheduler URL',
      type: 'url',
      group: 'cta',
      description: 'HubSpot 15-minute meeting link (quiet secondary on buy mode).',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      group: 'cta',
      hidden: ({parent}) => parent?.ctaMode !== 'call',
    }),
    defineField({
      name: 'secondaryUrl',
      title: 'Secondary URL',
      type: 'url',
      group: 'cta',
      hidden: ({parent}) => parent?.ctaMode !== 'call',
    }),
    defineField({
      name: 'priceOptions',
      title: 'Price options (dual mode)',
      type: 'array',
      group: 'cta',
      hidden: ({parent}) => parent?.ctaMode !== 'dual',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'priceOption',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Card label', validation: (R) => R.required()}),
            defineField({
              name: 'ctaLabel',
              type: 'string',
              title: 'Button label (includes price text)',
              validation: (R) => R.required(),
            }),
            defineField({name: 'stripeUrl', type: 'url', title: 'Stripe Payment Link', validation: (R) => R.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'ctaLabel'}},
        }),
      ],
    }),

    defineField({
      name: 'proofBlock',
      title: 'Proof strip',
      type: 'blockContent',
      group: 'copy',
    }),
    defineField({
      name: 'problemHeading',
      title: 'Problem heading',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problemBody',
      title: 'Problem body',
      type: 'blockContent',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alternativesHeading',
      title: 'Other ways heading',
      type: 'string',
      group: 'copy',
    }),
    defineField({
      name: 'alternativesBody',
      title: 'Other ways body',
      type: 'blockContent',
      group: 'copy',
    }),
    defineField({
      name: 'fixHeading',
      title: 'Fix heading',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fixBullets',
      title: 'Fix bullets',
      type: 'array',
      group: 'copy',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'includedHeading',
      title: 'Included heading',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'included',
      title: 'Included items',
      type: 'array',
      group: 'copy',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'priceHeading',
      title: 'Price block heading',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceBlock',
      title: 'Price block body',
      type: 'blockContent',
      group: 'copy',
      description: 'Authored price and promise copy. No numeric price fields.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guaranteeLine',
      title: 'Guarantee line',
      type: 'text',
      rows: 3,
      group: 'copy',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', type: 'string', title: 'Question', validation: (R) => R.required()}),
            defineField({name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (R) => R.required()}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
    defineField({
      name: 'finalHeading',
      title: 'Final CTA heading',
      type: 'string',
      group: 'copy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerLine',
      title: 'Footer line (optional override)',
      type: 'string',
      group: 'copy',
      description:
        'Leave blank to use the locked default: SYSBILT, Sydney. ABN 56 115 228 020. Privacy. Terms.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', mode: 'ctaMode'},
    prepare({title, subtitle, mode}) {
      return {
        title: title || 'Untitled funnel page',
        subtitle: subtitle ? `/go/${subtitle} · ${mode || 'buy'}` : mode || 'buy',
      }
    },
  },
})
