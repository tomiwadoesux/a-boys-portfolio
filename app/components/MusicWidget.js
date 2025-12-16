"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ErrorIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const AudioVisualization = ({ isPlaying }) => {
  const containerRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    let animationFrame;
    // Local state for animation physics, not React state
    const barStates = Array.from({ length: 4 }, (_, i) => ({
      height: 4,
      targetHeight: 12,
      x: i * 10,
    }));

    const animate = () => {
      const time = Date.now() / 1000;

      barStates.forEach((bar, i) => {
        const domNode = barsRef.current[i];
        if (!domNode) return;

        let newHeight;
        if (!isPlaying) {
          // Idle animation: gentle sine wave
          newHeight = 4 + Math.sin(time * 3 + i) * 2;
        } else {
          // Playing animation: random jumps
          bar.height = bar.height + (bar.targetHeight - bar.height) * 0.2;
          if (Math.abs(bar.height - bar.targetHeight) < 1) {
            bar.targetHeight = 4 + Math.random() * 20;
          }
          newHeight = bar.height;
        }

        // Update DOM directly
        domNode.style.height = `${Math.max(2, newHeight)}px`;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  return (
    <div className="flex items-end justify-center h-8 gap-1" ref={containerRef}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className="w-1.5 bg-[#4447A9] rounded-full"
          style={{ height: "4px" }}
        />
      ))}
    </div>
  );
};

const MusicWidgetSkeleton = () => (
  <div className=" px-7 md:px-20 lg:px-56 rounded-xl p-1.5 overflow-x-auto">
    <div className="flex w-full items-center gap-x-2 sm:gap-x-4 rounded-lg border border-black bg-white p-2 sm:p-3">
      <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-md  animate-pulse"></div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 sm:h-5 w-3/4 rounded animate-pulse"></div>
        <div className="h-3 sm:h-4 w-1/2 rounded  animate-pulse"></div>
      </div>
      <div className="flex items-center ml-2 min-w-0 h-16 sm:h-20 justify-end w-full max-w-[80px]" />
    </div>
    <div className="flex items-center gap-x-2 px-3 py-1.5">
      <div className="h-3 w-3 rounded-full  animate-pulse"></div>
      <div className="h-3 w-28 rounded  animate-pulse"></div>
    </div>
  </div>
);

const MusicWidgetError = ({ message }) => (
  <div className="px-7 md:px-20 lg:px-56 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 overflow-x-auto">
    <div className="flex items-center gap-x-3">
      <ErrorIcon className="h-5 w-5 flex-shrink-0" />
      <div>
        <p className="font-semibold">Unable to load music activity</p>
        <p className="mt-1 text-xs text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

const AlbumArt = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-24 w-24 sm:h-25 sm:w-25 flex-shrink-0">
      {!loaded && (
        <div className="absolute inset-0 rounded-md  animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={180}
        height={180}
        className={`rounded-md object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        draggable={false}
        unoptimized
      />
    </div>
  );
};

const MusicWidgetContent = ({ song }) => (
  <div className="px-7 md:px-20 lg:px-56">
    <a
      href={song.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-2 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 hover:bg-black/2 dark:hover:bg-white/5"
    >
      {/* Album Art */}
      <div className="flex-shrink-0">
        <div className="relative rounded-md overflow-hidden">
          <AlbumArt
            src={song.albumArtUrl}
            alt={`Album artwork for ${song.title} by ${song.artists}`}
          />
        </div>
      </div>

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <div className="space-y-1">
          <p className="truncate text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
            {song.title}
          </p>
          <p className="truncate text-xs text-gray-600">{song.artists}</p>
          <div className="pt-2">
            <div className="flex flex-row gap-1 flex-shrink-0 items-center ">
              <div
                className={`h-2 w-2 rounded-full transition-all ${
                  song.isPlaying ? "bg-[#4447A9] animate-pulse" : "bg-gray-300"
                }`}
              ></div>
              <p className="truncate text-xs text-gray-500">
                {song.lastPlayed}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Visualizer */}
      <div className="flex-shrink-0 ml-auto pl-4">
        <AudioVisualization isPlaying={song?.isPlaying ?? false} />
      </div>
    </a>
  </div>
);

export default function MusicWidget() {
  const [songData, setSongData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const timestamp = Date.now();
        const response = await fetch(`/api/spotify?t=${timestamp}`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(
            errData.error || `Failed to fetch music data (${response.status})`
          );
        }
        const data = await response.json();
        setSongData(data);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while fetching your music data.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 45000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return <MusicWidgetSkeleton />;
  }

  if (error || !songData) {
    return <MusicWidgetError message={error || "No music data available."} />;
  }

  return <MusicWidgetContent song={songData} />;
}
