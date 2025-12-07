"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface VariableProximityProps {
  label: string;
  className?: string;
  fromScale?: number;
  toScale?: number;
  fromOpacity?: number;
  toOpacity?: number;
  radius?: number;
  falloff?: string; // 'linear' or 'exponential'
}

const Letter = ({
  char,
  mousePosition,
  containerRef,
  fromScale,
  toScale,
  fromOpacity,
  toOpacity,
  radius,
  falloff,
}: any) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState({
    scale: fromScale,
    opacity: fromOpacity,
  });

  useEffect(() => {
    const calculateDistance = () => {
      if (!ref.current || !containerRef.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.hypot(
        mousePosition.x - centerX,
        mousePosition.y - centerY
      );

      if (distance < radius) {
        const factor = 1 - distance / radius;
        const intensity =
          falloff === "exponential" ? Math.pow(factor, 2) : factor;

        setState({
          scale: fromScale + (toScale - fromScale) * intensity,
          opacity: fromOpacity + (toOpacity - fromOpacity) * intensity,
        });
      } else {
        setState({ scale: fromScale, opacity: fromOpacity });
      }
    };

    calculateDistance();
  }, [
    mousePosition,
    radius,
    falloff,
    fromScale,
    toScale,
    fromOpacity,
    toOpacity,
  ]);

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={{
        scale: state.scale,
        opacity: state.opacity,
        color: state.opacity > 0.8 ? "#fff" : "#a3a3a3",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.1 }}
    >
      {char}
    </motion.span>
  );
};

export default function VariableProximity({
  label,
  className = "",
  fromScale = 1,
  toScale = 1.2,
  fromOpacity = 0.7,
  toOpacity = 1,
  radius = 100,
  falloff = "linear",
}: VariableProximityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const words = label.split(" ");

  return (
    <div ref={containerRef} className={`${className} cursor-default`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <Letter
              key={charIndex}
              char={char}
              mousePosition={mousePosition}
              containerRef={containerRef}
              fromScale={fromScale}
              toScale={toScale}
              fromOpacity={fromOpacity}
              toOpacity={toOpacity}
              radius={radius}
              falloff={falloff}
            />
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </div>
  );
}
