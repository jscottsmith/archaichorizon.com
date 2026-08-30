import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { splitSubject } from "../../utils/subject";

interface ReleaseDetailsProps {
  subject?: string;
  licenseUrl?: string;
}

export function ReleaseDetails({ subject, licenseUrl }: ReleaseDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-4 font-semibold">Details</h3>
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
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
          {licenseUrl && (
            <div className="self-end md:col-span-1">
              <span className="font-medium">License:</span>
              <a
                href={licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "link" }), "ml-2 h-auto p-0")}
              >
                View License
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
