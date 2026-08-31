"use client";

import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppShell } from "./AppShellContext";

export function MobileNavTrigger(props: { className?: string }) {
  const { openNav } = useAppShell();

  return (
    <button
      type="button"
      aria-label="Open navigation"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "fixed top-[calc(env(safe-area-inset-top)_+_0.5rem)] left-2 z-50 md:hidden",
        props.className
      )}
      onClick={openNav}
    >
      <Menu className="h-4 w-4" />
    </button>
  );
}
