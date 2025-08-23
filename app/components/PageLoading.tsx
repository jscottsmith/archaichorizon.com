import { Loader2 } from "lucide-react";
import { ContentWrapper } from "./ContentWrapper";

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <ContentWrapper>
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin">
          <Loader2 className="h-4 w-4" />
        </div>
        <span className="ml-2">{message}</span>
      </div>
    </ContentWrapper>
  );
}
