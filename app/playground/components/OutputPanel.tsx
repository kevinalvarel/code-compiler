"use client";

import { OutputHeader, OutputContent } from "./ui";

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
      <OutputHeader isLoading={isLoading} onRun={onRun} onClear={onClear} />
      <div className="flex-1 overflow-auto bg-black p-3 sm:p-4">
        <OutputContent output={output} error={error} />
      </div>
    </div>
  );
};

export default OutputPanel;
