"use client";

import { useEffect } from "react";

export default function PWA() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");

        // Check for a newer SW on load and when the tab becomes visible again.
        const checkForUpdate = () => {
          registration.update().catch(() => {});
        };

        checkForUpdate();
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            checkForUpdate();
          }
        });
      } catch (registrationError) {
        console.log("SW registration failed: ", registrationError);
      }
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
