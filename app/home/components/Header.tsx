import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Code2 } from "lucide-react";
import { SignoutButton } from "@/components/auth/signout-button";

const Header = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <header className="flex justify-between items-center mb-12">
      <div className="flex items-center gap-2">
        <Code2 className="w-8 h-8 text-white" />
        <span className="text-xl font-bold tracking-tight">CodeCompiler</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-neutral-400">{session.user.email}</div>
        <SignoutButton />
      </div>
    </header>
  );
};

export default Header;
