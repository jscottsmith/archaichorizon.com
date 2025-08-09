"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { splitSubject } from "../../utils/subject";

interface ReleaseDetailsProps {
  subject?: string;
  licenseUrl: string;
}

export function ReleaseDetails({ subject, licenseUrl }: ReleaseDetailsProps) {
  return (
    <div className="space-y-4">
      <Separator />
      <div>
        <h3 className="font-semibold mb-4">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {subject && (
            <div className="md:col-span-1">
              <span className="font-medium">Tags:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {splitSubject(subject).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="md:col-span-1 self-end">
            <span className="font-medium">License:</span>
            <Button variant="link" className="ml-2 p-0 h-auto" asChild>
              <a href={licenseUrl} target="_blank" rel="noopener noreferrer">
                View License
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
