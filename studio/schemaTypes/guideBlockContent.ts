import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'guideBlockContent',
  title: 'Guide block content',
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
            ],
            layout: 'radio',
          },
          initialValue: 'red',
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
  ],
})
