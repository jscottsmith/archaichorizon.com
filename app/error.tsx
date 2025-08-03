"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center px-6">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Something went wrong
          </h1>

          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Error Details
              </summary>
              <div className="mt-2 p-4 bg-muted rounded-md">
                <p className="text-sm font-mono text-destructive break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button onClick={reset} className="flex-1 sm:flex-none">
              Try Again
            </Button>

            <Button variant="outline" asChild className="flex-1 sm:flex-none">
              <Link href="/">Go Home</Link>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Still having trouble?{" "}
              <Link href="/collection" className="text-primary hover:underline">
                Browse our collection
              </Link>{" "}
              or{" "}
              <a
                href="mailto:support@archaichorizon.com"
                className="text-primary hover:underline"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
