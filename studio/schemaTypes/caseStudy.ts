import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study (Evidence)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      description: 'The result-driven headline. Brand Rule: End with a period.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientIndustry',
      title: 'Client Industry',
      type: 'string',
      description: 'The industry of the client (e.g., Commercial Plumbing, Financial Services).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillarFocus',
      title: 'Primary Pillar Focus',
      type: 'string',
      description: 'Which of the 7 pillars was the core focus of this build.',
      options: {
        list: [
          'Websites & E-commerce', 'CRM & Lead Tracking', 'Automation', 
          'AI Assistants', 'Content Systems', 'Team Training', 'Dashboards & Reporting'
        ],
      },
    }),
    defineField({
      name: 'metrics',
      title: 'Before & After Metrics',
      type: 'array',
      description: 'Specific numbers showing the transformation we achieved.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'metricLabel', 
              title: 'Metric Label', 
              type: 'string', 
              description: 'e.g., Lead Conversion Rate, Reporting Time'
            }),
            defineField({
              name: 'beforeValue', 
              title: 'Before', 
              type: 'string',
              description: 'e.g., 1.2%, 14 hours'
            }),
            defineField({
              name: 'afterValue', 
              title: 'After', 
              type: 'string',
              description: 'e.g., 4.5%, Automated (0 hours)'
            }),
          ],
          preview: {
            select: {
              title: 'metricLabel',
              before: 'beforeValue',
              after: 'afterValue'
            },
            prepare(selection) {
              const {title, before, after} = selection
              return {
                title: title,
                subtitle: `Before: ${before} | After: ${after}`
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'body',
      title: 'Case Study Content',
      type: 'blockContent',
      description: 'Brand Rule: Structure as The Problem, What We Built, and The Result. Keep it factual and direct.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientIndustry',
    },
  },
})