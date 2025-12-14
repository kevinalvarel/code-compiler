"use client";
import { LayoutTextFlip } from "@/components/aceternity-ui/layout-text-flip";
import { motion } from "motion/react";

export default function GettingReady() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white my-10 flex flex-col items-center justify-center px-4 text-center bg-[#0a0a0a]">
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row ">
        <LayoutTextFlip
          text="Bersiaplah untuk"
          words={[
            "Belajar",
            "Ngoding",
            "Mecut AI",
            "Berkolaborasi",
            "Membangun",
          ]}
        />
      </motion.div>
      <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
        Platform kompilator online yang cepat dan mudah digunakan untuk semua
      </p>
    </div>
  );
}
