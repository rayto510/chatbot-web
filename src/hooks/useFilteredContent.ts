import { useMemo } from 'react';

/**
 * Custom hook for filtering content by a search query.
 * Splits content into paragraphs and filters them based on the query.
 */
export function useFilteredContent(content: string, query: string) {
  const paragraphs = useMemo(
    () => content.split(/\n+/).filter((p) => p.trim() !== ''),
    [content]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return paragraphs;
    const q = query.toLowerCase();
    return paragraphs.filter((p) => p.toLowerCase().includes(q));
  }, [paragraphs, query]);

  return filtered;
}
