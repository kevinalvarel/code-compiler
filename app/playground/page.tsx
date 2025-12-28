"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import OutputPanel from "./components/OutputPanel";
import { CODE_SNIPPETS } from "@/utils/constant";
import {
  PlaygroundHeader,
  EditorPanel,
  ConsolePanel,
  Toast,
  SaveDialog,
} from "./components/ui/export";

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

const STORAGE_KEY = "playground_saved_code";

// Helper functions untuk localStorage
const saveToLocalStorage = (language: string, code: string) => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const data = savedData ? JSON.parse(savedData) : {};
    data[language] = {
      code,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Gagal menyimpan ke localStorage:", error);
    return false;
  }
};

const loadFromLocalStorage = (language: string): string | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const data = JSON.parse(savedData);
      return data[language]?.code || null;
    }
    return null;
  } catch (error) {
    console.error("Gagal memuat dari localStorage:", error);
    return null;
  }
};

const Playground = () => {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState<string>(CODE_SNIPPETS.javascript);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Save dialog state
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Load saved code saat komponen pertama kali dimuat atau bahasa berubah
  useEffect(() => {
    const savedCode = loadFromLocalStorage(language);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(CODE_SNIPPETS[language]);
    }
  }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as SupportedLanguage);
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

  // Open save dialog
  const handleSaveCode = () => {
    // Save to localStorage first
    saveToLocalStorage(language, code);
    // Open dialog to save to database
    setIsSaveDialogOpen(true);
  };

  // Save to database
  const handleSaveToDatabase = async (data: {
    title: string;
    description: string;
    isPublic: boolean;
  }) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          code,
          language,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSaveDialogOpen(false);
        showToast("Snippet berhasil disimpan!", "success");
      } else {
        showToast(result.error || "Gagal menyimpan snippet", "error");
      }
    } catch (err) {
      console.error("Failed to save snippet:", err);
      showToast("Gagal menyimpan snippet", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCode = () => {
    setCode(CODE_SNIPPETS[language]);
    setOutput("");
    setError(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Enter untuk run
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        handleRunCode();
      }
      // Ctrl/Cmd + S untuk save
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSaveCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRunCode, code, language]);

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* Toast notification - positioned at bottom */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Save Dialog */}
      <SaveDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveToDatabase}
        language={language}
        isLoading={isSaving}
      />

      <PlaygroundHeader
        onSaveCode={handleSaveCode}
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
            theme="vs-dark"
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
