import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";

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
  title: "Dipelajarin - Online Compiler Platform",
  description:
    "Dipelajarin adalah platform kompilator online yang dirancang untuk kecepatan dan kemudahan dalam mempelajari berbagai bahasa pemrograman. Tulis, jalankan, dan debug kode dalam hitungan detik tanpa perlu menginstal software apapun di perangkat Anda.",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
