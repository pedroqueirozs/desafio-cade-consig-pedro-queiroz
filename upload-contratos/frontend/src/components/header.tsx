"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  function handleLogout() {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <nav className="flex gap-4">
        <Link href="/contracts" className="font-medium hover:underline">
          Contratos
        </Link>

        <Link href="/upload" className="font-medium hover:underline">
          Upload CSV
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Sair
      </button>
    </header>
  );
}
