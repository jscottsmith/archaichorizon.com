/**
 * Splits a subject string into an array of individual values.
 * If the subject is already an array, returns it unchanged.
 *
 * @param subject - The subject field from metadata, can be string or string[]
 * @returns Array of subject values
 */
export function splitSubject(subject: string | string[] | undefined): string[] {
  if (!subject) return [];

  if (Array.isArray(subject)) {
    return subject;
  }

  if (typeof subject === "string") {
    return subject
      .split(";")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }
  return [];
}
