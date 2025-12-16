"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function TypewriterEffect({ messages = [] }) {
  const textRef = useRef(null);
  const [text, setText] = useState("");

  // loadingMessages.js

  //  const messages = [
  //   "Translating designer dreams into developer realities (and minor chaos)",
  //   "Hold tight while I over-engineer the obvious",
  //   "Grabbing assets… pondering the meaning of pixels",
  //   "Detouring expectations… delays are on time",
  //   "Animating enthusiasm… battery critically low",
  //   "Currently stuck in a tasteful infinite loop",
  //   "Simulating progress… convincingly, we hope",
  //   "Searching for meaning… found in the codebase",
  //   "Computing the odds of glorious failure",
  //   "Please wait… the queue enjoys company",
  //   "Loading… practically there, nearly-ish",
  //   "Painting pixels with questionable devotion",
  //   "Blending magic with meticulously typed code",
  //   "Optimizing creativity… please stand stylishly by",
  //   "Design and code are shaking hands (awkwardly)",
  //   "Importing creativity… nearly downloaded",
  //   "Priming awesomeness… charging sparkle",
  //   "Simulating brilliance… plausible outcomes pending",
  //   "Everything’s fine. Definitely fine.",
  //   "Loading coolness… calibrating swagger",
  //   "Tuning the frequency of designer dreams",
  //   "Fusing design with motion—gently",
  //   "Executing creativity protocols… passphrase: ‘vibes’",
  //   "Casting spells… compiling enchantments",
  //   "Polishing pretty… buffing carefully",
  //   "Loading… time is a suggestion",
  //   "Pixel choreography in progress",
  //   "Reconciling code with reality",
  //   "Halfway done… by certain definitions",
  //   "Optimizing… cautiously optimistic",
  //   "Where design meets code… fingers crossed",
  //   "Retrieving delightfully mysterious things",
  //   "Preparing… slow but determined",
  //   "Aligning pixels with surgical precision",
  //   "Calibrating… the uncalibratable",
  //   "Waiting… patience mode enabled",
  //   "Simulating… probably something cool",
  //   "Loading… blinking recommended",
  //   "Executing suspiciously clever algorithms",
  //   "Almost there… plus or minus infinity",
  //   "Integrating like a seasoned wizard",
  //   "Crafting carefully… no breakage intended",
  //   "Adjusting fonts by subatomic increments",
  //   "Assembling the vibe—please hold",
  //   "Loading… nothing to see (yet)",
  //   "Final checks… optimism engaged",
  //   "Almost ready… pinky promise",
  //   "Building… bricks of pure aesthetic",
  //   "Loading… haste makes buggy",
  //   "Please wait… or rebel, your call",
  //   "Initializing… feature gremlins detected",
  //   "Optimizing… if anyone cares",
  //   "Deploying… probably not on fire",
  //   "Making it work… manifesting success",
  //   "Running… elegantly underclocked",
  //   "Testing patience… yours, mainly",
  //   "Booting up… expectations in beta",
  //   "Loading… who’s keeping score?",
  //   "Loading… could be worse, could be art",
  //   "Loading gradients… adding 11% more glow",
  //   "Spooling up the hype engine",
  //   "Quantizing aesthetics… rounding to fabulous",
  //   "Rendering delight at 60fps (ish)",
  //   "Mining for dopamine in the UI",
  //   "Ionizing pixels for extra sparkle",
  //   "Engaging turbo mode… with grace",
  //   "Dialing up the fun to ludicrous",
  //   "Preheating animations to golden-brown",
  //   "Summoning UX spirits—friendly ones",
  //   "Refactoring reality for better taste",
  //   "Warming caches with artisanal code",
  //   "Committing joy… pushing to production",
  //   "Enabling dark mode for your soul",
  //   "Hydrating components… stay refreshed",
  //   "Negotiating with linting overlords",
  //   "Wrangling edge cases into a neat box",
  //   "Spinning up nanobots for tiny polish",
  //   "Teaching buttons to be more clickable",
  //   "Collapsing wave functions of loading bars",
  //   "Theming everything: bold, crisp, legendary",
  //   "Embedding swagger… checksum verified",
  //   "Overclocking elegance—keep cool",
  //   "Synthesizing sparkle from pure math",
  //   "Loading secrets… only cool ones",
  //   "Harmonizing z-index with diplomacy",
  //   "Smoothing bezier curves to perfection",
  //   "Running the vibe compiler—no warnings",
  //   "Infusing motion with intentionality",
  //   "Weaving microinteractions by hand",
  //   "Curating pixels with gallery-tier taste",
  //   "Deploying delight across all breakpoints",
  //   "Energizing components with sustainable whimsy",
  //   "Spicing the UI—chef’s kiss incoming",
  //   "Casting shadows… soft and meaningful",
  //   "Baking accessibility into every crumb",
  //   "Negotiating with CSS—peace talks ongoing",
  //   "Loading wonder… do not tap the glass",
  //   "Patching reality—update requires restart",
  //   "Balancing chaos and charm at runtime",
  //   "Reverifying cool factor—10/10",
  //   "Charging the fun capacitor",
  //   "Activating quantum UX entanglement",
  //   "Flossing the layout—clean lines only",
  //   "Bridging art and logic… toll paid",
  //   "Spawning ideas… rate-limited by brilliance",
  //   "Encrypting flair with AES-awesome",
  //   "Selecting fonts with impeccable taste",
  //   "Binding magic to event listeners",
  //   "Whispering compliments to the UI",
  //   "Shaping motion… elegant, intentional",
  //   "Reticulating splines like it’s 1997",
  //   "Rendering joy with hardware acceleration",
  //   "Priming confetti cannons—safety first",
  //   "Sharpening tooltips for maximum helpful",
  //   "Lubricating scroll—smooth like butter",
  //   "Surfacing polish from parallel universes",
  //   "Consolidating vibes—single source of truth",
  //   "Aggregating coolness from cached dreams",
  //   "Distilling style—small batch, limited edition",
  //   "Upgrading whimsy to v2.0",
  //   "Formatting charisma… linting charm",
  //   "Tuning easings… elastic but kind",
  //   "Infusing delight at compile-time",
  //   "Teleporting elegance into the layout",
  //   "Curating micro-joy—one pixel at a time",
  //   "Testing sparkle—unit tests passing",
  //   "Spinning asymmetry into balance",
  //   "Elevating taste—ship-ready levels",
  //   "Enhancing clickability with nanotech",
  //   "Rendering possibilities… choose your adventure",
  //   "Installing cool driver… signed and sealed",
  //   "Composing gradients in Lydian mode",
  //   "Rehydrating dreams from server-side",
  //   "Interlacing vibes—deinterlaced elegance",
  //   "Sculpting shadows… chiaroscuro mode",
  //   "Buffering brilliance… please admire",
  //   "Calibrating swagger—factory settings restored",
  //   "Deploying elegance… zero downtime",
  //   "Upscaling charm with AI-powered taste",
  //   "Crossfading reality into delight",
  //   "Pinning perfection—sticky, tasteful",
  //   "Tessellating cool into the grid",
  //   "Loading resonance… vibes aligned",
  //   "Binding beauty to the DOM",
  //   "Hushing jitters—smoothly animated",
  //   "Dusting off delights—freshly baked",
  //   "Compiling charisma—no syntax errors",
  //   "Streaming wonder in lossless mode",
  //   "Brewing UI… medium roast, extra polish",
  //   "Weaving order from aesthetic chaos",
  //   "Staging pizzazz—lights, camera, render",
  //   "Emulsifying design and function",
  //   "Rolling out elegance—hot and ready",
  //   "Curing animations—aged to perfection",
  //   "Orchestrating motion—cue the violins",
  //   "Inflecting taste… subtly dramatic",
  //   "Engaging sparkle shaders—GPU humming",
  //   "Aligning planets and paddings",
  //   "Seeding delight—growth guaranteed",
  //   "Invoking slickness… say the magic word",
  //   "Polishing edges—dangerously smooth"
  // ];

  useEffect(() => {
    // If no messages provided, don't show anything (parent provides fallbacks now)
    if (!messages || messages.length === 0) {
      return;
    }

    let usedMessages = [];
    let isRunning = true;
    let startTimer;

    const getRandomMessage = () => {
      // Reset if all messages have been used
      if (usedMessages.length === messages.length) {
        usedMessages = [];
      }

      // Get available messages
      const availableMessages = messages.filter(
        (msg) => !usedMessages.includes(msg)
      );

      // Pick random message
      const randomIndex = Math.floor(Math.random() * availableMessages.length);
      const selectedMessage = availableMessages[randomIndex];
      usedMessages.push(selectedMessage);

      return selectedMessage;
    };

    const typeWriter = async () => {
      const message = getRandomMessage() + "..";
      let currentText = "";

      // Type each character of the message
      for (let charIdx = 0; charIdx < message.length; charIdx++) {
        if (!isRunning) break;

        currentText += message[charIdx];
        setText(currentText);

        // Wait between characters (120ms for typing speed)
        await new Promise((resolve) => setTimeout(resolve, 120));
      }

      // Wait 2 seconds before next message
      if (isRunning) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        typeWriter();
      }
    };

    // Delay typewriter effect to start after page loads
    // This prevents it from blocking the initial page load
    startTimer = setTimeout(() => {
      if (isRunning) {
        typeWriter();
      }
    }, 500);

    // Cleanup
    return () => {
      isRunning = false;
      clearTimeout(startTimer);
    };
  }, [messages]);

  return (
    <div className="self-start text-[11px] w-35">
      <div
        ref={textRef}
        style={{
          lineHeight: "1.4em",
          height: "5.6em", // Exactly 4 lines (1.4em * 4)
          overflow: "hidden",
        }}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
