"use client";

import { X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PanelHeader(props: {
  title: string;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-2", props.className)}>
      <h1 className="text-2xl font-bold">{props.title}</h1>
      {props.onClose && (
        <button
          type="button"
          aria-label={props.closeLabel ?? "Close panel"}
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          onClick={props.onClose}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
