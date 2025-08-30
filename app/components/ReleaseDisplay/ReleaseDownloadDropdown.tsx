"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { triggerDownload } from "../../utils/download";
import { Download, ChevronDown } from "lucide-react";
import { replaceUrlParams } from "../../utils/url";
import { IA } from "../../constants/ia";
import type { IAFile } from "../../types/ia";

interface ReleaseDownloadDropdownProps {
  files: IAFile[];
  identifier: string;
}

export function ReleaseDownloadDropdown({
  files,
  identifier,
}: ReleaseDownloadDropdownProps) {
  const zipFiles = files.filter(
    (file) => file.source === "original" && file.format.toUpperCase() === "ZIP"
  );

  if (zipFiles.length === 0) {
    return null;
  }

  if (zipFiles.length === 1) {
    // Single file - show as a button
    const file = zipFiles[0];
    const url = replaceUrlParams(IA.serve.url, {
      identifier,
      filename: file.name,
    });

    const handleDownload = () => {
      triggerDownload(url, file.name);
    };

    return (
      <Button
        onClick={handleDownload}
        variant="ghost"
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Download
      </Button>
    );
  }

  // Multiple files - show as dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {zipFiles.map((file) => {
          const url = replaceUrlParams(IA.serve.url, {
            identifier,
            filename: file.name,
          });

          const handleDownload = () => {
            triggerDownload(url, file.name);
          };

          return (
            <DropdownMenuItem key={file.name} onClick={handleDownload}>
              {file.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
