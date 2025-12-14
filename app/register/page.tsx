import { RegisterForm } from "@/components/register-form";
import LightRays from "@/components/react-bits/LightRays";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (session) {
    return redirect("/home");
  }

  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <LightRays />
      </div>

      {/* Content Layer */}
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
