"use client";

export default function GuestbookEntry({
  name,
  message,
  country,
  link = null,
  date,
}) {
  const displayDate =
    date instanceof Date
      ? date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-gray-900 hover:text-[#4447A9] transition-colors"
          >
            {name}
          </a>
        ) : (
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        )}
        <span className="text-xs text-gray-500">{displayDate}</span>
      </div>

      <p className="text-gray-700 mb-3 leading-relaxed">{message}</p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm text-gray-600">{country}</span>
        </div>
      </div>
    </div>
  );
}
