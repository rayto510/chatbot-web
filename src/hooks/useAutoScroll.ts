import { useEffect, useRef } from 'react';

/**
 * Custom hook that automatically scrolls to a ref element when dependencies change.
 * Useful for scrolling to the bottom of a chat or list when new items are added.
 */
export function useAutoScroll<T>(dependency: T) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);

  return scrollRef;
}
