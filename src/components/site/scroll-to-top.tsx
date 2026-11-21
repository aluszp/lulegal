"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* Moving to another page opens it at the top. (Next.js does this itself
   only when the new page's first element isn't already on screen – and
   our <main> has no box of its own, `display: contents`, for the
   stacking, so it would skip it and keep the old scroll position.)
   Not for:
   - a link to a place on the page (#filtry, #kontakt…): it goes there
   - Back / Forward: the browser's own return to where you were
   - a change of the address on the same page (the blog filters)
   Renders nothing. */
export function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false; // a fresh page load: the browser decides
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
