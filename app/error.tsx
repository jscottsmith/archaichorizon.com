"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md px-6 text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="h-8 w-8 text-destructive"
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
              <div className="mt-2 rounded-md bg-muted p-4">
                <p className="font-mono text-sm break-all text-destructive">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </details>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset} className="flex-1 sm:flex-none">
              Try Again
            </Button>

            <Link
              href={ROUTES.HOME}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 sm:flex-none"
              )}
            >
              Go Home
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Still having trouble?{" "}
              <Link
                href={ROUTES.COLLECTION}
                className="text-primary hover:underline"
              >
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
