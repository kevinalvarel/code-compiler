"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (animateOn === "view" && isInView) {
      scramble();
    }
  }, [isInView, animateOn]);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    setRevealedIndices(new Set());

    if (intervalRef.current) clearInterval(intervalRef.current);

    const steps = text.length;
    let currentStep = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prevText) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            if (
              currentStep >= maxIterations &&
              index < currentStep - maxIterations
            ) {
              return char;
            }

            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      currentStep++;

      if (currentStep > steps + maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      scramble();
    }
  };

  return (
    <span
      ref={ref}
      className={`inline-block whitespace-nowrap ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
