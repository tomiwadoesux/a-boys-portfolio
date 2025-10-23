"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LabCards({ cards = [] }) {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef.current;
    if (!container) return;

    const layoutMasonry = () => {
      const items = Array.from(container.children);
      const gap = 16;
      const containerWidth = container.offsetWidth;

      // Determine number of columns based on screen width
      let columnCount = 3;
      if (window.innerWidth <= 640) {
        columnCount = 1;
      } else if (window.innerWidth <= 1024) {
        columnCount = 2;
      }

      const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
      const columnHeights = new Array(columnCount).fill(0);

      items.forEach((item, index) => {
        // Find the shortest column
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

        // Calculate position
        const x = shortestColumnIndex * (columnWidth + gap);
        const y = columnHeights[shortestColumnIndex];

        // Apply position
        item.style.position = 'absolute';
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.width = `${columnWidth}px`;

        // Update column height
        columnHeights[shortestColumnIndex] += item.offsetHeight + gap;
      });

      // Set container height
      container.style.height = `${Math.max(...columnHeights)}px`;
    };

    // Initial layout
    layoutMasonry();

    // Re-layout on window resize
    const handleResize = () => {
      layoutMasonry();
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver to handle dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      layoutMasonry();
    });

    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [isClient, cards]);

  return (
    <div className="lab-container w-full px-20 lg:px-56 p-4">
      <div ref={containerRef} className="lab-grid">
        {cards.map((card, idx) => (
          <div
            key={card.id || idx}
            className="lab-card bg-[#D9D9D9] rounded-t-lg overflow-hidden cursor-pointer"
            style={{ height: card.height || 'auto' }}
          >
            {/* Replace with your card content */}
            {card.image && (
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title || 'Card image'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {card.title && (
              <div className="px-4 py-3 border-1 rounded-t-lg border-black/15 bg-[#F7F7F7]">
                <h3 className="text-sm font-semibold ">{card.title}</h3>
                {card.description && (
                  <>
                    <div className="w-full h-px bg-black/15 my-2"></div>
                    <p className="text-xs">{card.description}</p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .lab-grid {
          position: relative;
          width: 100%;
        }

        .lab-card {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
