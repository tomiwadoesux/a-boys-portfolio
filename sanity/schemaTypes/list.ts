import { defineField, defineType } from 'sanity'

export const listType = defineType({
  name: 'list',
  title: 'List',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'The list item content',
    }),
    defineField({
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
      description: 'Mark this item as completed (will be shown with strikethrough)',
      initialValue: false,
    }),
    defineField({
      name: 'completedDate',
      title: 'Completed Date',
      type: 'string',
      description: 'Date when this was completed (format: DD.MMM.YYYY)',
      hidden: ({ document }) => !document?.completed,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      completed: 'completed',
    },
    prepare({ title, completed }) {
      return {
        title: completed ? `✓ ${title}` : title,
        subtitle: completed ? 'Completed' : 'Active',
      }
    },
  },
})
