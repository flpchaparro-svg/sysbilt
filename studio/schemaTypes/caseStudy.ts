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
      description: 'e.g., Commercial Security, Plumbing, Finance',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillarFocus',
      title: 'Primary Pillar Focus',
      type: 'string',
      group: 'overview',
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
    }),
    defineField({
      name: 'terminalLines',
      title: 'Terminal Audit Log',
      type: 'array',
      group: 'overview',
      description: 'The green hacking text at the top. e.g., "> Audited old site... [4.2s load]"',
      of: [{type: 'string'}],
    }),

    // --- PROBLEMS ---
    defineField({
      name: 'problemItems',
      title: 'Problem Items',
      type: 'array',
      group: 'problems',
      description: 'What was broken before we started?',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title (e.g., Speed Was Killing Conversions)'}),
            defineField({name: 'metric', type: 'string', title: 'Metric (e.g., 4.2 seconds)'}),
            defineField({name: 'label', type: 'string', title: 'Label (e.g., Load Time)'}),
            defineField({name: 'desc', type: 'text', title: 'Description'}),
            defineField({name: 'impact', type: 'string', title: 'Business Impact (e.g., Lost contracts.)'}),
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
      description: 'What we actually built to fix it.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Action Taken (e.g., Domain Migration)'}),
            defineField({name: 'what', type: 'string', title: 'What we did'}),
            defineField({name: 'why', type: 'text', title: 'Why it matters to their business'}),
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
      description: 'The hard numbers at the bottom of the page.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label (e.g., Load Time)'}),
            defineField({name: 'val', type: 'number', title: 'Number Value (e.g., 0.4)'}),
            defineField({name: 'prefix', type: 'string', title: 'Prefix (e.g., + or $)'}),
            defineField({name: 'suffix', type: 'string', title: 'Suffix (e.g., s or %)'}),
            defineField({name: 'note', type: 'string', title: 'Subtext note (e.g., Was 4.2s. Now 0.4s.)'}),
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'clientIndustry',
    },
  },
})