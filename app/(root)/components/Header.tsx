import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconCode,
  IconBook,
  IconLogin,
} from "@tabler/icons-react";

export function Header() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Playground",
      icon: (
        <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/playground",
    },
    {
      title: "Dokumentasi",
      icon: (
        <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/docs",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com",
    },
    {
      title: "Login",
      icon: (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/login",
    },
  ];

  return (
    <header className="fixed bottom-4 left-0 right-0 z-50 flex items-center justify-center">
      <FloatingDock items={links} />
    </header>
  );
}
