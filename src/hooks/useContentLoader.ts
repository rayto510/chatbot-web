import { useEffect, useState } from 'react';

/**
 * Custom hook for loading text content from a URL.
 * Returns the loaded content and loading state.
 */
export function useContentLoader(url: string) {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(url)
      .then((r) => r.text())
      .then(setContent);
  }, [url]);

  return content;
}
