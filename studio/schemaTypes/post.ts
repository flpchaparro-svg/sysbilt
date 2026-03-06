import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Insight (Blog Post)', 
  type: 'document',
  groups: [
    {name: 'core', title: 'Core Setup', default: true},
    {name: 'content', title: 'Article Content'},
    {name: 'seo', title: 'SEO & Targeting'}, 
    {name: 'marketing', title: 'Marketing & Conversion'},
    {name: 'meta', title: 'Meta & Author'},
  ],
  fields: [
    // --- 1. CORE SETUP ---
    defineField({
      name: 'title',
      title: 'Article Title (H1)',
      type: 'string',
      group: 'core',
      description: 'The main headline. Brand Rule: End with a period. No exclamation marks. Problem-first or Command style.',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'core',
      description: 'Click "Generate" to create the URL from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: '🌟 Featured Insight (High Converter)',
      type: 'boolean',
      group: 'core',
      description: 'Turn this on to pin this post to the top of the blog as a primary, high-converting case study or insight.',
      initialValue: false,
    }),
    defineField({
      name: 'servicePillar',
      title: 'Service Pillar',
      type: 'string',
      group: 'core',
      description: 'Which core service does this article relate to? This changes the color theme of the page.',
      options: {
        list: [
          'Websites & E-commerce', 'CRM & Lead Tracking', 'Automation', 
          'AI Assistants', 'Content Systems', 'Team Training', 'Dashboards & Reporting'
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Internal Tags & Technologies',
      type: 'array',
      group: 'core',
      description: 'Type a keyword (e.g., HubSpot, Make.com, B2B) and hit Enter. This links related posts together.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    // --- 2. ARTICLE CONTENT ---
    defineField({
      name: 'mainImage',
      title: 'Main Visual',
      type: 'image',
      group: 'content',
      description: 'The hero image at the top of the article. Brand Rule: No stock imagery. Real tools, real screens, real results.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
      group: 'content',
      description: 'Brand Rule: Short sentences (5-15 words). One idea per paragraph. Use "you" relentlessly. No passive voice.',
    }),

    // --- 3. SEO & TARGETING ---
    defineField({
      name: 'focusKeyword',
      title: 'Focus SEO Keyword',
      type: 'string',
      group: 'seo',
      description: 'What exactly is the user Googling to find this? (e.g., "HubSpot audit Sydney").',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override (Optional)',
      type: 'string',
      group: 'seo',
      description: 'If your main article title is too long for Google, write a punchy, keyword-rich 60-character title here.',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for Google.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'seo',
      description: 'The 160-character snippet that appears on Google under the title. Sell the click!',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'businessPhase',
      title: 'Client Business Phase',
      type: 'string',
      group: 'seo',
      description: 'At what stage of the journey is the reader?',
      options: {
        list: ['Phase 01: Get Clients', 'Phase 02: Scale Faster', 'Phase 03: See Clearly'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'targetPersona',
      title: 'Target Personas',
      type: 'array',
      group: 'seo',
      description: 'Select the specific persona this piece is written for. Do not mix Phase and Pillar personas in the same piece.',
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
    defineField({
      name: 'internalLinkDestination',
      title: 'Internal Link Routing',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          {title: 'Pillar 1: Websites', value: '/pillar1'},
          {title: 'Pillar 2: CRM', value: '/pillar2'},
          {title: 'Pillar 3: Automation', value: '/pillar3'},
          {title: 'Pillar 4: AI Assistants', value: '/pillar4'},
          {title: 'Pillar 5: Content Systems', value: '/pillar5'},
          {title: 'Pillar 6: Team Training', value: '/pillar6'},
          {title: 'Pillar 7: Dashboards', value: '/pillar7'},
        ],
      },
    }),

    // --- 4. MARKETING & CONVERSION ---
    defineField({
      name: 'contentType',
      title: 'Content Format',
      type: 'string',
      group: 'marketing',
      description: 'What kind of article is this? Helps with filtering the vault later.',
      options: {
        list: ['System Log (Standard)', 'Case Study / Proof', 'Technical Guide', 'Opinion / Strategy'],
      },
      initialValue: 'System Log (Standard)',
    }),
    defineField({
      name: 'customCTA',
      title: 'Custom Call-To-Action Text',
      type: 'string',
      group: 'marketing',
      description: 'Override the default form button. Brand Rule: Use action words like "Audit My CRM", not "Learn More".',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Read Next (Sticky Links)',
      type: 'array',
      group: 'marketing',
      description: 'Manually select 2-3 specific articles to show at the bottom of this post to keep them reading.',
      of: [{type: 'reference', to: {type: 'post'}}],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      group: 'marketing',
      description: 'Upload a specific 1200x630 image for when this is shared on LinkedIn or Slack so the cropping is perfect.',
    }),

    // --- 5. META & AUTHOR ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: {type: 'author'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      group: 'meta',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', pillar: 'servicePillar' },
    prepare(selection) {
      const {pillar} = selection
      return {...selection, subtitle: `${pillar || 'UNASSIGNED'}`}
    },
  },
})