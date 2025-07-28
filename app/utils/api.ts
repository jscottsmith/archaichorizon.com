/**
 * Utility functions for API URL construction
 */

/**
 * Construct a full API URL
 * @param path - The API path (e.g., '/api/collection')
 * @returns The full API URL
 */
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}
