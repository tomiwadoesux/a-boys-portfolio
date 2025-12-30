import Link from "next/link";
import { client } from "@/sanity/lib/client";

export default async function WritingsList() {
  // Fetch writings from Sanity
  const writings = await client.fetch(
    `*[_type == "writing"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      category,
      featured,
      readingTime
    }`
  );

  // Group writings by year
  const writingsByYear = writings.reduce((acc, writing) => {
    const year = new Date(writing.publishedAt).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(writing);
    return acc;
  }, {});

  // Convert to array and sort by year descending
  const groupedWritings = Object.entries(writingsByYear)
    .map(([year, items]) => ({ year, items }))
    .sort((a, b) => b.year.localeCompare(a.year));

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      .toUpperCase();
  };

  return (
    <section className="px-7 md:px-20 lg:px-56 pb-">
      {groupedWritings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">
            No writings yet. Create one in Sanity Studio!
          </p>
        </div>
      ) : (
        groupedWritings.map((group) => (
          <div key={group.year} className="mb-16">
            <h2 className="text-sm font-mono mb-6 opacity-60">{group.year}</h2>
            <div className="flex flex-col">
              {group.items.map((item) => (
                <div key={item._id} className="group mb-6">
                  <Link href={`/writings/${item.slug}`} className="block">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1">
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

                          <h6 className="text-xs pb-1.5 ">
                            {" "}
                            <span className="italic "> Planted On</span>{" "}
                            <span className="text-[#4447A9]">
                              {" "}
                              {formatDate(item.publishedAt)}{" "}
                            </span>
                          </h6>
                        </div>

                        <h4 className="text-sm md:text-base group-hover:text-[#4447A9] transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <div className="pb-1">
                        <span className="flex items-center gap-1 text-xs md:text-sm text-[#4447A9] group-hover:underline">
                          Read
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3">
                      <svg
                        className="w-full h-px"
                        viewBox="0 0 100 1"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="0"
                          y1="0.5"
                          x2="100"
                          y2="0.5"
                          stroke="black"
                          strokeWidth="0.7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
