import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'learnLesson',
  title: 'Learn lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{type: 'learnCourse'}],
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'unlockAfterDays',
      title: 'Unlock after days',
      type: 'number',
      description: 'Blank or 0 means the lesson is open as soon as they have the course. Counted from first entitlement date.',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'youtube',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [defineArrayMember({type: 'learnActivity'})],
    }),
  ],
  orderings: [
    {
      title: 'Course order',
      name: 'courseOrder',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', order: 'order'},
    prepare: ({title, subtitle, order}) => ({
      title: title || 'Untitled lesson',
      subtitle: [order != null ? `Lesson ${order}` : null, subtitle].filter(Boolean).join(' · '),
    }),
  },
})
