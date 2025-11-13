// src/pages/Apps.tsx
import { useMemo } from 'react';
import { useSearchStore } from '../store/search';
import Highlighted from '../components/Highlighted';
import { useFilteredContent } from '../hooks/useFilteredContent';
import appsText from '../assets/apps.txt?raw'; // <- lives under src/assets

export default function Apps() {
  const query = useSearchStore((s) => s.query);

  // turn the raw string into paragraphs once
  const paragraphs = useMemo(
    () =>
      appsText
        .split(/\r?\n\r?\n|(?:\r?\n){1,}/) // blank line OR single newlines
        .map((s) => s.trim())
        .filter(Boolean),
    []
  );

  const content = paragraphs.join('\n');

  const filtered = useFilteredContent(content, query);

  return (
    <section>
      <h1>Apps Page</h1>
      {filtered.length === 0 && <p>No results for “{query}”.</p>}
      {filtered.map((p, i) => (
        <p key={i}>
          <Highlighted text={p} query={query} />
        </p>
      ))}
    </section>
  );
}
