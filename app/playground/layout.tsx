import { Metadata } from "next";
import "../globals.css";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Playground - Dipelajarin",
  description:
    "Tuliskan dan jalankan kode Anda secara online di playground kami.",
};

export default async function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <html suppressHydrationWarning>
      <body>
        <div className="h-screen w-screen overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
