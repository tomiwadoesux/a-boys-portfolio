"use client";

import Link from "next/link";

const ArrowLeftIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Pagination({ currentPage, hasNextPage, hasPrevPage }) {
  const baseUrl = "/guestbook";

  return (
    <>
      <nav className="pagination-simple" aria-label="Pagination">
        {hasPrevPage ? (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="pagination-arrow prev"
            aria-label="Previous Page"
            title="Previous Page"
          >
            <ArrowLeftIcon size={24} />
          </Link>
        ) : (
          <div className="placeholder-arrow" aria-hidden="true" />
        )}

        <span className="page-indicator">Page {currentPage}</span>

        {hasNextPage ? (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="pagination-arrow next"
            aria-label="Next Page"
            title="Next Page"
          >
            <ArrowRightIcon size={24} />
          </Link>
        ) : (
          <div className="placeholder-arrow" aria-hidden="true" />
        )}
      </nav>

      <style jsx>{`
        .pagination-simple {
          --indicator-text-light: hsl(0, 0%, 55%);
          --indicator-text-dark: hsl(0, 0%, 65%);
          --indicator-text: var(--indicator-text-light);

          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2rem auto 3rem;
          max-width: 300px;
          gap: 1rem;
          font-size: 0.9rem;
        }

        @media (prefers-color-scheme: dark) {
          .pagination-simple {
            --indicator-text: var(--indicator-text-dark);
          }
        }

        .pagination-arrow {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: #1a1a1a;
          text-decoration: none;
          border-radius: 4px;
          transition: color 0.2s ease-out;
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          box-sizing: border-box;
        }

        @media (prefers-color-scheme: dark) {
          .pagination-arrow {
            color: #e5e5e5;
          }
        }

        .pagination-arrow:hover,
        .pagination-arrow:focus-visible {
          color: #404040;
        }

        @media (prefers-color-scheme: dark) {
          .pagination-arrow:hover,
          .pagination-arrow:focus-visible {
            color: #a3a3a3;
          }
        }

        .pagination-arrow:focus-visible {
          outline: 2px solid #404040;
          outline-offset: 2px;
        }

        @media (prefers-color-scheme: dark) {
          .pagination-arrow:focus-visible {
            outline-color: #a3a3a3;
          }
        }

        .page-indicator {
          color: var(--indicator-text);
          font-weight: 500;
          flex-shrink: 1;
          text-align: center;
          white-space: nowrap;
        }

        .placeholder-arrow {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .pagination-simple {
            max-width: 60%;
            gap: 0.5rem;
            font-size: 0.85rem;
          }
          .pagination-arrow,
          .placeholder-arrow {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </>
  );
}
