"use client";

import Link from "next/link";
import { useState } from "react";

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
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current my-1 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </div>
      </button>

      {/* Navigation Menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-sm border border-foreground/10 rounded-lg shadow-lg transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <nav className="py-2">
          <Link
            href="/"
            className="block px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/collection"
            className="block px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
            onClick={closeMenu}
          >
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
