"use client";

import { useState, useEffect, useRef, memo } from "react";
import { usePathname } from "next/navigation";
import TypewriterEffect from "./TypewriterEffect";
import { getLastVisitorLocation } from "../../sanity/lib/fetch";
import { useVisitorTracking } from "../hooks/useVisitorTracking";

const Headd = memo(function Headd() {
  const pathname = usePathname();
  const [lastVisitor, setLastVisitor] = useState("Loading...");
  const hasFetched = useRef(false);

  // Track current visitor
  useVisitorTracking();

  // Hide Headd on screens page
  const shouldHide = pathname === "/screens" || pathname.startsWith("/screens/");

  useEffect(() => {
    // Only fetch once on mount, not on every render
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchLastVisitor() {
      try {
        const location = await getLastVisitorLocation();
        if (location) {
          const displayLocation = location.city
            ? `${location.city}, ${location.country}`
            : location.country;
          setLastVisitor(displayLocation);
        } else {
          setLastVisitor("No visitors yet");
        }
      } catch (error) {
        console.error("Error fetching last visitor:", error);
        setLastVisitor("Unknown");
      }
    }

    fetchLastVisitor();

    // Poll for updates every 90 seconds
    const interval = setInterval(fetchLastVisitor, 90000);
    return () => clearInterval(interval);
  }, []);

  if (shouldHide) {
    return null;
  }

  return (
    <div className="hidden md:block">
       <div className="flex  flex-row justify-between px-7 lg:px-8 w-full relative top-7">
      <TypewriterEffect />
      <div className="self-start text-xs ">
        <h4>
          Last Visitor: <span className="text-[#4447A9]">{lastVisitor}</span>
        </h4>
      </div>
    </div>
    </div>

  );
});

export default Headd;
