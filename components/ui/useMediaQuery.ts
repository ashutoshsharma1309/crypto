"use client";

import { useEffect, useState } from "react";

/**
 * Matches a media query on the client. Returns `false` on the server and the
 * first client paint, then the real value after mount — so layout that depends
 * on it stays SSR-safe and only upgrades once we know the viewport.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
