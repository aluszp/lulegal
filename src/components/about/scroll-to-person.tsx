"use client";

import { useEffect } from "react";

/* O nas, arriving from "Dowiedz się więcej" (/o-nas?osoba=maria-luszpinska):
   the page opens at the top, then after a short pause glides down to that
   person's card, which stops 40px under the top bar (its scroll-margin –
   measured where the card will rest, after its entrance's rise).
   A parameter rather than an #anchor, so the browser doesn't jump there
   first. With reduced motion it goes straight there. Renders nothing. */
export function ScrollToPerson() {
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("osoba");
    const card = id ? document.getElementById(id) : null;
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: "instant" });
    const timer = setTimeout(() => {
      // where the card will rest: its box now, less the rise of its
      // scroll-in entrance (it still waits 24px lower, see "Entrances")
      const rise = parseFloat(getComputedStyle(card).translate.split(" ")[1] ?? "0") || 0;
      const margin = parseFloat(getComputedStyle(card).scrollMarginTop) || 0;
      const top = card.getBoundingClientRect().top + window.scrollY - rise - margin;
      window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
    }, reduce ? 0 : 600);
    return () => clearTimeout(timer);
  }, []);
  return null;
}
