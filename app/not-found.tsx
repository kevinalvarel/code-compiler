import Link from "next/link";
import "./globals.css";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 text-white overflow-x-hidden">
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
        <FaExclamationTriangle className="h-12 w-12 text-red-800" />
      </div>

      {/* Error Code */}
      <h1 className="mb-2 text-8xl font-bold text-neutral-100">404</h1>

      {/* Title */}
      <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
        Halaman Tidak Ditemukan
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-md text-center text-neutral-400">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan. Coba
        periksa kembali URL atau kembali ke beranda.
      </p>

      {/* Back to Home Button */}
      <Link href="/" className="flex items-center gap-2 rounded-lg ">
        <Button variant={"destructive"}>
          <FaHome className="h-4 w-4" />
          Kembali ke Beranda
        </Button>
      </Link>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
      </div>
    </div>
  );
}
