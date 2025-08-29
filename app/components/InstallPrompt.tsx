"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { ArrowBigDown, ArrowDownSquareIcon } from "lucide-react";

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
    <Card className="fixed bottom-2 left-2 right-2 z-50 mx-auto max-w-md p-0 md:bottom-auto md:left-4 md:right-4 md:top-4 md:ml-0">
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center">
            <Image
              src="/icon-192x192.png"
              alt="Archaic Horizon"
              width={56}
              height={56}
              className="mr-3 h-12 w-12 flex-shrink-0 rounded-lg md:h-14 md:w-14"
            />
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-sm">
                Install Archaic Horizon
              </CardTitle>
              <CardDescription className="mt-1 truncate text-xs">
                Add this app to your home screen
              </CardDescription>
            </div>
          </div>
          <CardAction className="flex gap-2 self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              className="text-xs"
            >
              Dismiss
            </Button>
            <Button size="sm" onClick={handleInstallClick} className="text-xs">
              <ArrowDownSquareIcon className="mr-1 h-4 w-4" />
              Install
            </Button>
          </CardAction>
        </div>
      </CardContent>
    </Card>
  );
}
