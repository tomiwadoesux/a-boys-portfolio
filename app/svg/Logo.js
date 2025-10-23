"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Logo() {
  const logoRef = useRef(null);
  const trailsContainerRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if this is the initial load
    const hasLoadedBefore = sessionStorage.getItem("logo_has_loaded");
    if (!hasLoadedBefore) {
      sessionStorage.setItem("logo_has_loaded", "true");
      setIsInitialLoad(true);
      // Disable trail effect on initial load
      return;
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    // Skip scroll trail effect on initial load
    if (isInitialLoad) return;

    if (
      typeof window === "undefined" ||
      !logoRef.current ||
      !trailsContainerRef.current
    )
      return;

    const colors = [
      "#4447A9",
      "#060760",
      "#deec06",
      "#0b0a0a",
    ];

    const scrollContainer = document.getElementById("main-scroll-container");
    if (!scrollContainer) return;

    let lastScrollY = 0;
    let trails = [];
    let colorIndex = 0;

    const createTrail = () => {
      if (!logoRef.current || !trailsContainerRef.current) return;

      const svgElement = logoRef.current.querySelector("svg");
      if (!svgElement) return;

      const trail = svgElement.cloneNode(true);
      const color = colors[colorIndex % colors.length];
      colorIndex++;

      const rect = svgElement.getBoundingClientRect();

      // Wrap the SVG in a div for better control
      const trailWrapper = document.createElement("div");
      trailWrapper.style.position = "fixed";
      trailWrapper.style.top = `${rect.top}px`;
      trailWrapper.style.left = `${rect.left}px`;
      trailWrapper.style.pointerEvents = "none";
      trailWrapper.style.zIndex = "10000";
      trailWrapper.style.width = `${rect.width}px`;
      trailWrapper.style.height = `${rect.height}px`;

      // Style the cloned SVG
      trail.style.width = "100%";
      trail.style.height = "100%";
      trail.style.display = "block";

      const paths = trail.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("fill", color);
      });

      trailWrapper.appendChild(trail);
      trailsContainerRef.current.appendChild(trailWrapper);
      trails.push(trailWrapper);

      gsap.fromTo(
        trailWrapper,
        {
          opacity: 0.5,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (trailWrapper.parentNode) {
              trailWrapper.remove();
            }
            trails = trails.filter((t) => t !== trailWrapper);
          },
        }
      );

      // Limit number of trails
      if (trails.length > 3) {
        const oldTrail = trails.shift();
        if (oldTrail && oldTrail.parentNode) {
          oldTrail.remove();
        }
      }
    };

    let rafId = null;
    let lastTrailTime = 0;
    const trailInterval = 60; // ms between trail spawns

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      const delta = Math.abs(currentScrollY - lastScrollY);
      const now = Date.now();

      // Create trail if scrolling and enough time has passed
      if (delta > 0 && now - lastTrailTime > trailInterval) {
        createTrail();
        lastTrailTime = now;
      }

      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(handleScroll);
    };

    scrollContainer.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      trails.forEach((trail) => {
        if (trail && trail.parentNode) {
          trail.remove();
        }
      });
    };
  }, [isInitialLoad]);

  return (
    <>
      <div
        ref={trailsContainerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10000,
        }}
      />
      <div ref={logoRef} style={{ position: "relative", zIndex: 10001 }}>
        <svg
          width="23"
          height="22"
          viewBox="0 0 374 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", cursor: "pointer" }}
          className="overflow-visible"
        >
          <g id="Group 70">
            <g id="Hat">
              <path
                id="Vector 50"
                d="M44 143L77 143L77 177L66 177L66 231L55 231L55 286L66 286L66 297L88 297L88 309L131.5 309L131.5 319.5L241.5 319.5L241.5 309L285.5 309L285.5 297L307 297L307 286.5L318.5 286.5L318.5 232.5L307 232.5L307 176.5L297 176.5L297 143.5L329.5 143.5L329.5 132.5L351 132.5L351 121L363 121L363 110L374 110L374 77L361.5 77L361.5 66L351 66L351 55.5L340.5 55.5L340.5 44.5L329.5 44.5L329.5 34L307 34L307 22.5L285 22.5L285 12L252 12L252 -1.06656e-05L120.5 -2.21617e-05L120.5 11L88 11L88 21.5L65.5 21.5L65.5 33L44 33L44 43.5L33 43.5L33 55L21.5 55L21.5 66L11 66L11 78L2.11126e-05 78L1.83588e-05 109.5L11 109.5L11 121L21.5 121L21.5 131.5L44 131.5L44 143Z"
                fill="black"
              />
              <path
                id="Vector 51"
                d="M284 133L297 133L297 87.5L274.5 87.5L274.5 76.5L252.5 76.5L252.5 65L120 65L120 75.5L98 75.5L98 87L76.5 87L76.5 133L89 133L89 121.5L100 121.5L100 111L133 111L133 99.5L240 99.5L240 110.5L273 110.5L273 122L284 122L284 133Z"
                fill="white"
              />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}
