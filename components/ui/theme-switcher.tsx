"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsClient } from "usehooks-ts";

import { Button } from "../../app/components/ui/button";

const themes = ["light", "dark", "system"] as const;

type Theme = (typeof themes)[number];

function isTheme(value: string | undefined): value is Theme {
  return themes.includes(value as Theme);
}

export function ThemeSwitcher() {
  const isClient = useIsClient();
  const { theme, setTheme } = useTheme();
  const currentTheme = isTheme(theme) ? theme : "system";

  function cycleTheme() {
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  }

  if (!isClient) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label="Toggle theme"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={cycleTheme}
      aria-label={`Theme: ${currentTheme}. Click to change.`}
    >
      {currentTheme === "light" && <Sun className="h-4 w-4" />}
      {currentTheme === "dark" && <Moon className="h-4 w-4" />}
      {currentTheme === "system" && <Monitor className="h-4 w-4" />}
    </Button>
  );
}
