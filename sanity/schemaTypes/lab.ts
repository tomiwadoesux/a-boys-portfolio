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
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image displayed on the card',
    }),
    defineField({
      name: 'link',
      title: 'Website Link',
      type: 'url',
      description: 'Link to the project website (optional)',
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
      media: 'image',
    },
    prepare({ title, subtitle, order, media }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `Height: ${subtitle}`,
        media,
      }
    },
  },
})
