"use client";

import Image from "next/image";

export default function MediaBox({ media }) {
  const { type, image, video } = media;

  return (
    <div className="relative w-full bg overflow-hidden rounded flex items-center justify-center min-h-[400px]">
      {type === "image" && image ? (
        <>
          {/* Main image - displays at natural aspect ratio */}
          <Image
            src={image}
            alt="Project media"
            width={1200}
            height={800}
            className="w-full h-auto object-contain max-h-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            priority
            loading="eager"
            quality={90}
          />
          {/* Blurred background overflow effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              opacity: 0.3,
              zIndex: -1,
            }}
          />
        </>
      ) : type === "video" && video ? (
        <>
          {/* Main video */}
          <video
            src={video}
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
          {/* Blurred background overflow effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${video}?t=1)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              opacity: 0.3,
              zIndex: -1,
            }}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No media available
        </div>
      )}
    </div>
  );
}
