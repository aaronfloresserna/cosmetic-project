import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          K-Beauty MX
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-600">
          <Link href="/shop" className="hover:text-neutral-900 transition-colors">
            Tienda
          </Link>
          <Link
            href="/shop"
            className="bg-neutral-900 text-white px-4 py-1.5 rounded-full hover:bg-neutral-700 transition-colors"
          >
            Ver productos
          </Link>
        </nav>
      </div>
    </header>
  );
}
