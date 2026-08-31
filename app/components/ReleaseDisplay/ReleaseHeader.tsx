"use client";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";

interface ReleaseHeaderProps {
  catNo: string;
}

export function ReleaseHeader({ catNo }: ReleaseHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={ROUTES.COLLECTION}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <Badge className="uppercase" variant="outline">
        {catNo}
      </Badge>
      <Link
        href={ROUTES.HOME}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        <X className="h-4 w-4" />
      </Link>
    </div>
  );
}
