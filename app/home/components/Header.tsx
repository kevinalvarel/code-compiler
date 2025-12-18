import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Code2 } from "lucide-react";
import { SignoutButton } from "@/components/auth/signout-button";

const Header = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 sm:h-10 sm:w-10">
          <Code2 className="h-5 w-5 text-indigo-400 sm:h-6 sm:w-6" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
          Pelajarin Playground
        </span>
      </div>

      {/* User Info & Signout */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-medium text-indigo-400 sm:h-9 sm:w-9 sm:text-sm">
            {session.user.email?.charAt(0).toUpperCase()}
          </div>
          <span className="max-w-[150px] truncate text-xs text-neutral-400 sm:max-w-[200px] sm:text-sm">
            {session.user.email}
          </span>
        </div>
        <SignoutButton />
      </div>
    </header>
  );
};

export default Header;
