"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import OutputPanel from "./components/OutputPanel";
import { CODE_SNIPPETS } from "@/utils/constant";
import { PlaygroundHeader, EditorPanel, ConsolePanel } from "./components/ui";

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
      <PlaygroundHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        onCopyCode={handleCopyCode}
        onResetCode={handleResetCode}
        copied={copied}
      />

      <main className="flex flex-1 flex-col gap-3 overflow-hidden p-3 md:flex-row md:gap-4 md:p-4">
        <EditorPanel title="Editor" badge={language}>
          <CodeEditor
            language={language}
            value={code}
            onChange={handleCodeChange}
            theme="hc-black"
          />
        </EditorPanel>

        <ConsolePanel title="Console">
          <OutputPanel
            output={output}
            error={error}
            isLoading={isLoading}
            onRun={handleRunCode}
            onClear={handleClearOutput}
          />
        </ConsolePanel>
      </main>
    </div>
  );
};

export default Playground;
