"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GuestbookForm from "./GuestbookForm";
import GuestbookEntry from "./GuestbookEntry";
import Pagination from "./Pagination";

export default function GuestbookClient({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const router = useRouter();

  // Determine entries per page based on screen size
  const getEntriesPerPage = () => {
    if (screenSize === "phone") return 12; // phone: show more cards
    if (screenSize === "tablet") return 9; // tablet
    return 8; // desktop
  };

  const entriesPerPage = getEntriesPerPage();

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("phone");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        alert(`Error: ${errorData.error || errorData.message || "Failed to submit entry"}. Please try again.`);
        return;
      }

      const result = await response.json();
      console.log("Entry submitted successfully:", result);

      // Add to local state (don't include statusMessage in the entry)
      const { statusMessage, success, ...newEntry } = result;
      setEntries([newEntry, ...entries]);

      // Trigger stamp generation (client-side fire-and-forget)
      // We do this client-side because Vercel serverless functions often kill 
      // background tasks (setTimeout) once the response is sent.
      if (newEntry._id && newEntry.country) {
        console.log("Triggering stamp generation for:", newEntry._id);
        fetch('/api/generate-stamp', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ entryId: newEntry._id, country: newEntry.country })
        }).then(res => {
            console.log("Stamp generation trigger response:", res.status);
        }).catch(err => {
            console.error("Error triggering stamp generation:", err);
        });
      }

      // Refresh the page to show the new entry
      router.refresh();

      alert(
        statusMessage || "Thank you for signing! Your signature will be added shortly with a custom stamp."
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
    <div className="px-7 md:px-20 lg:px-20 pt-10">
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
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {currentEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
          {currentEntries.map((entry, index) => (
            <div
              key={entry._id}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <GuestbookEntry
                entryId={entry._id}
                name={entry.name}
                message={entry.message}
                city={entry.city}
                country={entry.country}
                region={entry.region}
                link={entry.link}
                date={entry.date}
                stampImage={entry.stampImage}
                reactions={entry.reactions}
                isFirstFromCountry={entry.isFirstFromCountry}
              />
            </div>
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
