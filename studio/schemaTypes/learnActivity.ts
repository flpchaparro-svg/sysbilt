import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'learnActivity',
  title: 'Learn activity',
  type: 'object',
  fields: [
    defineField({
      name: 'template',
      title: 'Template',
      type: 'string',
      options: {
        list: [
          {title: 'True or false', value: 'trueFalse'},
          {title: 'Multiple choice', value: 'multipleChoice'},
          {title: 'Match (link the best answer)', value: 'match'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prompt',
      title: 'Prompt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'explainAfter',
      title: 'Explain after',
      type: 'text',
      rows: 3,
      description: 'Shown once they submit. Plain teaching, not a scold.',
    }),
    defineField({
      name: 'trueFalseCorrect',
      title: 'Correct answer is true',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => parent?.template !== 'trueFalse',
    }),
    defineField({
      name: 'options',
      title: 'Choices',
      type: 'array',
      hidden: ({parent}) => parent?.template !== 'multipleChoice',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'isCorrect', title: 'This is the correct answer', type: 'boolean', initialValue: false}),
          ],
          preview: {select: {title: 'label', subtitle: 'key'}},
        }),
      ],
    }),
    defineField({
      name: 'matchItems',
      title: 'Cases to match',
      type: 'array',
      hidden: ({parent}) => parent?.template !== 'match',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'prompt', title: 'Case / idea', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
            defineField({name: 'correctKey', title: 'Correct choice key', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'prompt', subtitle: 'correctKey'}},
        }),
      ],
    }),
    defineField({
      name: 'matchChoices',
      title: 'Answer choices',
      type: 'array',
      hidden: ({parent}) => parent?.template !== 'match',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'key'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'prompt', subtitle: 'template'},
  },
})
