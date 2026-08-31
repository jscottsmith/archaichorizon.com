"use client";

import { createContext, useContext, useState } from "react";

interface AppShellContextValue {
  isNavOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider(props: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <AppShellContext.Provider
      value={{
        isNavOpen,
        openNav: () => setIsNavOpen(true),
        closeNav: () => setIsNavOpen(false),
        toggleNav: () => setIsNavOpen((open) => !open),
      }}
    >
      {props.children}
    </AppShellContext.Provider>
  );
}

export function useAppShell() {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error("useAppShell must be used within AppShellProvider");
  }

  return context;
}
