import { defineField, defineType } from 'sanity'

export const typewriterMessageType = defineType({
  name: 'typewriterMessage',
  title: 'Typewriter Messages',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
      description: 'A loading message to display in the typewriter effect',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this message in rotation',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Optional: Display order (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Active Status',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'message',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, isActive, order }) {
      return {
        title: `${isActive ? '✓' : '⏸'} ${title}`,
        subtitle: `Order: ${order}`,
      }
    },
  },
})
