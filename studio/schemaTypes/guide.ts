import {defineArrayMember, defineField, defineType} from 'sanity'

const SERVICE_PILLAR_OPTIONS = [
  {title: 'General Overview', value: 'General Overview'},
  {title: 'Pillar 1: WEBSITES & E-COMMERCE', value: 'Pillar 1: WEBSITES & E-COMMERCE'},
  {title: 'Pillar 2: CRM & LEAD TRACKING', value: 'Pillar 2: CRM & LEAD TRACKING'},
  {title: 'Pillar 3: AUTOMATION', value: 'Pillar 3: AUTOMATION'},
  {title: 'Pillar 4: AI ASSISTANTS', value: 'Pillar 4: AI ASSISTANTS'},
  {title: 'Pillar 5: CONTENT SYSTEMS', value: 'Pillar 5: CONTENT SYSTEMS'},
  {title: 'Pillar 6: TEAM TRAINING', value: 'Pillar 6: TEAM TRAINING'},
  {title: 'Pillar 7: DASHBOARDS & REPORTING', value: 'Pillar 7: DASHBOARDS & REPORTING'},
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
      title: 'Service pillar',
      type: 'string',
      options: {
        list: [...SERVICE_PILLAR_OPTIONS],
        layout: 'dropdown',
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
            },
            prepare({blocks}) {
              const count = Array.isArray(blocks) ? blocks.length : 0
              return {
                title: 'A4 Page',
                subtitle: count ? `${count} block${count === 1 ? '' : 's'}` : 'Empty page',
              }
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