import { defineField, defineType } from 'sanity'

export const visitorType = defineType({
  name: 'visitor',
  title: 'Visitors',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timestamp',
      title: 'Visit Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'Hashed for privacy',
    }),
  ],
  orderings: [
    {
      title: 'Most Recent',
      name: 'timestampDesc',
      by: [{ field: 'timestamp', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      city: 'city',
      country: 'country',
      timestamp: 'timestamp',
    },
    prepare({ city, country, timestamp }) {
      const location = city ? `${city}, ${country}` : country
      const date = new Date(timestamp).toLocaleString()
      return {
        title: location,
        subtitle: date,
      }
    },
  },
})
