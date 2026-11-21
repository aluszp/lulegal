"use client";

import { useEffect, useRef, useState } from "react";

/* Spis treści: the post's parts as links. The part being read is coral,
   with one square that glides to it: the last heading that has passed
   the upper third of the screen, or the last part once the article's end
   is on screen. Styles: .lx-toc in src/styles/lulegal.css. */
export function Toc({ parts }: { parts: { id: string; title: string }[] }) {
  const [current, setCurrent] = useState(0);
  const [markerY, setMarkerY] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [glide, setGlide] = useState(false); // no glide on the first placement

  // which part is being read
  useEffect(() => {
    let queued = false;
    function update() {
      queued = false;
      const line = window.innerHeight / 3;
      let i = 0;
      parts.forEach((p, k) => {
        const el = document.getElementById(p.id);
        if (el && el.getBoundingClientRect().top <= line) i = k;
      });
      const article = navRef.current?.closest("section");
      if (article && article.getBoundingClientRect().bottom <= window.innerHeight + 1) i = parts.length - 1;
      setCurrent(i);
    }
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [parts]);

  // the square beside the current link (measured, as titles wrap)
  useEffect(() => {
    function place() {
      const nav = navRef.current;
      const link = nav?.querySelector<HTMLElement>(`a[href="#${parts[current]?.id}"]`);
      if (nav && link) setMarkerY(link.getBoundingClientRect().top - nav.getBoundingClientRect().top);
    }
    place();
    document.fonts.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [current, parts]);

  useEffect(() => {
    if (markerY === null || glide) return;
    const frame = requestAnimationFrame(() => setGlide(true)); // after the first placement is painted
    return () => cancelAnimationFrame(frame);
  }, [markerY, glide]);

  return (
    <nav ref={navRef} className="lx-toc" aria-labelledby="toc-title">
      <p className="lx-toc__title" id="toc-title">
        Spis treści
      </p>
      <ol className="flex flex-col gap-6">
        {parts.map((p, i) => (
          <li key={p.id}>
            <a href={`#${p.id}`} aria-current={i === current ? "true" : undefined}>
              {p.title}
            </a>
          </li>
        ))}
      </ol>
      <span
        aria-hidden
        className="lx-toc__marker"
        style={{
          translate: `0 ${markerY ?? 0}px`,
          opacity: markerY === null ? 0 : 1,
          transition: glide ? undefined : "none",
        }}
      />
    </nav>
  );
}
