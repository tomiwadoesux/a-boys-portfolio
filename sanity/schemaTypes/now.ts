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
  ],
  preview: {
    select: {
      title: 'date',
      subtitle: 'text',
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle?.substring(0, 60) + (subtitle?.length > 60 ? '...' : ''),
      }
    },
  },
})
