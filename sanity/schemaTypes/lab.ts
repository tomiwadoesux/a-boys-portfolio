import { defineField, defineType } from 'sanity'

export const labType = defineType({
  name: 'lab',
  title: 'Lab Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description for the card',
    }),
    defineField({
      name: 'height',
      title: 'Card Height',
      type: 'string',
      description: 'Height in pixels (e.g., 320px, 280px)',
      validation: (Rule) => Rule.required(),
      placeholder: '320px',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which cards appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'height',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `Height: ${subtitle}`,
      }
    },
  },
})
