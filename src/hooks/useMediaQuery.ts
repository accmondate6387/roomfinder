// ==================================================
// useMediaQuery Hook
// ==================================================

import { useState, useEffect } from "react";

/**
 * Track CSS media query matches.
 * Initializes synchronously on the client to avoid a flash/extra render.
 * Returns false during SSR (no window).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // Initialize synchronously on client to avoid an extra render
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    // Sync in case query changed after mount
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
