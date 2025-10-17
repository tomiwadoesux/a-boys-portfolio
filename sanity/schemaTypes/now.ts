import { defineField, defineType } from 'sanity'

export const nowType = defineType({
  name: 'now',
  title: 'Now',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Date in format: DD.MMM.YYYY (e.g., 17.Oct.2025)',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'What you\'re doing or thinking about right now',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this entry appears (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Order, Descending',
      name: 'orderDesc',
      by: [{ field: 'order', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'date',
      subtitle: 'text',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle?.substring(0, 60) + (subtitle?.length > 60 ? '...' : ''),
      }
    },
  },
})
