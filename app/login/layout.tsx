import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dipelajarin - Masuk",
  description:
    "Masuk ke Dipelajarin untuk mulai belajar berbagai bahasa pemrograman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={` ${poppins.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "#171717",
              border: "1px solid #262626",
            },
          }}
        />
      </body>
    </html>
  );
}
