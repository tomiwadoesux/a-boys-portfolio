"use client";

import { useEffect, useState } from "react";
import CopyIcon from "./CopyIcon";

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@ayotomcs.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[#f9f9f9] p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 0.3s forwards" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Send an Email</h2>
        <p className="mb-8 text-gray-600">
          Would you like to send an email to{" "}
          <span className="font-semibold text-[#4447A9]">hello@ayotomcs.me</span>?
          <button
            onClick={handleCopy}
            className="ml-2 inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 transition-colors"
          >
            <CopyIcon className="w-4 h-4 text-gray-500" />
          </button>
          {copied && <span className="ml-2 text-sm text-green-600">Copied!</span>}
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-transparent text-[#4447A9] border-2 border-[#4447A9] rounded-lg hover:bg-[#4447A9]/10 transition-all font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-[#4447A9] text-white rounded-lg hover:bg-[#3a3d93] transition-all font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
