"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function TypewriterEffect() {
  const textRef = useRef(null);
  const [text, setText] = useState("");

  const messages = [
    "Preparing for inevitable debugging",
    "Compiling designer dreams...into developer nightmares",
    "Please wait while I overthink this",
    "Optimizing... but nothing's perfect",
    "Configuring the next minor inconvenience",
    "Fetching assets... contemplating the futility of it all",
    "Re-routing your expectations... expect delays",
    "Trying to animate enthusiasm... it's not going well",
    "Stuck in an infinite loop",
    "Loading... still pointless",
    "Simulating progress... sort of",
    "This will probably break soon",
    "Simulating something useful",
    "Progress bar full of lies",
    "Finding meaning in the code",
    "Calculating failure probabilities",
    "Please wait... indefinitely",
    "Loading... almost there!",
    "Animating pixels with love",
    "Integrating magic and code",
    "Optimizing creativity... stand by",
    "Design and code handshake",
    "Fetching creativity... almost done!",
    "Preparing awesomeness",
    "Simulating brilliance... probably",
    "Everything is under control",
    "Loading coolness... almost ready",
    "Calibrating designer dreams",
    "Fusing design and animation",
    "Running creativity protocols",
    "Crafting magic... please wait",
    "Making things pretty... hold on",
    "Loading... this might take a bit",
    "Animating pixels... somewhat precisely",
    "Integrating code and reality",
    "Halfway done... maybe",
    "Optimizing... cautiously hopeful",
    "Design meets code... fingers crossed",
    "Fetching some interesting stuff",
    "Preparing... slowly but surely",
    "Aligning pixels... carefully",
    "Calibrating... what exactly? Good question",
    "Waiting... patience is key",
    "Simulating... something, probably",
    "Loading... feel free to blink",
    "Running some clever algorithms",
    "Almost there... give or take",
    "Integrating... like a pro",
    "Crafting... without breaking anything",
    "Adjusting fonts... nearly invisible",
    "Piecing it together... stay tuned",
    "Loading... nothing to see yet",
    "Running final checks... hopefully",
    "Almost ready... trust me",
    "Building... it's getting there",
    "Loading... but why rush?",
    "Please wait... or don't, whatever",
    "Initializing... prepare for bugs",
    "Optimizing... but who cares?",
    "Deploying... probably not broken",
    "Making things work... hopefully",
    "Running... but not too fast",
    "Testing patience... stay calm",
    "Initializing... no promises",
    "Loading... but who's counting?",
    "Loading... could be worse",
  ];

  useEffect(() => {
    // Check if this is the initial load
    const hasLoadedBefore = sessionStorage.getItem("has_loaded");

    if (!hasLoadedBefore) {
      // First load - show a static message without animation
      setText("Loading... almost ready");
      sessionStorage.setItem("has_loaded", "true");
      return;
    }

    // Subsequent loads - run the typewriter effect
    let usedMessages = [];
    let allLines = []; // Keep track of all lines ever typed
    const maxCharsPerLine = 45; // Character limit per line
    let isRunning = true;

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
        await new Promise(resolve => setTimeout(resolve, 120));
      }

      // Wait 2 seconds before next message
      if (isRunning) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        typeWriter();
      }
    };

    // Start the typewriter effect
    typeWriter();

    // Cleanup
    return () => {
      isRunning = false;
    };
  }, []);

  return (
    <div className="self-start text-[11px] w-35">
      <div
        ref={textRef}
        style={{
          lineHeight: "1.4em",
          height: "5.6em", // Exactly 4 lines (1.4em * 4)
          overflow: "hidden"
        }}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
