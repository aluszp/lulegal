import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/site/logo";
import { contact, nav } from "@/lib/site";

/* Footer (Figma 641:2898): navy with the line pattern at 5% – the 12px
   tile, on mobile at 60% (7.2px, as the heroes) – and a faint sky line on
   top. Three columns – logo and tagline, page
   links, contact details – stacked on mobile. */
const link = "text-white transition-colors hover:text-coral focus-visible:text-coral";

export function Footer() {
  return (
    <footer className="relative border-t border-sky/5 bg-navy px-6 py-20 text-white md:px-10 lg:px-24 lg:py-[116px]">
      {/* the pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/assets/spec-hover-tile.png')] bg-[length:7.2px_7.2px] opacity-5 md:bg-[length:12px_12px]"
      />
      <div className="relative mx-auto flex max-w-[1248px] flex-col gap-[60px] md:flex-row md:flex-wrap md:gap-x-24 md:gap-y-12 lg:gap-x-[198px]">
        <div className="flex flex-col md:gap-4">
          <Link href="/" aria-label="Lu Legal – strona główna" className="text-white">
            <Logo className="h-7 w-[172px] md:h-9 md:w-[225px]" />
          </Link>
          <p className="font-serif text-xl leading-10 italic md:text-[26px]">piszemy prosto o prawie</p>
        </div>

        <nav aria-label="Stopka">
          <ul className="flex flex-col gap-6 text-base font-medium md:text-xl">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#" className={link}>
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="flex flex-col gap-6 text-base font-medium md:text-xl">
          <li className="flex items-center gap-2">
            <Image src="/assets/icons/mail.svg" alt="" width={20} height={20} />
            <a href={`mailto:${contact.email}`} className={`${link} break-all`}>
              {contact.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Image src="/assets/icons/location.svg" alt="" width={20} height={20} />
            {contact.address}
          </li>
          {contact.people.map((p) => (
            <li key={p.linkedin} className="flex items-center gap-2">
              <Image src="/assets/icons/linkedin.svg" alt="" width={20} height={20} />
              <a href={p.linkedin} target="_blank" rel="noopener" className={link}>
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
