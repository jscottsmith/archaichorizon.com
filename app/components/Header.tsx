import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex p-4 justify-between items-center h-16">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Archaic Horizon
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/collection"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Collection
          </Link>
        </nav>
      </div>
    </header>
  );
}
