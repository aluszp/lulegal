import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/site/page-hero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt – Lu Legal",
  description: "Napisz lub zadzwoń – odpowiadamy w dni robocze w ciągu 24 godzin, bezpłatnie i bez zobowiązań.",
};

/* /kontakt: the page hero with the e-mail and address; the contact form
   and phones follow (the shared contact section, from the layout) */
export default function ContactPage() {
  return (
    <main className="contents">
      {/* "contents": the sections pin against the whole page, not just <main> (see "Stacking" in lulegal.css) */}
      <PageHero
        title="kontakt"
        lead="Napisz lub zadzwoń – porozmawiasz bezpośrednio z prawnikiem, który zajmie się Twoją sprawą. Odpowiadamy w dni robocze w ciągu 24 godzin, bezpłatnie i bez zobowiązań."
        className="lx-page-hero--contact"
      >
        <ul className="lx-page-hero__contacts">
          <li>
            <Image src="/assets/icons/mail-32.svg" alt="" width={32} height={32} />
            <a href={`mailto:${contact.email}`} className="tracking-[0.02em] [overflow-wrap:anywhere] transition-colors hover:text-coral focus-visible:text-coral">
              {contact.email}
            </a>
          </li>
          <li>
            <Image src="/assets/icons/location-32.svg" alt="" width={32} height={32} />
            {contact.address}
          </li>
        </ul>
      </PageHero>
    </main>
  );
}
