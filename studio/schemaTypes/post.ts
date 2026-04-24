import {defineField, defineType} from 'sanity'

// Custom SEO Slug Generator
function customSlugify(input: string): string {
  const stopWords = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with', 'to', 'of', 'for', 'is'];
  const words = input.toLowerCase().replace(/[^\w\s-]/g, '').split(/\s+/);
  const filtered = words.filter(word => !stopWords.includes(word) && word.length > 0);
  return filtered.slice(0, 7).join('-'); // Up to 7 words for more distinctive slugs (how/why/what kept)
}

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
      description: 'The main headline. Brand Rule: No periods at the end. No exclamation marks. Problem-first or Command style.',
      validation: (Rule) => Rule.custom((title) => {
        if (!title) return true;
        if (title.trim().endsWith('.')) return 'Brand Rule: Titles must NOT end with a period.';
        if (title.includes('!')) return 'Brand Rule: No exclamation marks allowed in titles.';
        if (title.includes('—')) return 'Brand Rule: No em-dashes in titles. Use a colon or comma.';
        return true;
      }).required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'core',
      description: 'Click "Generate" to create a short, SEO-friendly URL.',
      options: { 
        source: 'title', 
        maxLength: 96,
        slugify: customSlugify
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: '🌟 Featured Insight (High Converter)',
      type: 'boolean',
      group: 'core',
      description: 'Turn this on to pin this post to the top of the blog.',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Featured Grid Position',
      type: 'number',
      group: 'core',
      description: 'Select where this card appears in the featured posts grid on /blog.',
      hidden: ({document}) => !document?.isFeatured,
      options: {
        list: [
          { title: 'Position 1 (Featured lead — big card)', value: 1 },
          { title: 'Position 2 (Tall Card)', value: 2 },
          { title: 'Position 3 (Tall Card)', value: 3 },
          { title: 'Position 4 (Tall Card)', value: 4 },
          { title: 'Position 5 (Half Card)', value: 5 },
          { title: 'Position 6 (Half Card)', value: 6 },
          { title: 'Position 7 (Half Card)', value: 7 },
        ],
      },
      validation: (Rule) => Rule.custom(async (order, context) => {
        if (!context.document?.isFeatured) return true;
        if (!order) return 'Please select a position from the dropdown.';

        // Live check if another post is already using this position
        const client = context.getClient({ apiVersion: '2024-03-01' });
        const id = context.document._id.replace('drafts.', '');

        // Query to find if any OTHER published or draft post has this exact order number
        const query = `*[_type == "post" && isFeatured == true && featuredOrder == $order && !(_id in [$id, "drafts." + $id])][0]{ title }`;
        const existingPost = await client.fetch(query, { order, id });

        if (existingPost) {
          return {
            message: `Position ${order} is already taken by "${existingPost.title}". If you publish, this post will overwrite it on the live grid.`,
            level: 'warning' // Soft warning: allows you to replace it if you want to
          };
        }

        return true;
      }),
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
      validation: (Rule) => Rule.custom((blocks: any) => {
        if (!blocks || !Array.isArray(blocks)) return true;
        // Extract all text from the PortableText blocks
        const text = blocks
          .filter(block => block._type === 'block' && block.children)
          .map(block => block.children.map((child: any) => child.text).join(''))
          .join(' ');
        
        const exclamations = (text.match(/!/g) || []).length;
        const emDashes = (text.match(/—/g) || []).length;
        const totalViolations = exclamations + emDashes;

        if (totalViolations > 6) {
          return {
            message: `Brand Voice Warning: You used ${totalViolations} exclamation marks/em-dashes. Keep it punchy. Aim for under 6.`,
            level: 'warning'
          };
        }
        return true;
      }),
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
      title: 'Target Persona',
      type: 'string',
      group: 'seo',
      description: 'Which persona is this post written for? Pick one.',
      options: {
        list: [
          {title: 'The Visionary Operator', value: 'The Visionary Operator'},
          {title: 'The Builder', value: 'The Builder'},
          {title: 'The Scaler', value: 'The Scaler'},
          {title: 'The Controller', value: 'The Controller'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'internalLinkDestination',
      title: 'Internal Link Routing',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          {title: 'Websites & E-commerce', value: '/pillar1'},
          {title: 'CRM & Lead Tracking', value: '/pillar2'},
          {title: 'Automation', value: '/pillar3'},
          {title: 'AI Assistants', value: '/pillar4'},
          {title: 'Content Systems', value: '/pillar5'},
          {title: 'Team Training', value: '/pillar6'},
          {title: 'Dashboards & Reporting', value: '/pillar7'},
          {title: 'The System (Overview)', value: '/system'},
          {title: 'Homepage', value: '/'},
          {title: 'Contact', value: '/contact'},
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
      description: 'Manually select 1-3 specific articles to show at the bottom. Our frontend logic will auto-fill the rest if you pick less than 3.',
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
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Publish date is required'),
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