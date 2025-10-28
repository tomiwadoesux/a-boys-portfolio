"use client";

import { useEffect } from "react";

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleYes = () => {
    window.location.href = "mailto:hello@ayotomcs.me";
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Send Email</h2>
        <p className="mb-6">
          Do you want to send a mail to{" "}
          <span className="font-semibold">hello@ayotomcs.me</span>?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black border-2 border-black rounded hover:bg-gray-100 transition-colors font-medium"
          >
            No
          </button>
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
