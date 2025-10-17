"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PlaygroundCards({ cards = [] }) {
  const gridRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    // Animate cards on mount
    if (cardRefs.current.length > 0) {
      gsap.fromTo(
        cardRefs.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [cards]);

  return (
    <div
      ref={gridRef}
      className="masonry-container w-full px-56 p-4"
    >
      {cards.map((card, idx) => (
        <div
          key={card.id || idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className="masonry-item bg-gray-300 rounded-lg overflow-hidden cursor-pointer mb-4"
          style={{ height: card.height || 'auto' }}
        >
          {/* Replace with your card content */}
          {card.image && (
            <img
              src={card.image}
              alt={card.title || 'Card image'}
              className="w-full h-full object-cover"
            />
          )}
          {card.title && (
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-gray-800">{card.title}</h3>
              {card.description && (
                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
              )}
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        .masonry-container {
          column-count: 3;
          column-gap: 16px;
        }

        .masonry-item {
          break-inside: avoid;
          display: inline-block;
          width: 100%;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .masonry-container {
            column-count: 2;
          }
        }

        @media (max-width: 640px) {
          .masonry-container {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
}
