"use client";

import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";

export function PanelHeader(props: {
  title: string;
  backHref?: string;
  onBack?: () => void;
  closeHref?: string;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}) {
  const backHref = props.backHref ?? (props.onBack ? undefined : ROUTES.HOME);
  const showClose = Boolean(props.onClose || props.closeHref);

  const backButtonClassName = cn(
    buttonVariants({ variant: "floating", size: "icon-sm" })
  );
  const closeButtonClassName = cn(
    buttonVariants({ variant: "floating", size: "icon-sm" })
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-20 hidden items-center gap-2 px-4 py-3 md:flex",
        props.className
      )}
    >
      <div className="relative z-10 flex size-8 shrink-0 items-center justify-start">
        {props.onBack ? (
          <button
            type="button"
            aria-label="Go back"
            className={backButtonClassName}
            onClick={props.onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <Link
            href={backHref!}
            aria-label="Go back"
            className={backButtonClassName}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        )}
      </div>

      <h1 className="min-w-0 flex-1 truncate text-left text-xl font-bold">
        {props.title}
      </h1>

      <div className="relative z-10 ml-auto flex size-8 shrink-0 items-center justify-end">
        {showClose &&
          (props.onClose ? (
            <button
              type="button"
              aria-label={props.closeLabel ?? "Close panel"}
              className={closeButtonClassName}
              onClick={props.onClose}
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href={props.closeHref!}
              aria-label={props.closeLabel ?? "Close panel"}
              className={closeButtonClassName}
            >
              <X className="h-4 w-4" />
            </Link>
          ))}
      </div>
    </header>
  );
}
