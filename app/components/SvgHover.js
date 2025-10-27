"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SvgHover({ className = "", style = {} }) {
  const svgRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    speed: 0
  });
  const svgDataRef = useRef({
    width: 1,
    height: 1,
    x: 0,
    y: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dots = dotsRef.current;
    const mouse = mouseRef.current;
    const svgData = svgDataRef.current;

    const circle = {
      radius: 2,
      margin: 20
    };

    let animationFrame;
    let speedInterval;

    // Resize handler
    function resizeHandler() {
      const bounding = svg.getBoundingClientRect();
      svgData.width = bounding.width;
      svgData.height = bounding.height;
      svgData.x = bounding.left;
      svgData.y = bounding.top;
    }

    // Create dots
    function createDots() {
      resizeHandler();

      // Clear existing dots
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      dots.length = 0;

      const dotSize = circle.radius + circle.margin;
      const rows = Math.floor(svgData.height / dotSize);
      const cols = Math.floor(svgData.width / dotSize);
      const x = (svgData.width % dotSize) / 2;
      const y = (svgData.height % dotSize) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dot = {
            anchor: {
              x: x + col * dotSize + dotSize / 2,
              y: y + row * dotSize + dotSize / 2
            }
          };

          dot.position = {
            x: dot.anchor.x,
            y: dot.anchor.y
          };

          dot.smooth = {
            x: dot.anchor.x,
            y: dot.anchor.y
          };

          dot.velocity = {
            x: 0,
            y: 0
          };

          dot.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.el.setAttribute('cx', dot.anchor.x);
          dot.el.setAttribute('cy', dot.anchor.y);
          dot.el.setAttribute('r', circle.radius / 2);
          dot.el.setAttribute('opacity', '1');
          dot.el.setAttribute('fill', '#4447a9');

          svg.appendChild(dot.el);
          dots.push(dot);
        }
      }

      setIsLoaded(true);
    }

    // Mouse handler
    function mouseHandler(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    }

    // Mouse speed
    function mouseSpeed() {
      const distX = mouse.prevX - mouse.x;
      const distY = mouse.prevY - mouse.y;
      const dist = Math.hypot(distX, distY);

      mouse.speed += (dist - mouse.speed) * 0.9;
      if (mouse.speed < 0.005) {
        mouse.speed = 0;
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }

    // Tick using GSAP
    function tick() {
      dots.forEach(dot => {
        const distX = mouse.x - svgData.x - dot.position.x;
        const distY = mouse.y - svgData.y - dot.position.y;
        const dist = Math.max(Math.hypot(distX, distY), 1);

        const angle = Math.atan2(distY, distX);
        // Reduced movement speed from 0.1 to 0.04 (60% slower)
        const move = (500 / dist) * (mouse.speed * 0.04);

        // Increased interaction distance from 100 to 120
        if (dist < 90) {
          dot.velocity.x += Math.cos(angle) * -move;
          dot.velocity.y += Math.sin(angle) * -move;
        }

        // Increased friction from 0.9 to 0.92 (slower deceleration)
        dot.velocity.x *= 0.72;
        dot.velocity.y *= 0.72;

        dot.position.x = dot.anchor.x + dot.velocity.x;
        dot.position.y = dot.anchor.y + dot.velocity.y;

        // Reduced smoothing from 0.1 to 0.06 (more gradual movement)
        dot.smooth.x += (dot.position.x - dot.smooth.x) * 0.08;
        dot.smooth.y += (dot.position.y - dot.smooth.y) * 0.08;

        // Use GSAP to animate the dots
        gsap.set(dot.el, {
          attr: {
            cx: dot.smooth.x,
            cy: dot.smooth.y
          }
        });
      });

      animationFrame = requestAnimationFrame(tick);
    }

    // Initialize
    createDots();
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('mousemove', mouseHandler);

    // Start speed tracking
    speedInterval = setInterval(mouseSpeed, 10);

    // Start animation
    tick();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mouseHandler);
      clearInterval(speedInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
        ...style
      }}
    />
  );
}
