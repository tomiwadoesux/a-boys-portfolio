# Sanity Writings CMS Guide

## Overview

Your portfolio now has a **Writings** schema in Sanity CMS that works like Medium's editor. You can create blog posts with flexible content blocks including paragraphs, images, blockquotes, lists, dinkus (section breaks), and more.

## Getting Started

### 1. Access Sanity Studio

```bash
cd /Users/mac/Documents/InPortfolio/a-boys-portfolio
npm run dev
```

Then visit: **http://localhost:3000/studio**

### 2. Create a New Writing

1. Click on **"Writings"** in the left sidebar
2. Click **"Create"** button
3. Fill in the required fields

## Schema Fields

### Basic Information

- **Title** (Required): The main title of your article
- **Slug** (Required): Auto-generated from title, creates the URL (e.g., `/writings/my-article`)
- **Excerpt**: Short summary that appears in listings (optional)
- **Published Date** (Required): When the article was published
- **Reading Time**: Estimated minutes to read (1-60)
- **Category**: Choose from Design, Engineering, Thoughts, Tutorial, or Personal
- **Featured**: Toggle to display prominently on homepage
- **Tags**: Add keywords to categorize your writing

### Content Blocks (Like Medium!)

The **Content** field supports these block types:

#### 1. **Paragraph** (Normal Text)

- Default text block
- Supports **bold**, _italic_, `code`, underline, ~~strikethrough~~
- Can add links with "Open in new tab" option

#### 2. **Headings**

- H1, H2, H3, H4 available
- Use for structuring your article

#### 3. **Blockquote Bar**

Special enhanced quote block with:

- Quote text (required)
- Author (optional)
- Source (optional)

Perfect for highlighting important quotes with attribution.

#### 4. **Lists**

- Bullet lists
- Numbered lists
- Nestable

#### 5. **Images**

Upload images with:

- **Alt text** (required - for SEO & accessibility)
- **Caption** (optional - displays below image)
- **Attribution** (optional - photo credit/source)

Images are hotspot-enabled for responsive cropping.

#### 6. **Dinkus** (Section Break)

Decorative breaks between sections. Choose from:

- `* * *` (Stars)
- `• • •` (Dots)
- `— — —` (Dashes)
- `～～～` (Wave)

#### 7. **Code Blocks**

Syntax-highlighted code with:

- Language selection (JavaScript, TypeScript, CSS, HTML, Python, etc.)
- Optional filename
- Line numbers

### SEO Settings (Collapsible)

- **Meta Title**: Custom title for search engines (max 60 chars)
- **Meta Description**: Custom description for search engines (max 160 chars)
- **Social Share Image**: Image for Twitter/Facebook shares

## Using in Your Frontend

### Example: Rendering Writings

Create a page to fetch and render Sanity writings:

```javascript
// app/writings/[slug]/page.js
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import ArticleFooter from "@/app/components/ArticleFooter";

export async function generateStaticParams() {
  const writings = await client.fetch(
    `*[_type == "writing"]{ "slug": slug.current }`
  );
  return writings.map((writing) => ({ slug: writing.slug }));
}

export default async function WritingPage({ params }) {
  const { slug } = await params;

  const writing = await client.fetch(
    `*[_type == "writing" && slug.current == $slug][0]{
      title,
      publishedAt,
      readingTime,
      category,
      content,
      "date": publishedAt
    }`,
    { slug }
  );

  if (!writing) notFound();

  return (
    <main className="px-7 md:px-20 lg:px-40 pt-24 pb-32 max-w-5xl mx-auto">
      <header className="mb-16">
        <div className="flex flex-col mb-2 gap-1">
          <div className="flex flex-row gap-2 items-center text-[#4447A9] text-sm font-mono">
            <span className="italic">Published</span>
            <span>{new Date(writing.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111]">
          {writing.title}
        </h1>
      </header>

      <article className="space-y-8 text-lg leading-relaxed text-[#333]">
        <PortableText
          value={writing.content}
          components={portableTextComponents}
        />
        <ArticleFooter authorName="Ayotomiwa" />
      </article>
    </main>
  );
}

// Custom components for rendering Portable Text
const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt}
          className="w-full rounded-lg"
        />
        {value.caption && (
          <figcaption className="text-sm text-gray-500 mt-2 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    dinkus: ({ value }) => {
      const symbols = {
        stars: "* * *",
        dots: "• • •",
        dashes: "— — —",
        wave: "～～～",
      };
      return (
        <div className="mt-16 mb-10 flex justify-center">
          <span className="text-2xl text-[#4447A9] tracking-[0.5em] font-mono leading-none">
            {symbols[value.style]}
          </span>
        </div>
      );
    },
    blockquoteBar: ({ value }) => (
      <blockquote className="border-l-4 border-[#4447A9] pl-6 my-12">
        <p className="italic text-base md:text-xl lg:text-2xl text-[#111] font-serif">
          "{value.quote}"
        </p>
        {value.author && (
          <footer className="text-sm text-gray-600 mt-2">
            — {value.author}
            {value.source && `, ${value.source}`}
          </footer>
        )}
      </blockquote>
    ),
    code: ({ value }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${value.language}`}>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 italic my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value.href}
        target={value.blank ? "_blank" : "_self"}
        rel={value.blank ? "noopener noreferrer" : ""}
        className="text-[#4447A9] hover:underline"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-3 my-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-3 my-6">{children}</ol>
    ),
  },
};
```

## ArticleFooter Component

The **ArticleFooter** component is automatically included in all writings. It displays:

- Social sharing links (Bluesky, Twitter)
- Support link
- Contact CTA
- Author signature

Simply import and use:

```javascript
import ArticleFooter from "@/app/components/ArticleFooter";

<ArticleFooter authorName="YourName" />;
```

## Tips

1. **Always add alt text to images** - It's required for accessibility and SEO
2. **Use Dinkus sparingly** - 1-2 per article maximum for section transitions
3. **Blockquote Bar vs Regular Quote** - Use Blockquote Bar for featured/important quotes
4. **Reading Time** - Estimate 200-250 words per minute
5. **Categories** - Keep consistent for better organization
6. **Featured** - Only feature your best 2-3 articles

## Next Steps

1. ✅ Sanity schema created (`writing.ts`)
2. ✅ ArticleFooter component created
3. 🔄 Update your frontend to fetch from Sanity instead of hardcoded data
4. 🔄 Install `@portabletext/react` for rendering
5. 🔄 Create image URL builder helper

Need help with any of these steps? Let me know!
