import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
        <h3 className="mb-2 font-semibold">Description</h3>
        <div className="markdown-content max-w-none text-sm leading-relaxed">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
