import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe what the image shows. Required for accessibility and SEO.',
          validation: (Rule) => Rule.required().error('Alt text is required'),
        },
        {name: 'caption', type: 'string', title: 'Caption'},
      ],
    }),
    defineArrayMember({ type: 'code' }),
    defineArrayMember({ type: 'table' }),
    defineArrayMember({ type: 'youtube' }),
    defineArrayMember({
      name: 'divider',
      type: 'object',
      title: 'Divider (Dots)',
      fields: [
        {
          name: 'style',
          type: 'string',
          title: 'Style',
          initialValue: 'dots',
          readOnly: true,
          description: 'Adds the 3 minimal dots divider to the page.'
        }
      ]
    }),
    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Callout Box',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              { title: 'Info (Soft Glow)', value: 'info' },
              { title: 'Warning (High Contrast)', value: 'warning' }
            ],
            layout: 'radio'
          },
          initialValue: 'info'
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'text',
          type: 'text',
          title: 'Text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    // NEW: Call To Action Button
    defineArrayMember({
      name: 'cta',
      type: 'object',
      title: 'Call to Action Button',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'url',
          type: 'url',
          title: 'Link URL',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'variant',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              { title: 'Primary (Solid Red)', value: 'primary' },
              { title: 'Secondary (Ghost Border)', value: 'secondary' }
            ],
            layout: 'radio'
          },
          initialValue: 'primary'
        }
      ]
    })
  ],
})
