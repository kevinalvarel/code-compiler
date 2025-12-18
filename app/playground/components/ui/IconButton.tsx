"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  title?: string;
  className?: string;
}

const IconButton = ({
  icon,
  onClick,
  href,
  title,
  className = "",
}: IconButtonProps) => {
  const baseStyles =
    "flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:px-3 sm:py-2";

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`} title={title}>
        {icon}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      title={title}
    >
      {icon}
    </button>
  );
};

export default IconButton;
