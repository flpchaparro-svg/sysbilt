import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'toolkitItem',
  title: 'Toolkit Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tool name',
      type: 'string',
      description: 'The tool as people search for it, e.g. ChatGPT, Claude, Perplexity.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Sets the page URL, e.g. /toolkit/chatgpt.',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Optional. Not shown on cards at launch, kept for later.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'For accessibility and SEO, e.g. "ChatGPT logo".',
        }),
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One line on what it gives the owner, outcome first. No full stop.',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The primary filter. What the tool is for.',
      options: {
        list: [
          {title: 'Chat & research', value: 'chat-research'},
          {title: 'Writing & content', value: 'writing-content'},
          {title: 'Images & design', value: 'images-design'},
          {title: 'Video', value: 'video'},
          {title: 'Voice & audio', value: 'voice-audio'},
          {title: 'Meetings & notes', value: 'meetings-notes'},
          {title: 'Coding', value: 'coding'},
          {title: 'Automation & agents', value: 'automation-agents'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phase',
      title: 'Phase (optional)',
      type: 'string',
      description: 'Not used as a launch filter. Reserved for the wider directory later.',
      options: {
        list: [
          {title: 'Get Clients', value: 'get-clients'},
          {title: 'Scale Faster', value: 'scale-faster'},
          {title: 'See Clearly', value: 'see-clearly'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'pricingModel',
      title: 'Pricing model',
      type: 'string',
      description: 'Useful metadata and an optional secondary filter.',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Freemium', value: 'freemium'},
          {title: 'Free trial', value: 'free-trial'},
          {title: 'Paid', value: 'paid'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'picks',
      title: 'Editorial badges',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Your picks. Choose any. Used to drive clicks toward tools we rate.',
      options: {
        list: [
          {title: 'Our pick', value: 'our-pick'},
          {title: 'Best value', value: 'best-value'},
          {title: 'Best for small business', value: 'best-for-small-business'},
        ],
      },
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      description:
        'Drives the disclosure on the page. Affiliate and Referral show a "we may earn a commission" note. Reader discount shows a "you get a discount" note. Standard link shows nothing.',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Affiliate', value: 'affiliate'},
          {title: 'Referral', value: 'referral'},
          {title: 'Reader discount', value: 'discount'},
          {title: 'Standard link', value: 'standard'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Sign-up link',
      type: 'url',
      description: 'The affiliate, referral, or plain sign-up URL.',
      validation: (Rule) => Rule.required().uri({scheme: ['https'], allowRelative: false}),
    }),
    defineField({
      name: 'promoCode',
      title: 'Promo or referral code (optional)',
      type: 'string',
      description:
        'For tools that give a code rather than a tracked link. Shown on the page if present.',
    }),
    defineField({
      name: 'summary',
      title: 'What it is',
      type: 'text',
      rows: 3,
      description: 'Plain English, two or three sentences. What the tool actually is.',
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'benefits',
      title: 'How it helps your business',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Concrete uses for an owner, e.g. "Draft client quotes in minutes". One per line.',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Surfaces the tool at the top of the index.',
      initialValue: false,
    }),
    defineField({
      name: 'orderRank',
      title: 'Manual order',
      type: 'number',
      description: 'Lower numbers show first. Optional.',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO title',
      type: 'string',
      description: 'Optional. Falls back to the tool name if blank.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO description',
      type: 'text',
      rows: 2,
      description: 'Optional. Falls back to the summary if blank.',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Featured, then manual order',
      name: 'featuredOrder',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'orderRank', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'category', media: 'logo'},
  },
})
