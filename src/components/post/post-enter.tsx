"use client";

import { useLayoutEffect } from "react";

/* Blog post hero entrance (see .lx-post-enter in lulegal.css): played once
   the font is in (at most 1.5s), two frames after the hidden state is
   painted – also when arriving from another page of the site; scrolling
   down during it shows the end at once. Renders nothing. */
export function PostEnter() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("lx-post-enter");
      return;
    }
    if (!root.classList.contains("lx-post-in")) root.classList.add("lx-post-enter");
    let cancelled = false;
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!cancelled) root.classList.add("lx-post-in");
        })
      )
    );
    // (not the browser's own scroll to the top on arriving)
    const finish = () => {
      if (window.scrollY <= 0) return;
      root.classList.add("lx-post-in", "lx-post-done");
      window.removeEventListener("scroll", finish);
    };
    window.addEventListener("scroll", finish, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", finish);
      root.classList.remove("lx-post-enter", "lx-post-in", "lx-post-done");
    };
  }, []);
  return null;
}
