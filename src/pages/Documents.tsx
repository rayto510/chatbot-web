// src/pages/Documents.tsx
import { useMemo } from 'react';
import { useSearchStore } from '../store/search';
import Highlighted from '../components/Highlighted';
import { useFilteredContent } from '../hooks/useFilteredContent';
import documentsText from '../assets/documents.txt?raw';

export default function Documents() {
  const query = useSearchStore((s) => s.query);

  const paragraphs = useMemo(
    () =>
      documentsText
        .split(/\r?\n\r?\n|(?:\r?\n){1,}/)
        .map((s) => s.trim())
        .filter(Boolean),
    []
  );

  const content = paragraphs.join('\n');

  const filtered = useFilteredContent(content, query);

  return (
    <section>
      <h1>Documents Page</h1>
      {filtered.length === 0 && <p>No results for “{query}”.</p>}
      {filtered.map((p, i) => (
        <p key={i}>
          <Highlighted text={p} query={query} />
        </p>
      ))}
    </section>
  );
}
