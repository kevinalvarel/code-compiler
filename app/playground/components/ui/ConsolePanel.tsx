"use client";

import { ReactNode } from "react";

interface ConsolePanelProps {
  title: string;
  children: ReactNode;
}

const ConsolePanel = ({ title, children }: ConsolePanelProps) => {
  return (
    <div className="flex h-1/2 flex-col md:h-full md:w-1/2">
      <div className="mb-2">
        <span className="text-xs font-medium text-neutral-400 sm:text-sm">
          {title}
        </span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default ConsolePanel;
