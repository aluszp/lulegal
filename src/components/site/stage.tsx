"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* Scroll-in entrances ("Entrances" in src/styles/lulegal.css), played
   once, every part by its own scroll position:
   - the intro (the squares and heading) once the heading is well up the
     screen (60%) – sections slide in from the bottom, and any sooner it
     would play out of sight at the bottom edge;
   - each card (an element marked data-stage-card) once its top passes
     cardLine of the screen – every card above too, so a fast scroll or a
     jump never leaves one hidden – or once the section's bottom is on
     screen (its last card may never reach the line). Where set, cards also wait for the
     intro (cardsAfter s) and start one after another (step s apart).
   Catch-up: an entrance is decoration and must never hold content back.
   When the visitor scrolls fast (over FAST px/s), or a part is already
   well up the screen when first checked, it shows at once with a short
   fade (.is-quick). Skipped with reduced motion: everything just shows.

   Every section with an entrance renders <Stage kind="…" /> (see
   Section's `stage`); once React has taken the section over, Stage starts
   its entrance. */

export type StageKind = "head" | "specs" | "team" | "reviews" | "blog" | "contact" | "values";

/* per section: cardLine, cardsAfter, step (see above) */
const CONFIG: Record<StageKind, [number, number, number]> = {
  head: [0.8, 0, 0],
  specs: [0.8, 0.8, 0.35], // the heading, then the cards one by one, ≥ 0.35s apart
  team: [0.8, 0.8, 0.35], // (with a lead, home: 1.1s after the heading – see below)
  reviews: [0.8, 0.8, 0.35],
  blog: [0.8, 0.8, 0.35], // home: the post cards, then "Zobacz wszystkie wpisy"
  contact: [0.6, 0.8, 0.6], // the form when well up the screen; the phones ≥ 0.6s after it
  values: [0.8, 0.8, 0.8], // each row only once the one above is readable
};

const FAST = 5000; // px/s: a real fling, not a brisk scroll

/* scroll speed (px/s, smoothed), for the catch-up */
let lastY = 0;
let lastT = 0;
let speed = 0;
let tracking = false;
function scrollSpeed() {
  if (!tracking) {
    tracking = true;
    lastY = window.scrollY;
    lastT = performance.now();
    window.addEventListener(
      "scroll",
      () => {
        const t = performance.now();
        const dt = Math.max(t - lastT, 1);
        speed = 0.6 * speed + 0.4 * ((Math.abs(window.scrollY - lastY) / dt) * 1000);
        lastY = window.scrollY;
        lastT = t;
      },
      { passive: true }
    );
  }
  return performance.now() - lastT > 150 ? 0 : speed; // at rest: 0
}

/* the hidden state goes on with no transition (the content was already
   painted visible, and would otherwise visibly fade out first) */
function hideForEntrance(el: HTMLElement, ...cls: string[]) {
  el.classList.add("lx-anim-init", ...cls);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("lx-anim-init")));
}

type Cleanup = () => void;

function stagedEntrance(section: HTMLElement, kind: StageKind, cards: HTMLElement[]): Cleanup {
  const [cardLine, after, step] = CONFIG[kind];
  // nasz zespół on home: the cards also wait for the lead, which follows the heading
  const cardsAfter = kind === "team" && section.querySelector(".lx-lead") ? 1.1 : after;
  hideForEntrance(section, "lx-stage", `lx-stage--${kind}`);
  // until a card starts to appear it ignores the pointer (no hover, no
  // clicks on something not yet there)
  cards.forEach((c) => c.classList.add("lx-card"));
  const timers: ReturnType<typeof setTimeout>[] = [];
  const goLive = (card: HTMLElement, delay: number) => {
    if (delay > 0.01) timers.push(setTimeout(() => card.classList.add("is-live"), delay * 1000));
    else card.classList.add("is-live");
  };
  let waiting = cards;
  let introAt = 0;
  let lastStart = 0;
  let queued = false;
  function intro(now: number, quick: boolean) {
    if (introAt) return;
    if (quick) section.classList.add("is-quick");
    section.classList.add("is-in");
    introAt = now - (quick ? cardsAfter : 0); // quick: cards needn't wait for it
  }
  function check() {
    queued = false;
    if (jumping) return; // a link is gliding the page here: see land()
    const vh = window.innerHeight;
    const now = performance.now() / 1000;
    const fast = scrollSpeed() > FAST;
    if (!introAt) {
      const head =
        section.querySelector(".lx-squares") ?? section.querySelector(".lx-section-title") ?? section;
      const top = head.getBoundingClientRect().top;
      if (top <= vh * 0.6 || (fast && top < vh)) intro(now, fast || top < vh * 0.25);
    }
    // the section's end is on screen (e.g. pinned, waiting for the next
    // one to slide over it): its last cards can rise no further, so
    // everything on screen enters, wherever it sits
    const atEnd = section.getBoundingClientRect().bottom <= vh + 1;
    waiting = waiting.filter((card) => {
      const top = card.getBoundingClientRect().top;
      const quick = (fast && top < vh) || top < vh * 0.3;
      if (top > vh * cardLine && !quick && !(atEnd && top < vh)) return true;
      if (quick) {
        intro(now, true);
        card.classList.add("is-quick", "is-in");
        lastStart = now;
        card.dataset.start = String(now);
        goLive(card, 0);
        return false;
      }
      let d = 0;
      if (cardsAfter || step) {
        if (cardsAfter && !introAt) return true; // wait for the intro
        const start = Math.max(now, introAt + cardsAfter, lastStart ? lastStart + step : 0);
        lastStart = start;
        d = start - now;
        card.style.setProperty("--d", `${d.toFixed(2)}s`);
      }
      card.dataset.start = String(now + d); // when it begins to fade in (s, page clock)
      card.classList.add("is-in");
      goLive(card, d);
      return false;
    });
    if (introAt && !waiting.length) window.removeEventListener("scroll", request);
  }
  const request = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(check);
    }
  };

  /* A link to this section (e.g. "Napisz do nas" → #kontakt): no checks
     while the page glides here (it would scroll past fast enough for the
     catch-up, and could stop with a card just short of its line); once it
     has landed, the full entrance plays for everything in view – the
     intro, then the cards one after another, as when scrolled to. */
  let jumping = false;
  let landTimer: ReturnType<typeof setTimeout> | undefined;
  function land() {
    if (!jumping) return;
    jumping = false;
    clearTimeout(landTimer);
    window.removeEventListener("scrollend", land);
    const vh = window.innerHeight;
    const now = performance.now() / 1000;
    if (!introAt) {
      section.classList.add("is-in");
      introAt = now;
    }
    waiting = waiting.filter((card) => {
      if (card.getBoundingClientRect().top >= vh) return true; // still below: by its scroll position
      const start = Math.max(now, introAt + cardsAfter, lastStart ? lastStart + step : 0);
      lastStart = start;
      const d = start - now;
      card.style.setProperty("--d", `${d.toFixed(2)}s`);
      card.dataset.start = String(start);
      card.classList.add("is-in");
      goLive(card, d);
      return false;
    });
    if (!waiting.length) window.removeEventListener("scroll", request);
  }
  function jumpHere() {
    jumping = true;
    clearTimeout(landTimer);
    window.addEventListener("scrollend", land);
    landTimer = setTimeout(land, 2500); // browsers without scrollend
    // already there (nothing to scroll): land at once
    let moved = false;
    window.addEventListener("scroll", () => (moved = true), { once: true, passive: true });
    timers.push(setTimeout(() => !moved && land(), 150));
  }
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
    if (a && section.id && a.hash === `#${section.id}` && a.pathname === window.location.pathname) jumpHere();
  };
  document.addEventListener("click", onClick, true);
  // arriving with the address pointing here (/#kontakt)
  if (section.id && window.location.hash === `#${section.id}`) jumpHere();

  window.addEventListener("scroll", request, { passive: true });
  check();
  return () => {
    window.removeEventListener("scroll", request);
    window.removeEventListener("scrollend", land);
    document.removeEventListener("click", onClick, true);
    clearTimeout(landTimer);
    timers.forEach(clearTimeout);
  };
}

/* A detail inside a card (the team position's square, the review stars)
   plays once the whole card is on screen – or, for a card taller than
   the screen, once its top is near the top – `settle` s after that, and
   not before the card has been fading in for half a second. `slack` (a
   share of the screen) lets it go a little sooner. */
function whenWhollySeen(cards: HTMLElement[], play: (card: HTMLElement, delay: number) => void, settle: number, slack = 0): Cleanup {
  let waiting = cards;
  let queued = false;
  function check() {
    queued = false;
    const vh = window.innerHeight;
    const now = performance.now() / 1000;
    waiting = waiting.filter((c) => {
      if (!c.classList.contains("is-in")) return true;
      const r = c.getBoundingClientRect();
      if (!(r.bottom <= vh * (1 + slack) || r.top <= vh * (slack ? 0.5 : 0.2))) return true;
      play(c, Math.max(settle, (Number(c.dataset.start) || 0) + 0.5 - now));
      return false;
    });
    if (!waiting.length) stop();
  }
  const request = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(check);
    }
  };
  window.addEventListener("scroll", request, { passive: true });
  const poll = setInterval(check, 250); // a card can be wholly on screen without a scroll
  function stop() {
    window.removeEventListener("scroll", request);
    clearInterval(poll);
  }
  return stop;
}

function setup(section: HTMLElement, kind: StageKind): Cleanup {
  const cards = [...section.querySelectorAll<HTMLElement>("[data-stage-card]")];
  const cleanups: Cleanup[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  if (kind === "values") {
    const list = section.querySelector<HTMLElement>("ol");
    if (list) hideForEntrance(list, "lx-values-anim");
  }
  cleanups.push(stagedEntrance(section, kind, cards));
  if (kind === "team") {
    // the position's square hops a short moment once (nearly all of) the card is in view
    cleanups.push(
      whenWhollySeen(cards, (m, delay) => {
        m.style.setProperty("--ld", `${delay.toFixed(2)}s`);
        m.classList.add("is-seen");
      }, 0.25, 0.15)
    );
  }
  if (kind === "reviews") {
    // the stars pop in once the whole review is on screen
    section.classList.add("lx-stars-ready");
    cleanups.push(
      whenWhollySeen(cards, (r, delay) => {
        timers.push(setTimeout(() => r.classList.add("stars-in"), delay * 1000));
      }, 0.3)
    );
  }
  return () => {
    cleanups.forEach((c) => c());
    timers.forEach(clearTimeout);
    // back to the plain state (React may set the section up again)
    section.classList.remove("lx-stage", `lx-stage--${kind}`, "is-in", "is-quick", "lx-stars-ready");
    section.querySelector("ol")?.classList.remove("lx-values-anim");
    cards.forEach((c) => {
      c.classList.remove("lx-card", "is-in", "is-quick", "is-live", "is-seen", "stars-in");
      c.style.removeProperty("--d");
      c.style.removeProperty("--ld");
    });
  };
}

/* Starts its parent section's entrance; renders nothing visible. The
   contact section is shared by every page (it lives in the layout), so on
   moving to another page its entrance is set up afresh – as on a page
   loaded from scratch, it plays again there. */
export function Stage({ kind }: { kind: StageKind }) {
  const ref = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return setup(section, kind);
  }, [kind, pathname]);
  return <span ref={ref} hidden />;
}
