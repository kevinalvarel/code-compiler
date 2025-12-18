"use client";

import { FaCode, FaCopy, FaCheck, FaRedo, FaHome } from "react-icons/fa";
import IconButton from "./IconButton";
import LanguageSelector from "../LanguageSelector";

interface PlaygroundHeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onCopyCode: () => void;
  onResetCode: () => void;
  copied: boolean;
}

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 sm:h-10 sm:w-10">
      <FaCode className="h-4 w-4 text-indigo-400 sm:h-5 sm:w-5" />
    </div>
    <div>
      <h1 className="text-base font-semibold text-white sm:text-lg">
        Pelajarin Playground
      </h1>
      <p className="text-[10px] text-neutral-400 sm:text-xs">
        Write, run, and test your code
      </p>
    </div>
  </div>
);

const Divider = () => (
  <div className="hidden h-6 w-px bg-neutral-800 sm:block" />
);

const PlaygroundHeader = ({
  language,
  onLanguageChange,
  onCopyCode,
  onResetCode,
  copied,
}: PlaygroundHeaderProps) => {
  return (
    <header className="flex flex-col gap-4 border-b border-neutral-800 bg-black px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
      <Logo />

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSelector language={language} onSelect={onLanguageChange} />

        <Divider />

        <IconButton
          icon={
            copied ? (
              <FaCheck className="h-4 w-4 text-green-500" />
            ) : (
              <FaCopy className="h-4 w-4" />
            )
          }
          onClick={onCopyCode}
          title="Copy code"
        />

        <IconButton
          icon={<FaRedo className="h-4 w-4" />}
          onClick={onResetCode}
          title="Kembalikan ke kode semula"
        />

        <IconButton
          icon={<FaHome className="h-4 w-4" />}
          href="/home"
          title="Kembali ke Beranda"
        />
      </div>
    </header>
  );
};

export default PlaygroundHeader;
