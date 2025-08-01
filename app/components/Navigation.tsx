"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Home, Disc3, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-foreground hover:text-foreground/80 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Menu */}
      <div
        className={`absolute z-50 top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-sm border border-foreground/10 rounded-lg shadow-lg transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <nav className="py-2">
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
            onClick={closeMenu}
          >
            <Home className="w-4 h-4 mr-3" />
            Home
          </Link>
          <Link
            href="/collection"
            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
            onClick={closeMenu}
          >
            <Disc3 className="w-4 h-4 mr-3" />
            Collection
          </Link>
        </nav>
      </div>

      {/* Backdrop to close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
