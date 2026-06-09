import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'guideBlockContent',
  title: 'Guide block content',
  type: 'array',
  description:
    "Formatting Tricks for Headings: Type '1/ ' before a heading for a Brutalist Dark Circle number. Type '1// ' before a heading for a Soft UX Cream Badge number.",
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
      name: 'sectionCover',
      type: 'object',
      title: 'Section cover',
      fields: [
        {name: 'sectionNumber', type: 'string', title: 'Section number'},
        {name: 'sectionTitle', type: 'string', title: 'Section title'},
        {name: 'sectionIntro', type: 'text', title: 'Section intro'},
      ],
    }),
    defineArrayMember({
      name: 'calloutBox',
      type: 'object',
      title: 'Callout box',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Label',
          initialValue: 'How we do it',
        },
        {name: 'body', type: 'text', title: 'Body'},
      ],
    }),
    defineArrayMember({
      name: 'darkQuote',
      type: 'object',
      title: 'Dark quote',
      fields: [{name: 'body', type: 'text', title: 'Body'}],
    }),
    defineArrayMember({
      name: 'bulletCard',
      type: 'object',
      title: 'Bullet card',
      fields: [
        {
          name: 'items',
          type: 'array',
          title: 'Items',
          of: [{type: 'string'}],
        },
      ],
    }),
    defineArrayMember({
      name: 'checklistGroup',
      type: 'object',
      title: 'Checklist group',
      fields: [
        {name: 'categoryTitle', type: 'string', title: 'Category title'},
        {
          name: 'categoryColour',
          type: 'string',
          title: 'Category colour',
          options: {
            list: [
              {title: 'Red', value: 'red'},
              {title: 'Gold', value: 'gold'},
              {title: 'Black', value: 'black'},
            ],
            layout: 'radio',
          },
          initialValue: 'black',
        },
        {
          name: 'items',
          type: 'array',
          title: 'Items',
          of: [{type: 'string'}],
        },
      ],
    }),
    defineArrayMember({
      name: 'contrastDemo',
      type: 'object',
      title: 'Contrast demo',
      fields: [
        {name: 'failLabel', type: 'string', title: 'Fail label'},
        {name: 'failText', type: 'string', title: 'Fail text'},
        {name: 'convertLabel', type: 'string', title: 'Convert label'},
        {name: 'convertText', type: 'string', title: 'Convert text'},
      ],
    }),
    defineArrayMember({
      name: 'imagePlaceholder',
      type: 'object',
      title: 'Image',
      description:
        'Upload an image here. Aspect ratio controls the frame. Leave the image empty to show a layout placeholder only.',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Describe the image for accessibility (and when the image fails to load).',
            },
          ],
        },
        {
          name: 'ratio',
          type: 'string',
          title: 'Aspect ratio',
          description:
            'Placeholder only — shown before an image is uploaded. Once uploaded, the live guide sizes the frame from the image file itself; this field is ignored.',
          options: {
            list: [
              {title: '16:9', value: '16:9'},
              {title: '4:3', value: '4:3'},
              {title: '1:1', value: '1:1'},
              {title: '3:4', value: '3:4'},
              {title: '9:16', value: '9:16'},
            ],
            layout: 'dropdown',
          },
        },
        {name: 'caption', type: 'string', title: 'Caption'},
      ],
      preview: {
        select: {
          media: 'image',
          caption: 'caption',
          ratio: 'ratio',
        },
        prepare({media, caption, ratio}) {
          return {
            title: caption?.trim() || `Image (${ratio || '16:9'})`,
            subtitle: caption?.trim() ? ratio || '16:9' : undefined,
            media,
          }
        },
      },
    }),
  ],
})