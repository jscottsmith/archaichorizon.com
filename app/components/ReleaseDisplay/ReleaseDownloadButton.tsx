"use client";

import { Button } from "../ui/button";
import { triggerDownload } from "../../utils/download";
import { Download } from "lucide-react";

interface ReleaseDownloadButtonProps {
  url: string;
  filename: string;
}

export function ReleaseDownloadButton({
  url,
  filename,
}: ReleaseDownloadButtonProps) {
  const handleDownload = () => {
    triggerDownload(url, filename);
  };

  return (
    <Button
      onClick={handleDownload}
      variant="ghost"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      {filename}
    </Button>
  );
}
