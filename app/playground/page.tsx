"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import LanguageSelector from "./components/LanguageSelector";
import OutputPanel from "./components/OutputPanel";
import { CODE_SNIPPETS } from "@/utils/constant";
import { FaCode, FaCopy, FaCheck, FaRedo, FaHome } from "react-icons/fa";
import Link from "next/link";

// Dynamic import to avoid SSR issues with Monaco
const CodeEditor = dynamic(() => import("./components/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
      <div className="flex items-center gap-2 text-neutral-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent sm:h-5 sm:w-5" />
        <span className="text-xs sm:text-sm">Memuat...</span>
      </div>
    </div>
  ),
});

type SupportedLanguage = keyof typeof CODE_SNIPPETS;

const Playground = () => {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState<string>(CODE_SNIPPETS.javascript);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as SupportedLanguage);
    setCode(CODE_SNIPPETS[newLanguage as SupportedLanguage]);
    setOutput("");
    setError(null);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleRunCode = useCallback(async () => {
    if (!code.trim()) {
      setError("Masukkan kodenya wok!");
      return;
    }

    setIsLoading(true);
    setOutput("");
    setError(null);

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const result = await response.json();

      if (result.error && !result.output) {
        setError(result.error);
      } else {
        setOutput(result.output || "Program executed successfully (no output)");
        if (result.error) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute code");
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const handleClearOutput = () => {
    setOutput("");
    setError(null);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleResetCode = () => {
    setCode(CODE_SNIPPETS[language]);
    setOutput("");
    setError(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        handleRunCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRunCode]);

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-neutral-800 bg-black px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector
            language={language}
            onSelect={handleLanguageChange}
          />

          <div className="hidden h-6 w-px bg-neutral-800 sm:block" />

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:px-3 sm:py-2"
            title="Copy code"
          >
            {copied ? (
              <FaCheck className="h-4 w-4 text-green-500" />
            ) : (
              <FaCopy className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={handleResetCode}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:px-3 sm:py-2"
            title="Kembalikan ke kode semula"
          >
            <FaRedo className="h-4 w-4" />
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:px-3 sm:py-2"
            title="Kembali ke Beranda"
          >
            <Link href="/home">
              <FaHome className="h-4 w-4" />
            </Link>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-3 overflow-hidden p-3 md:flex-row md:gap-4 md:p-4">
        {/* Editor Panel */}
        <div className="flex h-1/2 flex-col md:h-full md:w-1/2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 sm:text-sm">
              Editor
            </span>
            <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-400 capitalize sm:text-xs">
              {language}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              language={language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex h-1/2 flex-col md:h-full md:w-1/2">
          <div className="mb-2">
            <span className="text-xs font-medium text-neutral-400 sm:text-sm">
              Console
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <OutputPanel
              output={output}
              error={error}
              isLoading={isLoading}
              onRun={handleRunCode}
              onClear={handleClearOutput}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Playground;
