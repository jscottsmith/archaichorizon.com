"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PreviousButton } from "./PreviousButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { NextButton } from "./NextButton";

export const MainControls = React.memo(function MainControls({
  className,
  iconSize,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <PreviousButton iconSize={iconSize} />
      <PlayPauseButton iconSize={iconSize} className="h-12 w-12" />
      <NextButton iconSize={iconSize} />
    </div>
  );
});
