import { defineField, defineType } from 'sanity'

export const screenType = defineType({
  name: 'screen',
  title: 'Screen',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name or title of the screen/video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desktopVideo',
      title: 'Desktop Video',
      type: 'file',
      description: 'Video for desktop view (MP4 format recommended)',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileVideo',
      title: 'Mobile Video',
      type: 'file',
      description: 'Video for mobile view (MP4 format recommended)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'URL associated with this screen',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which screens appear (lower numbers appear first). E.g., 1, 2, 3...',
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
      title: 'name',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: `${order}. ${title}`,
      }
    },
  },
})
