import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tech',
      title: 'Technology Stack',
      type: 'string',
      description: 'Technologies used (e.g., Next.js & GSAP)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Alternative text for the image (for accessibility)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Project Video',
      type: 'file',
      description: 'Optional video showcase (MP4 format recommended)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'URL to the live project',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this project prominently',
      initialValue: false,
    }),
    defineField({
      name: 'figcaption',
      title: 'Figure Caption',
      type: 'string',
      description: 'Short caption for the project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Detailed project description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this project appears (lower numbers appear first)',
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
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tech',
      media: 'image',
      featured: 'featured',
      order: 'order',
    },
    prepare({ title, subtitle, media, featured, order }) {
      return {
        title: `${order}. ${title}${featured ? ' ⭐' : ''}`,
        subtitle,
        media,
      }
    },
  },
})
