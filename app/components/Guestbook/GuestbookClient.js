"use client";

import { useState } from "react";
import GuestbookForm from "./GuestbookForm";
import GuestbookEntry from "./GuestbookEntry";
import Pagination from "./Pagination";

export default function GuestbookClient({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const entriesPerPage = 9;

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      // Submit to Sanity
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEntry = await response.json();

        // Add to local state (will show after approval if you set approved: false in API)
        setEntries([newEntry, ...entries]);

        alert("Thank you for signing the guestbook! Your entry is pending approval.");
      } else {
        alert("Failed to submit entry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting guestbook entry:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = entries.slice(startIndex, endIndex);

  return (
    <div className="px-16 lg:px-56 py-12">
      <GuestbookForm onSubmit={handleFormSubmit} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Recent Entries ({entries.length})
        </h2>

        {currentEntries.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEntries.map((entry) => (
              <GuestbookEntry
                key={entry._id}
                name={entry.name}
                message={entry.message}
                country={entry.country}
                link={entry.link}
                date={entry.date}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No entries yet. Be the first to sign the guestbook!
          </p>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage < totalPages}
            hasPrevPage={currentPage > 1}
          />
        )}
      </div>
    </div>
  );
}
