import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Playground - Dipelajarin",
  description:
    "Tuliskan dan jalankan kode Anda secara online di playground kami.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="h-screen w-screen overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
