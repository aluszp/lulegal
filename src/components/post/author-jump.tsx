"use client";

import { useEffect } from "react";

/* Blog posts: "Autor: …" (#autor) leads to the author at the end of the
   article. The browser's own jump would land in the hold after the
   article, where the contact section is already sliding over it; this
   stops where the article's bottom meets the bottom of the screen – the
   author wholly in view, nothing over it yet. Also for a link that
   arrives with #autor. Renders nothing. */
export function AuthorJump() {
  useEffect(() => {
    const author = document.getElementById("autor");
    const article = author?.closest<HTMLElement>(".lx-section");
    if (!author || !article) return;
    const target = () => {
      // the article's bottom in the page: the next layer's top less the hold
      const next = document.getElementById("kontakt");
      const hold = parseFloat(getComputedStyle(article).marginBottom) || 0;
      const bottom = next
        ? next.getBoundingClientRect().top + window.scrollY - hold
        : article.getBoundingClientRect().bottom + window.scrollY;
      return Math.max(0, bottom - window.innerHeight);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('a[href="#autor"]')];
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", "#autor");
      window.scrollTo({ top: target(), behavior: reduce ? "instant" : "smooth" });
    };
    links.forEach((a) => a.addEventListener("click", onClick));
    if (window.location.hash === "#autor") document.fonts.ready.then(() => window.scrollTo({ top: target(), behavior: "instant" }));
    return () => links.forEach((a) => a.removeEventListener("click", onClick));
  }, []);
  return null;
}
