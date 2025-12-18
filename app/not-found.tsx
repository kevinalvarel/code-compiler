import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white overflow-x-hidden">
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/20">
        <FaExclamationTriangle className="h-12 w-12 text-indigo-400" />
      </div>

      {/* Error Code */}
      <h1 className="mb-2 text-8xl font-bold text-indigo-500">404</h1>

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
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        <FaHome className="h-4 w-4" />
        Kembali ke Beranda
      </Link>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
    </div>
  );
}
