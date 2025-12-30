import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ArticleFooter from "@/app/components/ArticleFooter";
import imageUrlBuilder from "@sanity/image-url";

// Image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Custom components for rendering Portable Text
const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          className="w-full rounded-lg"
        />
        {value.caption && (
          <figcaption className="text-sm text-gray-500 mt-3 text-center italic">
            {value.caption}
          </figcaption>
        )}
        {value.attribution && (
          <figcaption className="text-xs text-gray-400 mt-1 text-center">
            Photo by {value.attribution}
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
            {symbols[value.style] || "* * *"}
          </span>
        </div>
      );
    },
    blockquoteBar: ({ value }) => (
      <blockquote className="border-l-4 border-[#4447A9] pl-6 my-12">
        <p className="italic text-base md:text-xl lg:text-2xl text-[#111]">
          "{value.quote}"
        </p>
        {(value.author || value.source) && (
          <footer className="text-sm text-gray-600 mt-4">
            {value.author && <span>— {value.author}</span>}
            {value.source && <span>, {value.source}</span>}
          </footer>
        )}
      </blockquote>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-[#111]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-[#111]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-[#111]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold mt-6 mb-3 text-[#111]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-6">{children}</p>,
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
      <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-[#4447A9]">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 my-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 my-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
};

export async function generateStaticParams() {
  const writings = await client.fetch(
    `*[_type == "writing"]{ "slug": slug.current }`
  );
  return writings.map((writing) => ({ slug: writing.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const writing = await client.fetch(
    `*[_type == "writing" && slug.current == $slug][0]{
      title,
      excerpt,
      seo
    }`,
    { slug }
  );

  if (!writing) return {};

  return {
    title: writing.seo?.metaTitle || writing.title,
    description: writing.seo?.metaDescription || writing.excerpt || "",
  };
}

export default async function WritingPage({ params }) {
  const { slug } = await params;

  const writing = await client.fetch(
    `*[_type == "writing" && slug.current == $slug][0]{
      _id,
      title,
      publishedAt,
      readingTime,
      category,
      content,
      excerpt
    }`,
    { slug }
  );

  if (!writing) {
    notFound();
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <main className="px-7 md:px-20 lg:px-40 pt-16 md:pt-20 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-16">
        <div className="flex flex-col mb-2 gap-1">
          <div className="flex flex-row gap-2 items-center text-[#4447A9] text-sm font-mono">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4447A9"
              width="16"
              height="16"
              className="icon small"
              aria-hidden="true"
            >
              <path d="M5.99805 3C9.48787 3 12.3812 5.55379 12.9112 8.8945C14.0863 7.72389 15.7076 7 17.498 7H21.998V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V13H8.99805C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805ZM19.998 9H17.498C15.0128 9 12.998 11.0147 12.998 13.5V14H15.498C17.9833 14 19.998 11.9853 19.998 9.5V9ZM5.99805 5H3.99805V6C3.99805 8.76142 6.23662 11 8.99805 11H10.998V10C10.998 7.23858 8.75947 5 5.99805 5Z" />
            </svg>
            <span className="italic">Planted On</span>
            <span>{formatDate(writing.publishedAt)}</span>
            {writing.readingTime && (
              <>
                <span>•</span>
                <span>{writing.readingTime} min read</span>
              </>
            )}
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111]">
          {writing.title}
        </h1>
        {writing.excerpt && (
          <p className="mt-2 text-sm opacity-40 italic leading-relaxed">
            {writing.excerpt}
          </p>
        )}
      </header>

      <article className="space-y-8 text-lg leading-relaxed text-[#333]">
        <PortableText
          value={writing.content}
          components={portableTextComponents}
        />

        <ArticleFooter authorName="Ayotomiwa" />
      </article>

      <div className="mt-16">
        <Link
          href="/writings"
          className="text-[#4447A9] hover:underline flex items-center gap-2 font-mono text-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Writings
        </Link>
      </div>
    </main>
  );
}
