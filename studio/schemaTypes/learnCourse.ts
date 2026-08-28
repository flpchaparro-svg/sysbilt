import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'learnCourse',
  title: 'Learn course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dek',
      title: 'Dek',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'access',
      title: 'Access',
      type: 'string',
      initialValue: 'open',
      options: {
        list: [
          {title: 'Open (signed-in can take it)', value: 'open'},
          {title: 'Premium (listed, locked until entitled)', value: 'premium'},
          {title: 'Company (hidden unless invited)', value: 'company'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'released',
      title: 'Released for Learn',
      type: 'boolean',
      initialValue: true,
      description:
        'Company courses should stay unpublished in Studio. Turn this on so invitees can see the draft. Open and premium courses should be published as usual.',
    }),
    defineField({
      name: 'commentsEnabled',
      title: 'Comments on',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Catalogue order',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'priceAud',
      title: 'Price (AUD)',
      type: 'number',
      description: 'Optional. Used for Stripe Checkout on premium courses. Leave empty to grant by email only.',
      hidden: ({parent}) => parent?.access !== 'premium',
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe price id',
      type: 'string',
      description: 'Optional. If set, Checkout uses this Price instead of priceAud.',
      hidden: ({parent}) => parent?.access !== 'premium',
    }),
    defineField({
      name: 'inviteEmails',
      title: 'Company invite emails',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      hidden: ({parent}) => parent?.access !== 'company',
    }),
    defineField({
      name: 'grantEmails',
      title: 'Granted emails',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'People who can take a premium or company course without paying. Match Google account email.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'access', media: 'cover'},
  },
})
