"use client";

import { LANGUAGE_VERSIONS } from "@/utils/constant";
import { FaChevronDown } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiPython, SiPhp } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { useState, useRef, useEffect, ReactNode } from "react";

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

const languages = Object.entries(LANGUAGE_VERSIONS);

const LANGUAGE_ICONS: Record<string, ReactNode> = {
  javascript: <SiJavascript className="h-4 w-4 text-yellow-400" />,
  typescript: <SiTypescript className="h-4 w-4 text-blue-500" />,
  python: <SiPython className="h-4 w-4 text-yellow-300" />,
  java: <FaJava className="h-4 w-4 text-red-500" />,
  csharp: <TbBrandCSharp className="h-4 w-4 text-purple-500" />,
  php: <SiPhp className="h-4 w-4 text-indigo-400" />,
};

const LanguageSelector = ({ language, onSelect }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800 sm:w-auto sm:px-4 sm:text-sm"
      >
        <span>{LANGUAGE_ICONS[language]}</span>
        <span className="capitalize hidden xs:inline sm:inline">
          {language}
        </span>
        <FaChevronDown
          className={`h-3 w-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg sm:left-auto sm:right-auto sm:min-w-[200px]">
          {languages.map(([lang, version]) => (
            <button
              key={lang}
              onClick={() => {
                onSelect(lang);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-neutral-800 sm:px-4 sm:py-2.5 sm:text-sm ${
                lang === language
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{LANGUAGE_ICONS[lang]}</span>
                <span className="capitalize">{lang}</span>
              </div>
              <span className="text-[10px] text-neutral-400 sm:text-xs">
                {version}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
