"use client";

import { Button } from "@/app/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

interface ReleaseHeaderProps {
  catNo: string;
}

export function ReleaseHeader({ catNo }: ReleaseHeaderProps) {
  return (
    <CardHeader className="px-3 md:px-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/collection">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <CardTitle>
          <Badge className="uppercase" variant="outline">
            {catNo}
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <X className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Separator />
    </CardHeader>
  );
}
