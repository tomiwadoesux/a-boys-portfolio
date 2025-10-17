import { defineField, defineType } from 'sanity'

export const guestbookType = defineType({
  name: 'guestbook',
  title: 'Guestbook',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Website Link',
      type: 'url',
      description: 'Optional website or social media link',
    }),
    defineField({
      name: 'date',
      title: 'Date Posted',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Show this entry on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest First',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'message',
      country: 'country',
      approved: 'approved',
    },
    prepare({ title, subtitle, country, approved }) {
      return {
        title: `${approved ? '✓' : '⏸'} ${title}`,
        subtitle: `${country} - ${subtitle?.substring(0, 50)}${subtitle?.length > 50 ? '...' : ''}`,
      }
    },
  },
})
