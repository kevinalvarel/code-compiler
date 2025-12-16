"use client";

import { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  theme?: "vs-dark" | "light" | "hc-black";
}

const CodeEditor = ({
  language,
  value,
  onChange,
  theme = "vs-dark",
}: CodeEditorProps) => {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-neutral-800">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        onMount={onMount}
        theme={theme}
        options={{
          fontSize: 14,
          fontFamily: "var(--font-mono), 'Fira Code', Consolas, monospace",
          fontLigatures: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          bracketPairColorization: { enabled: true },
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          formatOnPaste: true,
          formatOnType: true,
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="flex items-center gap-2 text-neutral-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <span>Loading Editor...</span>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CodeEditor;
