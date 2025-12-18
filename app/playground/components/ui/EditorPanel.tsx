"use client";

import { ReactNode } from "react";

interface EditorPanelProps {
  title: string;
  badge?: string;
  children: ReactNode;
}

const EditorPanel = ({ title, badge, children }: EditorPanelProps) => {
  return (
    <div className="flex h-1/2 flex-col md:h-full md:w-1/2">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400 sm:text-sm">
          {title}
        </span>
        {badge && (
          <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-400 capitalize sm:text-xs">
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default EditorPanel;
