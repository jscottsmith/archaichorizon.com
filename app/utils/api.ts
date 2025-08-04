/**
 * Utility functions for API URL construction
 */

/**
 * Get the base URL for the application
 * Handles both client and server environments
 * @returns The base URL
 */
function getBaseUrl(): string {
  // Check if we're on the server side
  if (typeof window === "undefined") {
    // Server-side: use environment variables or construct from available data
    if (process.env.VERCEL_URL) {
      // Vercel deployment
      return `https://${process.env.VERCEL_URL}`;
    }

    // For local development server-side rendering
    return "http://localhost:3000";
  }

  // Client-side: use relative URLs
  return "";
}

/**
 * Construct a full API URL
 * @param path - The API path (e.g., '/api/collection')
 * @returns The full API URL
 */
export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl()}${cleanPath}`;
}
