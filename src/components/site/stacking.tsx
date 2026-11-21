"use client";

import { useEffect, useRef } from "react";

/* Stacking layers (see "Stacking" in src/styles/lulegal.css): the home
   hero and the sections of <main> pin and hold, and the next one slides
   over; the contact section (#kontakt) slides over the last of them.
   For each layer this sets:
   - --stick: its pin offset (negative when taller than the screen)
   - --cover: how far the next layer covers it (0 → 1), for its dim
   - its peek strip: while it holds, a strip in the next layer's colour
     rises at the bottom of the screen (up to PEEK of its height). The
     strip belongs to the holding layer, which is pinned meanwhile, so
     nothing moves against the scroll – only the strip's height follows it.

   Every layer renders a <Peek /> as its last child. Once React has taken
   the layer over (hydrated it), the Peek registers it here – so the
   script never touches a section React hasn't finished with, and pages,
   filters and client-side navigation simply add and remove layers.
   Heights are re-measured whenever a layer changes size. */

const PEEK = 0.1; // share of the screen height shown by the end of the hold
const LAYER = ".lx-hero, main > .lx-section:not(.lx-post-hero), #kontakt";
const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep
/* fired after every update of the layers' values (the top bar listens) */
export const STACKED = "lx-stacked";

type Layer = { el: HTMLElement; strip: HTMLElement };
const registered = new Set<Layer>();
let layers: Layer[] = [];
let holds: number[] = [];
let room: number[] = [];
let queued = false;
let measureQueued = false;
let resized: ResizeObserver | null = null;

function collect() {
  layers = [...registered]
    .filter((l) => l.el.isConnected && l.el.matches(LAYER))
    .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
}

function measure() {
  measureQueued = false;
  collect();
  const vh = window.innerHeight;
  layers.forEach(({ el }) => {
    if (el.matches("main > .lx-section")) el.style.setProperty("--stick", `${Math.min(0, vh - el.offsetHeight)}px`);
  });
  holds = layers.map(({ el }) => parseFloat(getComputedStyle(el).marginBottom) || 0);
  // the strip never grows past a layer's bottom padding, so it never covers
  // content (a post's article, whose author box runs to its edge, gets
  // none); the hero's words sit far above its bottom
  room = layers.map(({ el }) =>
    el.classList.contains("lx-hero") ? Infinity : parseFloat(getComputedStyle(el).paddingBottom) || 0
  );
  layers.forEach(({ strip }, i) => {
    strip.style.background = layers[i + 1] ? getComputedStyle(layers[i + 1].el).backgroundColor : "";
  });
  update();
}

function update() {
  queued = false;
  const vh = window.innerHeight;
  layers.forEach(({ el, strip }, i) => {
    const next = layers[i + 1]?.el;
    let h = 0;
    if (next) {
      const P = Math.min(PEEK * vh, room[i]);
      const H = holds[i];
      const nextTop = next.getBoundingClientRect().top;
      if (H && nextTop < vh + H && nextTop >= vh) h = P * ease((vh + H - nextTop) / H); // the hold
      // after the hold: kept (under the real layer, which paints over it)
      // while that layer is on screen – dropping it the moment it is
      // covered would flicker for a frame, most of all scrolling up
      else if (H && nextTop < vh && nextTop > -vh) h = P;
    }
    strip.style.height = `${h.toFixed(1)}px`;
    // at the bottom of the screen, in the holding layer's own coordinates
    if (h) strip.style.top = `${(vh - el.getBoundingClientRect().top - h).toFixed(1)}px`;
    // while the next layer is still below the strip's top edge, it drops
    // its shadow: the same colour as the strip, the two read as one surface
    // (no second edge rising inside the strip). Once its top reaches the
    // strip's edge, the shadow passes to it at that very spot.
    if (next) next.classList.toggle("lx-under-peek", h > 0 && next.getBoundingClientRect().top > vh - h + 0.5);
    const cover = next ? Math.min(Math.max(1 - next.getBoundingClientRect().top / vh, 0), 1) : 0;
    el.style.setProperty("--cover", cover.toFixed(3));
  });
  // the top bar takes its dim and colour from these values: tell it they're fresh
  window.dispatchEvent(new Event(STACKED));
}

const requestUpdate = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(update);
  }
};
const requestMeasure = () => {
  if (!measureQueued) {
    measureQueued = true;
    requestAnimationFrame(measure);
  }
};

function register(layer: Layer) {
  if (registered.size === 0) {
    resized = new ResizeObserver(requestMeasure);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);
    document.fonts.ready.then(requestMeasure);
  }
  registered.add(layer);
  resized!.observe(layer.el);
  requestMeasure();
  return () => {
    registered.delete(layer);
    layer.el.classList.remove("lx-under-peek");
    resized?.unobserve(layer.el);
    layer.el.style.removeProperty("--stick");
    layer.el.style.removeProperty("--cover");
    if (registered.size === 0) {
      resized?.disconnect();
      resized = null;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestMeasure);
    } else requestMeasure();
  };
}

/* The peek strip; also registers its parent (the layer) for stacking */
export function Peek() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const strip = ref.current!;
    const el = strip.parentElement!;
    return register({ el, strip });
  }, []);
  return <div ref={ref} className="lx-peek" aria-hidden />;
}
