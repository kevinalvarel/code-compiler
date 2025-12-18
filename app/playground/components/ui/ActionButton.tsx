"use client";

import { ReactNode } from "react";

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  title?: string;
  children: ReactNode;
  className?: string;
}

const ActionButton = ({
  onClick,
  disabled = false,
  variant = "secondary",
  size = "md",
  title,
  children,
  className = "",
}: ActionButtonProps) => {
  const baseStyles =
    "flex items-center gap-1.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
      "border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800",
    ghost: "text-neutral-400 hover:bg-neutral-800 hover:text-white",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-[10px] sm:px-3 sm:text-xs",
    md: "p-2 text-sm sm:px-3 sm:py-2",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
