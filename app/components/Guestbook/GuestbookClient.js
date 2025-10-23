"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GuestbookForm from "./GuestbookForm";
import GuestbookEntry from "./GuestbookEntry";
import Pagination from "./Pagination";

export default function GuestbookClient({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const entriesPerPage = 9;

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(
          errorData.error || errorData.message || "Failed to submit entry"
        );
      }

      const newEntry = await response.json();
      console.log("Entry submitted successfully:", newEntry);

      // Add to local state
      setEntries([newEntry, ...entries]);

      // Refresh the page to show the new entry
      router.refresh();

      alert(
        "Thank you for signing! Your signature will be added shortly with a custom stamp."
      );
    } catch (error) {
      console.error("Error submitting guestbook:", error);
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
    <div className="px-10 md:px-20 lg:px-20 pt-10">
      <GuestbookForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

      <div className="mt-12">
        <div className="text-sm text-left font-bold text-gray-500">
          RECENT ENTRIES ({entries.length})
        </div>
        <svg width="100%" height="1" className="mb-4 mt-2">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="1" />
        </svg>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage < totalPages}
            hasPrevPage={currentPage > 1}
          />
        )}
      </div>
      {currentEntries.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
          {currentEntries.map((entry) => (
            <GuestbookEntry
              key={entry._id}
              entryId={entry._id}
              name={entry.name}
              message={entry.message}
              city={entry.city}
              country={entry.country}
              link={entry.link}
              date={entry.date}
              stampImage={entry.stampImage}
              stampGenerating={entry.stampGenerating}
              reactions={entry.reactions}
              isFirstFromCountry={entry.isFirstFromCountry}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">
          No entries yet. Be the first to sign the guestbook!
        </p>
      )}
    </div>
  );
}
