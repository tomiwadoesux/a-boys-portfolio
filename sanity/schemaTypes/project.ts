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
      name: 'desktopImage',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image for desktop view',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image for mobile view',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Alternative text for the images (for accessibility)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desktopVideo',
      title: 'Desktop Video',
      type: 'file',
      description: 'Optional video for desktop view (MP4 format recommended)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'mobileVideo',
      title: 'Mobile Video',
      type: 'file',
      description: 'Optional video for mobile view (MP4 format recommended)',
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
      name: 'date',
      title: 'Project Date/Year',
      type: 'number',
      description: 'Year the project was completed (e.g., 2010, 2024). More recent dates appear first.',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'date', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tech',
      media: 'desktopImage',
      featured: 'featured',
      date: 'date',
    },
    prepare({ title, subtitle, media, featured, date }) {
      return {
        title: `${title}${featured ? ' ⭐' : ''} (${date})`,
        subtitle,
        media,
      }
    },
  },
})
