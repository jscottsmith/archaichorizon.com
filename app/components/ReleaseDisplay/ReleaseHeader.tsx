"use client";

import { Button } from "@/app/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/app/constants/routes";

interface ReleaseHeaderProps {
  catNo: string;
}

export function ReleaseHeader({ catNo }: ReleaseHeaderProps) {
  return (
    <CardHeader className="px-3 md:px-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" render={<Link href={ROUTES.COLLECTION} />}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle>
          <Badge className="uppercase" variant="outline">
            {catNo}
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" render={<Link href={ROUTES.HOME} />}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
}
