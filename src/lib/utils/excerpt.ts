const MAX_EXCERPT_LENGTH = 300;

export function extractExcerpt(content: string): string {
  return content.slice(0, MAX_EXCERPT_LENGTH);
}
