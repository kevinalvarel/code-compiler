"use client";

import { FaPlay, FaSpinner, FaTerminal, FaTimes } from "react-icons/fa";

interface OutputPanelProps {
  output: string;
  error: string | null;
  isLoading: boolean;
  onRun: () => void;
  onClear: () => void;
}

const OutputPanel = ({
  output,
  error,
  isLoading,
  onRun,
  onClear,
}: OutputPanelProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-white sm:text-sm">
          <FaTerminal className="h-3 w-3 text-indigo-400 sm:h-4 sm:w-4" />
          <span>Output</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onClear}
            className="flex items-center gap-1 rounded-md p-1.5 text-[10px] font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
          >
            <FaTimes className="h-3 w-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            onClick={onRun}
            disabled={isLoading}
            className="flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-1.5 sm:px-4 sm:text-xs"
          >
            {isLoading ? (
              <>
                <FaSpinner className="h-3 w-3 animate-spin" />
                <span className="hidden sm:inline">Running...</span>
              </>
            ) : (
              <>
                <FaPlay className="h-3 w-3" />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-auto bg-black p-3 sm:p-4">
        {error ? (
          <pre className="font-mono text-xs text-red-400 whitespace-pre-wrap sm:text-sm">
            {error}
          </pre>
        ) : output ? (
          <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap sm:text-sm">
            {output}
          </pre>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-500 sm:text-sm">
            <span className="text-center">
              Tekan &quot;Run&quot; untuk menjalankan kode
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
