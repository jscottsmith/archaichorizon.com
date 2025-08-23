"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      // Debug: log the event object to see its structure
      console.log("beforeinstallprompt event:", e);
      console.log("Event properties:", Object.getOwnPropertyNames(e));

      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Check if the prompt method exists
      if (typeof deferredPrompt.prompt === "function") {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      } else {
        console.log("Install prompt not available");
        // Fallback: try alternative installation methods
        if ("standalone" in window.navigator) {
          // For iOS Safari
          window.open(window.location.href, "_blank");
        } else {
          // For other browsers, show instructions
          alert(
            'To install this app:\n\nChrome: Click the install icon in the address bar\nFirefox: Click the menu button and select "Install App"\nSafari: Tap the share button and select "Add to Home Screen"'
          );
        }
      }
    } catch (error) {
      console.error("Error during install prompt:", error);
      // Show fallback instructions
      alert(
        'To install this app:\n\nChrome: Click the install icon in the address bar\nFirefox: Click the menu button and select "Install App"\nSafari: Tap the share button and select "Add to Home Screen"'
      );
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-background border rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <Image
            src="/icon-192x192.png"
            alt="Archaic Horizon"
            width={56}
            height={56}
            className="rounded-lg mr-2"
          />
          <div>
            <h3 className="font-semibold text-sm">Install Archaic Horizon</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Add to your home screen for quick access
            </p>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDismiss}
            className="text-xs"
          >
            Not now
          </Button>
          <Button size="sm" onClick={handleInstallClick} className="text-xs">
            Install
          </Button>
        </div>
      </div>
    </div>
  );
}
