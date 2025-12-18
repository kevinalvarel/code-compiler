"use client";

import { FaPlay, FaSpinner, FaTerminal, FaTimes } from "react-icons/fa";
import ActionButton from "./ActionButton";

interface OutputHeaderProps {
  isLoading: boolean;
  onRun: () => void;
  onClear: () => void;
}

const OutputHeader = ({ isLoading, onRun, onClear }: OutputHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-3 py-2 sm:px-4 sm:py-3">
      <div className="flex items-center gap-2 text-xs font-medium text-white sm:text-sm">
        <FaTerminal className="h-3 w-3 text-indigo-400 sm:h-4 sm:w-4" />
        <span>Output</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <ActionButton
          onClick={onClear}
          variant="ghost"
          size="sm"
          className="gap-1 rounded-md p-1.5 sm:gap-1.5 sm:px-3 sm:py-1.5"
        >
          <FaTimes className="h-3 w-3" />
          <span className="hidden sm:inline">Clear</span>
        </ActionButton>
        <ActionButton
          onClick={onRun}
          disabled={isLoading}
          variant="primary"
          size="sm"
          className="gap-1 rounded-md px-2.5 py-1.5 sm:gap-1.5 sm:px-4"
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
        </ActionButton>
      </div>
    </div>
  );
};

export default OutputHeader;
