"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { Peek } from "@/components/site/stacking";
import { hero } from "@/lib/content";

/* The home page hero: "o prawie dla" and the five audiences. The page
   snaps from word to word; the word in focus is sharp, the others faint
   and blurred; the coral square holds beside the focus position. Styles
   and the entrance: .lx-hero in src/styles/lulegal.css. */

const EYEBROW_HOLD_ROWS = 0.1; // "o prawie dla" stays sharp for this many rows of scroll…
const EYEBROW_FADE_PX = 350; // …then blurs out over this distance
const FADE_OUT_BY = 3; // …and is gone once the fourth word is in focus

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  // the landing page always opens at the top (also on reload and Back),
  // unless a link points to a section; and the entrance (on a visit from
  // another page of the site too – set before this first paint)
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("lx-hero-enter");
      return;
    }
    if (!root.classList.contains("lx-hero-in")) root.classList.add("lx-hero-enter");
    // scrolling down during it shows the end at once (not the browser's
    // own scroll to the top on arriving from another page)
    const finish = () => {
      if (window.scrollY <= 0) return;
      root.classList.add("lx-hero-in", "lx-hero-done");
      window.removeEventListener("scroll", finish);
    };
    window.addEventListener("scroll", finish, { passive: true });
    // played once the font is in (at most 1.5s), two frames after the
    // hidden state is painted
    let cancelled = false;
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!cancelled) root.classList.add("lx-hero-in");
        })
      )
    );
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", finish);
      root.classList.remove("lx-hero-enter", "lx-hero-in", "lx-hero-done", "lx-free-scroll");
    };
  }, []);

  // focus, square, eyebrow and snapping, every scroll frame
  useEffect(() => {
    const heroEl = heroRef.current!;
    const eyebrow = eyebrowRef.current!;
    const items = [...listRef.current!.children] as HTMLElement[];
    const dot = dotRef.current!;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const LAST = items.length - 1;
    let freeScroll = false;
    let jumping = false; // an in-page link is scrolling the page
    let ticking = false;

    function update() {
      ticking = false;
      const row = items[0].offsetHeight;
      const rows = -heroEl.getBoundingClientRect().top / row;
      const q = Math.min(Math.max(rows, 0), LAST); // focus position: 0 at the top, +1 per row
      items.forEach((item, i) => {
        const d = Math.abs(i - q);
        const k = reduce.matches ? (d < 0.5 ? 0 : 1) : Math.min(d, 1);
        (item.firstElementChild as HTMLElement).style.setProperty("--k", k.toFixed(3));
      });
      dot.style.setProperty("--p", q.toFixed(4));

      // snapping off from the last word on (with no snap point below, the
      // page would be pulled back and get stuck); back on once scrolled up
      // past halfway to the word before; off while a link scrolls the page
      if (jumping || rows >= LAST - 0.02) freeScroll = true;
      else if (rows < LAST - 0.5) freeScroll = false;
      root.classList.toggle("lx-free-scroll", freeScroll);

      // "o prawie dla": sharp at first, then blurs out and fades
      const hold = EYEBROW_HOLD_ROWS * row;
      const scrolled = -heroEl.getBoundingClientRect().top - hold;
      const clamp = (v: number) => Math.min(Math.max(v, 0), 1).toFixed(3);
      eyebrow.style.setProperty("--eb", clamp(scrolled / EYEBROW_FADE_PX));
      eyebrow.style.setProperty("--ef", clamp(scrolled / (FADE_OUT_BY * row - hold)));
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // an in-page link (#kontakt…): snapping off until the jump has landed
    let landTimer: ReturnType<typeof setTimeout>;
    const land = () => {
      clearTimeout(landTimer);
      jumping = false;
      window.removeEventListener("scrollend", land);
      onScroll();
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#"]');
      const href = a?.getAttribute("href");
      if (!href || href.length < 2 || !document.querySelector(href)) return;
      jumping = true;
      root.classList.add("lx-free-scroll");
      window.addEventListener("scrollend", land);
      landTimer = setTimeout(land, 2500); // browsers without scrollend
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onClick);
    update();
    document.fonts.ready.then(update); // word widths depend on the web font
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", land);
      document.removeEventListener("click", onClick);
      clearTimeout(landTimer);
    };
  }, []);

  return (
    <section ref={heroRef} className="lx-hero" aria-labelledby="hero-title">
      {hero.words.map((w, n) => (
        <span key={w} className="lx-hero__snap" style={{ "--n": n } as React.CSSProperties} />
      ))}
      {/* the full sentence for screen readers; the visual words are decoration */}
      <h1 id="hero-title" className="sr-only">
        O prawie dla przedsiębiorców, lekarzy, pacjentów, weterynarzy i samorządowców
      </h1>
      <div className="lx-hero__eyebrow-track" aria-hidden>
        <p ref={eyebrowRef} className="lx-hero__eyebrow">
          <span>{hero.eyebrow}</span>
        </p>
      </div>
      <div className="lx-hero__words" aria-hidden>
        <ul ref={listRef} className="lx-hero__list">
          {hero.words.map((word, i) => (
            <li key={word} style={{ "--i": i } as React.CSSProperties}>
              {/* before the script runs: the first word in focus */}
              <span style={{ "--k": i === 0 ? 0 : 1 } as React.CSSProperties}>{word}</span>
            </li>
          ))}
        </ul>
        <div className="lx-hero__dot-track">
          <span ref={dotRef} className="lx-hero__dot" />
        </div>
      </div>
      {/* the next layer's peek while the hero holds (see stacking.tsx) */}
      <Peek />
    </section>
  );
}
