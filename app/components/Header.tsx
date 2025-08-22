"use client";
import Link from "next/link";
import { useState } from "react";
import { useEventListener } from "usehooks-ts";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import Logo, { LogoAbbreviated } from "./Logo";
import { Navigation } from "./Navigation";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Show header when scrolling up or at the top
    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setIsVisible(true);
    } else {
      // Hide header when scrolling down
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEventListener("scroll", handleScroll, undefined, { passive: true });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex px-4 h-20 justify-between items-center transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <ThemeSwitcher />
      {/* Logo/Brand */}
      <div className="flex items-center">
        <Link href="/" className="text-foreground/80 hover:text-foreground">
          <LogoAbbreviated className="h-4 group" />
        </Link>
      </div>
      <Navigation />
    </header>
  );
}
