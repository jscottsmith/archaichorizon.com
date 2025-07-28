/**
 * Replace URL parameters based on key/value pairs from an object
 * @param url - The URL template with parameters (e.g., "/api/release/{catNo}")
 * @param params - Object containing key/value pairs for parameter replacement
 * @returns The URL with parameters replaced
 */
export function replaceUrlParams(
  url: string,
  params: Record<string, string | number>
): string {
  let result = url;

  // Replace each parameter in the URL
  Object.entries(params).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, "g");
    result = result.replace(regex, String(value));
  });

  return result;
}
