import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsItem',
  title: 'Business News',
  type: 'document',
  groups: [
    {name: 'core', title: 'Core Setup', default: true},
    {name: 'content', title: 'Article Content'},
    {name: 'seo', title: 'Targeting'}, 
  ],
  fields: [
    // --- 1. CORE SETUP ---
    defineField({
      name: 'title',
      title: 'Headline (H1)',
      type: 'string',
      group: 'core',
      description: 'Maximum 90 characters to perfectly fit the frontend grid design.',
      // HARD LOCK ADDED HERE
      validation: (Rule) => Rule.required().max(90).error('Title MUST be 90 characters or less. A longer title will break the website layout.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'core',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'revenuePhase',
      title: 'Target Phase / Category',
      type: 'string',
      group: 'core',
      description: 'Which filter category does this belong to?',
      options: {
        list: [
          { title: 'The Monthly Horizon (Featured Top)', value: 'horizon' },
          { title: 'Phase 01: Grinding & Growing', value: 'phase1' },
          { title: 'Phase 02: Scaling Operations', value: 'phase2' },
          { title: 'Phase 03: Seeing Clearly', value: 'phase3' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicePillar',
      title: 'Service Pillar',
      type: 'string',
      group: 'core',
      description: 'Which core service does this news relate to?',
      options: {
        list: [
          'Websites & E-commerce', 'CRM & Lead Tracking', 'Automation', 
          'AI Assistants', 'Content Systems', 'Team Training', 'Dashboards & Reporting'
        ],
      },
    }),

    // --- 2. ARTICLE CONTENT ---
    defineField({
      name: 'mainImage',
      title: 'Main Visual',
      type: 'image',
      group: 'content',
      description: 'The unique image for this specific news item. Required for the grid cards.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
   // Inside newsItem.ts, update the body field to look exactly like this:
   defineField({
    name: 'body',
    title: 'Body Content',
    type: 'newsBlockContent', 
    group: 'content',
    description: 'The full 500-800 word article. The first paragraph is used as the preview.',
  }),
    defineField({
      name: 'sourceUrl',
      title: 'Source Link',
      type: 'url',
      group: 'content',
      description: 'Optional link to the original external source.',
    }),

    // --- 3. TARGETING ---
    defineField({
      name: 'targetPersona',
      title: 'Target Personas',
      type: 'array',
      group: 'seo',
      description: 'Select the specific persona this piece is written for.',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: '--- LEVEL 0: MASTER ---', value: 'HEADER_MASTER' },
          { title: 'The Visionary Operator (Full Ecosystem)', value: 'The Visionary Operator' },
          
          { title: '--- LEVEL A: PHASE PERSONAS (MARKETING) ---', value: 'HEADER_PHASE' },
          { title: 'The Builder (Phase 01)', value: 'The Builder' },
          { title: 'The Scaler (Phase 02)', value: 'The Scaler' },
          { title: 'The Controller (Phase 03)', value: 'The Controller' },
          
          { title: '--- LEVEL B: PILLAR PERSONAS (SPECIFIC SOLUTIONS) ---', value: 'HEADER_PILLAR' },
          { title: 'P1: The Authority Seeker', value: 'The Authority Seeker' },
          { title: 'P2: The Revenue Protector', value: 'The Revenue Protector' },
          { title: 'P3: The Leverage Seeker', value: 'The Leverage Seeker' },
          { title: 'P4: The Cognitive Scaler', value: 'The Cognitive Scaler' },
          { title: 'P5: The Omnipresence Seeker', value: 'The Omnipresence Seeker' },
          { title: 'P6: The Adoption Seeker', value: 'The Adoption Seeker' },
          { title: 'P7: The Executive Navigator', value: 'The Executive Navigator' }
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      phase: 'revenuePhase',
    },
    prepare(selection) {
      const {title, media, phase} = selection;
      return {
        title: title,
        subtitle: phase ? `Category: ${phase.toUpperCase()}` : 'No category set',
        media: media,
      };
    },
  },
});