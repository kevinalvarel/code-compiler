import Squares from "@/components/react-bits/Squares";
import SplitText from "@/components/react-bits/SplitText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

import Link from "next/link";
import { Button } from "@/components/ui/button";
function Hero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060606] text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-5">
        {/* Top blur */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#0a0a0a] to-transparent" />
        {/* Bottom blur */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 md:py-32">
        {/* Headline */}
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
            <SplitText text="Tulis Kode." delay={0.2} className="block" />
            <SplitText
              text="Jalankan Instan."
              delay={0.5}
              className="mt-2 block text-neutral-400"
            />
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-neutral-500 md:text-xl">
          Platform kompilator online modern untuk menjalankan, menguji, dan
          berbagi kode dalam beberapa bahasa pemrograman tanpa setup.
        </p>

        {/* CTA Buttons */}
        <div className="mb-20 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button
              variant="default"
              className="group rounded-full bg-white px-4 py-2 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                Mulai Coding
              </span>
            </Button>
          </Link>

          <Button
            variant="outline"
            className="rounded-full border border-neutral-800 bg-transparent px-4 py-2 cursor-pointer"
          >
            <span className="font-medium">Tentang Kami</span>
          </Button>
        </div>

        {/* Feature Grid / Spotlight Cards */}
        <div className="grid w-full max-w-5xl gap-6 px-4 md:grid-cols-3">
          <SpotlightCard
            className="p-6"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="mb-4 h-10 w-10 rounded-full bg-cyan-500/20 p-2 text-cyan-400">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Multi-Bahasa</h3>
            <p className="text-neutral-400">
              Dukungan untuk Python, JavaScript, C++.
            </p>
          </SpotlightCard>

          <SpotlightCard
            className="p-6"
            spotlightColor="rgba(255, 0, 128, 0.2)"
          >
            <div className="mb-4 h-10 w-10 rounded-full bg-pink-500/20 p-2 text-pink-400">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Tanpa Setup</h3>
            <p className="text-neutral-400">
              Lupakan konfigurasi environment yang rumit. Buka browser, ketik
              kode, dan langsung jalankan.
            </p>
          </SpotlightCard>

          <SpotlightCard
            className="p-6"
            spotlightColor="rgba(255, 180, 0, 0.2)"
          >
            <div className="mb-4 h-10 w-10 rounded-full bg-amber-500/20 p-2 text-amber-400">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Cloud Execution</h3>
            <p className="text-neutral-400">
              Kode dieksekusi di server cloud berkinerja tinggi, hemat resource
              perangkat Anda.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </main>
  );
}

export default Hero;
