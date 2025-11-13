import { useSearchStore } from '../store/search';
import Highlighted from '../components/Highlighted';
import { useContentLoader } from '../hooks/useContentLoader';
import { useFilteredContent } from '../hooks/useFilteredContent';

export default function Apps() {
  const content = useContentLoader('/src/data/apps.txt');
  const query = useSearchStore((s) => s.query);
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
