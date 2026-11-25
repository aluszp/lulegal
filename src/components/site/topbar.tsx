"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/site/logo";
import { STACKED } from "@/components/site/stacking";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contact, nav } from "@/lib/site";

/* The menu's open and close icons (Figma: icon/menu, 904:559), 40px, three
   32px lines, square-ended, in the text colour, as thick as the arrows in
   nasze specjalizacje on mobile (ICON_LINE). The close icon is the
   same three lines: as the menu opens they fold from the burger into an X
   (and back as it closes) – .lx-close-icon in lulegal.css. The buttons
   have no background on hover; the icon turns coral. */
const iconButton = "size-10 hover:bg-transparent hover:text-coral focus-visible:text-coral";

// the arrows in nasze specjalizacje: a 4.1642px shaft in an 88px icon, drawn at
// 44px on mobile (see .lx-spec__arrow), so 2.08px
const ICON_LINE = 2.08;

function BurgerIcon() {
  return (
    <svg viewBox="0 0 40 40" width={40} height={40} fill="none" aria-hidden className="size-10">
      <path d="M4 14H36M4 20H36M4 26H36" stroke="currentColor" strokeWidth={ICON_LINE} />
    </svg>
  );
}

function CloseIcon() {
  // the middle line slides out to the right through the burger's own end
  // (x 36), so nothing of it shows beyond the burger's outline
  const clip = useId();
  return (
    <svg viewBox="0 0 40 40" width={40} height={40} fill="none" aria-hidden className="lx-close-icon size-10">
      <defs>
        <clipPath id={clip} clipPathUnits="userSpaceOnUse">
          <rect x={4} y={0} width={32} height={40} />
        </clipPath>
      </defs>
      <path className="lx-close-icon__top" d="M4 14H36" stroke="currentColor" strokeWidth={ICON_LINE} />
      <g clipPath={`url(#${clip})`}>
        <path className="lx-close-icon__mid" d="M4 20H36" stroke="currentColor" strokeWidth={ICON_LINE} />
      </g>
      <path className="lx-close-icon__bottom" d="M4 26H36" stroke="currentColor" strokeWidth={ICON_LINE} />
    </svg>
  );
}

/* Top bar (Figma: Top bar), fixed at the top of every page: the logo,
   Blog / O nas / Kontakt and "Napisz do nas". 104px tall with a 96px edge
   on desktop, 92 / 40 on tablet, 80 / 24 on mobile. On mobile the links
   and "Napisz do nas" move into a menu that slides in from the right (shadcn Sheet).
   Its colour follows the section under it: the patterned page background
   over the heroes, a section's own colour elsewhere (white logo and links
   over navy). */
export function Topbar() {
  const pathname = usePathname();
  const current = (href: string) => (pathname.startsWith(href) ? "page" : undefined);
  const barRef = useRef<HTMLElement>(null);

  // the bar's colour follows the section under it (see "Top bar colour"
  // in lulegal.css), on every scroll frame and on resize
  useEffect(() => {
    const bar = barRef.current!;
    let queued = false;
    function update() {
      queued = false;
      const y = bar.offsetHeight / 2;
      // the last match is the one on top (later sections slide over earlier ones)
      const under = [...document.querySelectorAll<HTMLElement>(".lx-section, footer")].findLast((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      bar.classList.toggle("lx-topbar--solid", !!under);
      // over the hero: dim with it while it is being covered. Kept when the
      // bar turns solid, so the bright pattern never flashes in between
      const hero = document.querySelector<HTMLElement>(".lx-hero");
      const heroCover = hero ? parseFloat(hero.style.getPropertyValue("--cover")) || 0 : 0;
      bar.style.setProperty("--bar-dim", (heroCover * 0.35).toFixed(3));
      bar.classList.toggle("lx-topbar--dark", !!under && (under.classList.contains("bg-navy") || under.tagName === "FOOTER"));
      if (under) {
        // the section's colour, dimmed the way the section is while being
        // covered (its ::after: #0b1426 at cover × 0.35)
        const a = (parseFloat(under.style.getPropertyValue("--cover")) || 0) * 0.35;
        const [r, g, b] = getComputedStyle(under).backgroundColor.match(/\d+/g)!.map(Number);
        const mix = (c: number, d: number) => Math.round(c * (1 - a) + d * a);
        bar.style.setProperty("--bar-solid", `rgb(${mix(r, 11)} ${mix(g, 20)} ${mix(b, 38)})`);
      }
    }
    const request = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    // after the stacking has updated the layers' dims (--cover) for this
    // frame – reading them on scroll would get the previous frame's
    window.addEventListener(STACKED, update);
    window.addEventListener("scroll", request, { passive: true }); // pages without layers
    window.addEventListener("resize", request);
    request();
    return () => {
      window.removeEventListener(STACKED, update);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [pathname]);

  return (
    <header ref={barRef} className="lx-page-bg lx-topbar fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10 md:py-6 lg:px-24 lg:py-7">
      <Link href="/" aria-label="Lu Legal – strona główna" className="rounded-sm">
        <Logo className="h-4 w-[100px] md:h-6 md:w-[150px]" />
      </Link>

      <nav aria-label="Główna" className="flex items-center">
        {/* tablet and desktop: the links in the bar */}
        <ul className="hidden items-center md:flex">
          {nav.map((item, i) => (
            <li key={item.href} className={["lg:w-[123px]", "lg:w-[132px]", "lg:w-[153px]"][i]}>
              <Button asChild variant="link" className="mr-8 lg:mr-0 lg:w-full lg:justify-start">
                <Link href={item.href} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>

        {/* tablet and desktop only: on mobile it is in the menu */}
        <Button asChild className="max-md:hidden">
          <Link href="#kontakt">Napisz do nas</Link>
        </Button>

        {/* mobile: the menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={`${iconButton} md:hidden`} aria-label="Otwórz menu">
              <BurgerIcon />
            </Button>
          </SheetTrigger>
          {/* in the page's motion, no fades either way: the panel slides in
              whole from the screen's edge on the site's ease-out
              (cubic-bezier(0.2, 0.7, 0.2, 1)) and slides back out whole on
              its quick ease-in; the backdrop is there at once and goes as
              the panel leaves the screen */}
          <SheetContent
            side="right"
            showCloseButton={false}
            overlayClassName="data-open:[--tw-enter-opacity:1]! data-closed:duration-300 data-closed:[--tw-exit-opacity:1]!"
            className="gap-0 border-l-0 bg-navy px-8 pt-20 pb-10 text-white data-[side=right]:w-[calc(100%-65px)] data-[side=right]:max-w-sm data-open:duration-500 data-open:ease-[cubic-bezier(0.2,0.7,0.2,1)] data-open:[--tw-enter-opacity:1]! data-open:[--tw-enter-translate-x:100%]! data-closed:duration-300 data-closed:ease-[cubic-bezier(0.5,0,0.8,0.4)] data-closed:[--tw-exit-opacity:1]! data-closed:[--tw-exit-translate-x:100%]!"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Nawigacja strony Lu Legal</SheetDescription>
            {/* close: 24px from the top, 15px from the right (Figma 908:1167) */}
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className={`${iconButton} absolute top-6 right-[15px]`} aria-label="Zamknij menu">
                <CloseIcon />
              </Button>
            </SheetClose>

            {/* the links; the current page's keeps its colour and gets a 12px coral
                square 18px after it, on the lowercase letters (Figma 908:1123) */}
            <ul className="flex flex-col gap-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={current(item.href)}
                      className="inline-flex items-start gap-[18px] text-[46px] leading-[63px] font-normal tracking-[-0.02em] text-white lowercase transition-colors hover:text-coral aria-[current=page]:after:mt-[30px] aria-[current=page]:after:size-3 aria-[current=page]:after:bg-coral aria-[current=page]:after:content-['']"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>

            {/* at the bottom (Figma 908:1152): the phones, as in the contact
                section – number, then name – and under them "Napisz do nas",
                the panel's full width */}
            <div className="mt-auto flex flex-col gap-6">
              <ul className="flex flex-col gap-5">
                {contact.people.map((p) => (
                  <li key={p.tel} className="flex flex-col gap-1">
                    <a href={`tel:${p.tel}`} className="text-xl font-medium transition-colors hover:text-coral">
                      {p.phone}
                    </a>
                    <span className="text-sm font-semibold tracking-[0.1em] text-coral uppercase">{p.name}</span>
                  </li>
                ))}
              </ul>
              <SheetClose asChild>
                <Button asChild className="w-full">
                  <Link href="#kontakt">Napisz do nas</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
