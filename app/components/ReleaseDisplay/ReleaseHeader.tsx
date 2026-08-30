"use client";

import { buttonVariants } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
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
    <CardHeader className="px-3 md:px-6">
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.COLLECTION}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <CardTitle>
          <Badge className="uppercase" variant="outline">
            {catNo}
          </Badge>
        </CardTitle>
        <Link
          href={ROUTES.HOME}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <X className="h-4 w-4" />
        </Link>
      </div>
    </CardHeader>
  );
}
