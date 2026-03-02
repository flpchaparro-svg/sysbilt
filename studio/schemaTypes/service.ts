import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service Tier',
  type: 'document',
  groups: [
    {name: 'core', title: 'Core Details', default: true},
    {name: 'copy', title: 'Sales Copy'},
    {name: 'logistics', title: 'Pricing & Ops'},
  ],
  fields: [
    // --- CORE DETAILS ---
    defineField({
      name: 'serviceName',
      title: 'Service Name',
      type: 'string',
      group: 'core',
      description: 'e.g., The Local Velocity System or The Growth Concierge',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Parent Pillar',
      type: 'string',
      group: 'core',
      description: 'Which of the 7 pillars does this belong to?',
      options: {
        list: [
          'Pillar 1: Websites & E-commerce',
          'Pillar 2: CRM & Lead Tracking',
          'Pillar 3: Automation',
          'Pillar 4: AI Assistants',
          'Pillar 5: Content Systems',
          'Pillar 6: Team Training',
          'Pillar 7: Dashboards & Reporting'
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'systemPhase',
      title: 'System Phase',
      type: 'string',
      group: 'core',
      description: 'Drives the frontend color theme (Phase 01 = Red, Phase 02 = Gold, Phase 03 = White/Black).',
      options: {
        list: [
          {title: 'Phase 01: Get Clients', value: 'Phase 01'},
          {title: 'Phase 02: Scale Faster', value: 'Phase 02'},
          {title: 'Phase 03: See Clearly', value: 'Phase 03'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // --- SALES COPY ---
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
      group: 'copy',
      description: 'e.g., A complete lead-generation machine in 7 days. Brand Rule: End with a period.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'promise',
      title: 'The Promise',
      type: 'text',
      group: 'copy',
      description: 'What we say to the buyer in plain language. No jargon.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theirPain',
      title: 'Their Pain',
      type: 'text',
      group: 'copy',
      description: 'The bleeding neck problem. Brand Rule: Always name the pain before offering the fix.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whoBuysIt',
      title: 'Who Buys It',
      type: 'text',
      group: 'copy',
      description: 'The specific type of business or person.',
      validation: (Rule) => Rule.required(),
    }),

    // --- PRICING & OPS ---
    defineField({
      name: 'sprintLength',
      title: 'Sprint Length',
      type: 'string',
      group: 'logistics',
      description: 'e.g., 7 DAYS, 14 DAYS, BESPOKE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'setupFee',
      title: 'Setup Fee',
      type: 'string',
      group: 'logistics',
      description: 'e.g., $2,500 – $4,000 AUD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'retainer',
      title: 'Retainer',
      type: 'string',
      group: 'logistics',
      description: 'e.g., $150/mo (hosting, SSL, security)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keyTools',
      title: 'Key Tools',
      type: 'array',
      group: 'logistics',
      description: 'Internal tech stack reference. Type a tool and press Enter.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'leadsTo',
      title: 'Leads To (Upsell Path)',
      type: 'string',
      group: 'logistics',
      description: 'The natural next step. e.g., Pillar 2: Capture Core',
    }),
  ],
  preview: {
    select: {
      title: 'serviceName',
      subtitle: 'pillar',
    },
  },
})