"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

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

/* Top bar (Figma: Top bar), fixed at the top of every page: the logo,
   Blog / O nas / Kontakt and "Napisz do nas". 104px tall with a 96px edge
   on desktop, 92 / 40 on tablet, 80 / 16 on mobile. On mobile the links
   move into a menu that slides in from the right (shadcn Sheet).
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
    <header ref={barRef} className="lx-page-bg lx-topbar fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-5 md:px-10 md:py-6 lg:px-24 lg:py-7">
      <Link href="/" aria-label="Lu Legal – strona główna" className="rounded-sm">
        <Logo className="h-[18px] w-[112px] md:h-6 md:w-[150px]" />
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

        <Button asChild>
          <Link href="#kontakt">Napisz do nas</Link>
        </Button>

        {/* mobile: the menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2 md:hidden" aria-label="Otwórz menu">
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85%] max-w-sm gap-0 border-l-0 bg-navy px-6 pt-20 pb-10 text-white [&_[data-slot=sheet-close]]:top-6 [&_[data-slot=sheet-close]]:right-4 [&_[data-slot=sheet-close]_svg]:size-6"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Nawigacja strony Lu Legal</SheetDescription>

            <ul className="flex flex-col gap-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={current(item.href)}
                      className="font-serif text-5xl text-white italic transition-colors hover:text-coral aria-[current=page]:text-coral"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-6">
              <SheetClose asChild>
                <Button asChild className="self-start">
                  <Link href="#kontakt">Napisz do nas</Link>
                </Button>
              </SheetClose>
              {/* the phones, as in the contact section: number, then name */}
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
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
