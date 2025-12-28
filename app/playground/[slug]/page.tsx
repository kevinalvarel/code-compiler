"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import OutputPanel from "../components/OutputPanel";
import { CODE_SNIPPETS } from "@/utils/constant";
import {
  PlaygroundHeader,
  EditorPanel,
  ConsolePanel,
  Toast,
  SaveDialog,
} from "../components/ui/export";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
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

const PlaygroundSlugPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSnippet, setIsLoadingSnippet] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);
  const [snippetId, setSnippetId] = useState<string | null>(null);
  const [snippetTitle, setSnippetTitle] = useState<string>("");

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

  // Fetch snippet data
  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setIsLoadingSnippet(true);
        const response = await fetch(`/api/snippets/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            showToast("Snippet tidak ditemukan", "error");
            router.push("/playground");
            return;
          }
          throw new Error("Failed to fetch snippet");
        }

        const data = await response.json();
        setCode(data.snippet.code);
        setLanguage(data.snippet.language as SupportedLanguage);
        setSnippetId(data.snippet.id);
        setSnippetTitle(data.snippet.title);
      } catch (err) {
        console.error("Error fetching snippet:", err);
        showToast("Gagal memuat snippet", "error");
      } finally {
        setIsLoadingSnippet(false);
      }
    };

    if (slug) {
      fetchSnippet();
    }
  }, [slug, router]);

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
    setIsSaveDialogOpen(true);
  };

  // Update snippet in database
  const handleSaveToDatabase = async (data: {
    title: string;
    description: string;
    isPublic: boolean;
  }) => {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/snippets/${snippetId}`, {
        method: "PUT",
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
        setSnippetTitle(data.title);
        showToast("Snippet berhasil diupdate!", "success");
      } else {
        showToast(result.error || "Gagal mengupdate snippet", "error");
      }
    } catch (err) {
      console.error("Failed to update snippet:", err);
      showToast("Gagal mengupdate snippet", "error");
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
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        handleRunCode();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSaveCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRunCode, code, language]);

  if (isLoadingSnippet) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <span className="text-neutral-400">Memuat snippet...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <SaveDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveToDatabase}
        language={language}
        isLoading={isSaving}
        initialTitle={snippetTitle}
      />

      <PlaygroundHeader
        onSaveCode={handleSaveCode}
        language={language}
        onLanguageChange={handleLanguageChange}
        onCopyCode={handleCopyCode}
        onResetCode={handleResetCode}
        copied={copied}
        title={snippetTitle}
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

export default PlaygroundSlugPage;
