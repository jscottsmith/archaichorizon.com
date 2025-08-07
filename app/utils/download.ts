/**
 * Triggers a file download by creating a temporary link element
 * @param url - The URL of the file to download
 * @param filename - The desired filename for the downloaded file
 */
export function triggerDownload(url: string, filename: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
