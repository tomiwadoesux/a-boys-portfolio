import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const writingType = defineType({
  name: "writing",
  title: "Writings",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "The main title of your writing",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description:
        "URL-friendly version of the title (auto-generated from title)",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary that appears in listings (optional)",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Engineering", value: "engineering" },
          { title: "Thoughts", value: "thoughts" },
          { title: "Tutorial", value: "tutorial" },
          { title: "Personal", value: "personal" },
        ],
      },
      description: "Category for this writing",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Display this writing prominently on the homepage",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        // Regular text blocks
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        // Image block
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption displayed below the image",
            },
            {
              name: "attribution",
              type: "string",
              title: "Attribution",
              description: "Photo credit or source",
            },
          ],
        },
        // Dinkus (decorative break)
        {
          type: "object",
          name: "dinkus",
          title: "Dinkus (Section Break)",
          icon: () => "***",
          fields: [
            {
              name: "style",
              type: "string",
              title: "Style",
              options: {
                list: [
                  { title: "Stars (* * *)", value: "stars" },
                  { title: "Dots (• • •)", value: "dots" },
                  { title: "Dashes (— — —)", value: "dashes" },
                  { title: "Wave (～～～)", value: "wave" },
                ],
                layout: "radio",
              },
              initialValue: "stars",
            },
          ],
          preview: {
            select: {
              style: "style",
            },
            prepare({ style }) {
              const symbols = {
                stars: "* * *",
                dots: "• • •",
                dashes: "— — —",
                wave: "～～～",
              };
              return {
                title: symbols[style as keyof typeof symbols] || "* * *",
                subtitle: "Section Break",
              };
            },
          },
        },
        // Blockquote bar (enhanced blockquote)
        {
          type: "object",
          name: "blockquoteBar",
          title: "Blockquote Bar",
          icon: () => "❝",
          fields: [
            {
              name: "quote",
              type: "text",
              title: "Quote",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              type: "string",
              title: "Author",
              description: "Optional - who said this quote?",
            },
            {
              name: "source",
              type: "string",
              title: "Source",
              description: "Optional - where is this quote from?",
            },
          ],
          preview: {
            select: {
              quote: "quote",
              author: "author",
            },
            prepare({ quote, author }) {
              return {
                title:
                  quote?.substring(0, 60) + (quote?.length > 60 ? "..." : ""),
                subtitle: author ? `— ${author}` : "Quote",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Add tags to help categorize this writing",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "Meta Title",
          description:
            "Title for search engines (defaults to post title if empty)",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          rows: 3,
          description:
            "Description for search engines (defaults to excerpt if empty)",
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "ogImage",
          type: "image",
          title: "Social Share Image",
          description: "Image that appears when shared on social media",
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date (Oldest First)",
      name: "publishedDateAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      featured: "featured",
      category: "category",
    },
    prepare({ title, publishedAt, featured, category }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "Draft";
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${category || "Uncategorized"} • ${date}`,
      };
    },
  },
});
