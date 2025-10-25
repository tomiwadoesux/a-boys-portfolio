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
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'Auto-detected city of the visitor',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'Auto-detected region/state of the visitor',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'Auto-detected country of the visitor',
    }),
    defineField({
      name: 'stampImage',
      title: 'Stamp Image',
      type: 'image',
      description: 'AI-generated stamp image for this entry',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'stampGenerating',
      title: 'Stamp Generating',
      type: 'boolean',
      description: 'Whether the stamp is currently being generated',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'Website Link',
      type: 'url',
      description: 'Optional website or social media link',
    }),
    defineField({
      name: 'reactions',
      title: 'Reactions',
      type: 'number',
      description: 'Number of likes/reactions',
      initialValue: 0,
    }),
    defineField({
      name: 'isFirstFromCountry',
      title: 'First From Country',
      type: 'boolean',
      description: 'Badge: First signer from this country',
      initialValue: false,
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
