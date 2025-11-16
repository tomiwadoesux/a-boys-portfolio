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
      name: 'showDetailPage',
      title: 'Show Detail Page',
      type: 'boolean',
      description: 'If enabled, clicking this project opens the detail page. If disabled, it goes directly to the website.',
      initialValue: true,
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
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'Your role in this project (e.g., Solo Design Engineer, Frontend Developer, Designer)',
      validation: (Rule) => Rule.required(),
      initialValue: 'Design Engineer',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which projects appear (lower numbers appear first). E.g., 1, 2, 3...',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'infoSections',
      title: 'Info Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'infoSection',
          title: 'Info Section',
          fields: [
            defineField({
              name: 'media',
              title: 'Media (Image or Video)',
              type: 'object',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Media Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Image', value: 'image' },
                      { title: 'Video', value: 'video' },
                    ],
                    layout: 'radio',
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  hidden: ({ parent }) => parent?.type !== 'image',
                  validation: (Rule) => Rule.custom((value, context) => {
                    if (context.parent.type === 'image' && !value) {
                      return 'Image is required when media type is Image'
                    }
                    return true
                  }),
                }),
                defineField({
                  name: 'video',
                  title: 'Video',
                  type: 'file',
                  options: {
                    accept: 'video/*',
                  },
                  hidden: ({ parent }) => parent?.type !== 'video',
                  validation: (Rule) => Rule.custom((value, context) => {
                    if (context.parent.type === 'video' && !value) {
                      return 'Video is required when media type is Video'
                    }
                    return true
                  }),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text Content',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              type: 'media.type',
              text: 'text',
            },
            prepare({ type, text }) {
              return {
                title: type === 'image' ? '🖼️ Image Section' : '🎬 Video Section',
                subtitle: text?.substring(0, 50) || 'No text',
              }
            },
          },
        },
      ],
      description: 'Add image or video sections with accompanying text content',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
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
      media: 'desktopImage',
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
