import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study (Proof)',
  type: 'document',
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'problems', title: 'The Problem'},
    {name: 'solutions', title: 'The Fix'},
    {name: 'metrics', title: 'The Evidence'},
    {name: 'visuals', title: 'Visual Evidence'}, // <-- NEW GROUP
  ],
  fields: [
    // --- OVERVIEW ---
    defineField({
      name: 'clientName',
      title: 'Client / Project Name',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientIndustry',
      title: 'Client Industry',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'pillarFocus',
      title: 'Primary Pillar Focus',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'terminalLines',
      title: 'Terminal Audit Log',
      type: 'array',
      group: 'overview',
      of: [{type: 'string'}],
    }),

    // --- PROBLEMS ---
    defineField({
      name: 'problemItems',
      title: 'Problem Items',
      type: 'array',
      group: 'problems',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'metric', type: 'string', title: 'Metric'}),
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'desc', type: 'text', title: 'Description'}),
            defineField({name: 'impact', type: 'string', title: 'Business Impact'}),
          ]
        }
      ]
    }),

    // --- SOLUTIONS ---
    defineField({
      name: 'solutionItems',
      title: 'Solution Items',
      type: 'array',
      group: 'solutions',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Action Taken'}),
            defineField({name: 'what', type: 'string', title: 'What we did'}),
            defineField({name: 'why', type: 'text', title: 'Why it matters'}),
          ]
        }
      ]
    }),

    // --- EVIDENCE METRICS ---
    defineField({
      name: 'evidenceMetrics',
      title: 'Final Evidence Metrics',
      type: 'array',
      group: 'metrics',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'val', type: 'number', title: 'Number Value'}),
            defineField({name: 'prefix', type: 'string', title: 'Prefix (e.g., + or $)'}),
            defineField({name: 'suffix', type: 'string', title: 'Suffix (e.g., s or %)'}),
            defineField({name: 'note', type: 'string', title: 'Subtext note'}),
          ]
        }
      ]
    }),

    // --- VISUAL EVIDENCE (NEW) ---
    defineField({
      name: 'beforeImage',
      title: 'Before Image (Slider)',
      type: 'image',
      group: 'visuals',
      description: 'Used for the Before & After comparison slider. Leave blank if not needed.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image (Slider)',
      type: 'image',
      group: 'visuals',
      description: 'Used for the Before & After comparison slider. Leave blank if not needed.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'General Evidence Photos',
      type: 'array',
      group: 'visuals',
      description: 'A grid of standard photos (e.g., dashboard screenshots, analytics).',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'clientIndustry',
    },
  },
})