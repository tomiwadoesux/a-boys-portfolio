"use client";

import { useEffect } from "react";
import { writeClient } from "../../sanity/lib/client.browser";

export function useVisitorTracking() {
  useEffect(() => {
    async function trackVisitor() {
      // Check if we've already tracked this session
      if (typeof window === "undefined") return;

      const hasTracked = sessionStorage.getItem("visitor_tracked");
      if (hasTracked) return;

      try {
        // Get visitor location from ipapi.co (free, no key needed)
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (!data.city && !data.country_name) {
          console.log("Could not determine visitor location");
          return;
        }

        // Create a simple hash of IP for privacy
        const ipHash = data.ip
          ? await crypto.subtle
              .digest("SHA-256", new TextEncoder().encode(data.ip))
              .then((hash) =>
                Array.from(new Uint8Array(hash))
                  .map((b) => b.toString(16).padStart(2, "0"))
                  .join("")
                  .substring(0, 16)
              )
          : undefined;

        // Send to Sanity
        await writeClient.create({
          _type: "visitor",
          city: data.city || undefined,
          country: data.country_name || "Unknown",
          timestamp: new Date().toISOString(),
          ipAddress: ipHash,
        });

        // Mark as tracked for this session
        sessionStorage.setItem("visitor_tracked", "true");
        console.log("Visitor tracked:", data.city, data.country_name);
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    }

    trackVisitor();
  }, []);
}
