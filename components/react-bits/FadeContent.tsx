"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Easing } from "framer-motion";

interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: Easing;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

export default function FadeContent({
  children,
  blur = false,
  duration = 1,
  easing = "easeOut",
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}: FadeContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: initialOpacity, filter: blur ? "blur(10px)" : "blur(0px)", y: 20 }}
        animate={
          isInView
            ? { opacity: 1, filter: "blur(0px)", y: 0 }
            : { opacity: initialOpacity, filter: blur ? "blur(10px)" : "blur(0px)", y: 20 }
        }
        transition={{ duration, ease: easing }}
      >
        {children}
      </motion.div>
    </div>
  );
}
