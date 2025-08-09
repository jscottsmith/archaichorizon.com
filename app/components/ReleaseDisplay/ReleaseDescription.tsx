import ReactMarkdown from "react-markdown";
import { Separator } from "@/components/ui/separator";

interface ReleaseDescriptionProps {
  description: string;
}

export function ReleaseDescription({ description }: ReleaseDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Separator />
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <div className="markdown-content max-w-none leading-relaxed text-sm">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
