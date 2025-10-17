'use client'; 
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';


interface Dot {
  el: SVGCircleElement;
  anchor: { x: number; y: number };
  // GSAP's high-performance utility functions
  quickToX: gsap.QuickToFunc;
  quickToY: gsap.QuickToFunc;
}

const SvgHover = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dots = useRef<Dot[]>([]);
  const mouse = useRef({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    speed: 0,
  });
  const mouseSpeedTimeoutId = useRef<NodeJS.Timeout>();

  // Configuration for the dots
  const circleConfig = {
    radius: 2,
    margin: 30,
    repelStrength: 300,
    repelRadius: 70,
    returnDuration: 0.3, // How quickly dots return to their anchor
    returnEase: 'power2.out', // The easing for the return motion
  };

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    let svgBounds = { width: 0, height: 0, x: 0, y: 0 };

    // --- GSAP Animation Logic ---

    const createDots = () => {
      svg.innerHTML = '';
      dots.current = [];
      gsap.killTweensOf(svg.children); // Clean up any old GSAP tweens

      svgBounds = container.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${svgBounds.width} ${svgBounds.height}`);

      const dotSize = circleConfig.radius + circleConfig.margin;
      const rows = Math.floor(svgBounds.height / dotSize);
      const cols = Math.floor(svgBounds.width / dotSize);
      const xOffset = (svgBounds.width % dotSize) / 2;
      const yOffset = (svgBounds.height % dotSize) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const anchorX = xOffset + col * dotSize + dotSize / 2;
          const anchorY = yOffset + row * dotSize + dotSize / 2;

          const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          el.setAttribute('r', (circleConfig.radius / 2).toString());
          el.setAttribute('class', 'fill-[#4447A9]');
          svg.appendChild(el);
          
          // Initialize dot position with GSAP
          gsap.set(el, { x: anchorX, y: anchorY });

          dots.current.push({
            el,
            anchor: { x: anchorX, y: anchorY },
            // Create a quickTo function for both x and y.
            // This is more performant than creating a new tween on every mouse move.
            quickToX: gsap.quickTo(el, 'x', { duration: circleConfig.returnDuration, ease: circleConfig.returnEase }),
            quickToY: gsap.quickTo(el, 'y', { duration: circleConfig.returnDuration, ease: circleConfig.returnEase }),
          });
        }
      }
    };

    const mouseHandler = (e: MouseEvent) => {
      mouse.current.x = e.pageX;
      mouse.current.y = e.pageY;
      
      const mouseX = e.clientX - svgBounds.x;
      const mouseY = e.clientY - svgBounds.y;

      dots.current.forEach(dot => {
        const distX = mouseX - dot.anchor.x;
        const distY = mouseY - dot.anchor.y;
        const dist = Math.hypot(distX, distY);

        // If the mouse is close enough, repel the dot
        if (dist < circleConfig.repelRadius) {
          const angle = Math.atan2(distY, distX);
          const moveAmount = (circleConfig.repelStrength / dist) * (mouse.current.speed * 0.1);
          
          // Calculate the new position away from the mouse
          const targetX = dot.anchor.x - Math.cos(angle) * moveAmount;
          const targetY = dot.anchor.y - Math.sin(angle) * moveAmount;

          // Use quickTo to animate to the new target
          dot.quickToX(targetX);
          dot.quickToY(targetY);
        } else {
          // Otherwise, animate it back to its anchor position
          dot.quickToX(dot.anchor.x);
          dot.quickToY(dot.anchor.y);
        }
      });
    };
    
    const mouseSpeed = () => {
        const mouseRef = mouse.current;
        const distX = mouseRef.prevX - mouseRef.x;
        const distY = mouseRef.prevY - mouseRef.y;
        const dist = Math.hypot(distX, distY);

        mouseRef.speed += (dist - mouseRef.speed) * 0.9;
        if (mouseRef.speed < 0.001) mouseRef.speed = 0;

        mouseRef.prevX = mouseRef.x;
        mouseRef.prevY = mouseRef.y;
        
        mouseSpeedTimeoutId.current = setTimeout(mouseSpeed, 20);
    }
    
    // --- Setup and Cleanup ---

    const resizeObserver = new ResizeObserver(createDots);
    resizeObserver.observe(container);

    window.addEventListener('mousemove', mouseHandler);
    mouseSpeed();

    // Cleanup function to run when the component unmounts
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', mouseHandler);
      if (mouseSpeedTimeoutId.current) {
        clearTimeout(mouseSpeedTimeoutId.current);
      }
      // Kill all tweens associated with the dot elements to prevent memory leaks
      gsap.killTweensOf(dots.current.map(d => d.el));
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef}  className="overflow-visible" />
    </div>
  );
};

export default SvgHover;