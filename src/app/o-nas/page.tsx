import type { Metadata } from "next";

import { ScrollToPerson } from "@/components/about/scroll-to-person";
import { Values } from "@/components/about/values";
import { Reviews } from "@/components/home/reviews";
import { Specializations } from "@/components/home/specializations";
import { Team } from "@/components/home/team";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "O nas – Lu Legal",
  description: "Jesteśmy duetem prawników z Krakowa. Poznaj nas bliżej.",
};

/* /o-nas: the page hero, our specialisations, the full team cards, the
   reviews and our values (the home page's sections reused) */
export default function AboutPage() {
  return (
    <main className="contents">
      {/* "contents": the sections pin against the whole page, not just <main> (see "Stacking" in lulegal.css) */}
      <PageHero
        title="o nas"
        lead="Jesteśmy duetem prawników z Krakowa. Każde z nas wnosi inne doświadczenie, ale podchodzimy do pracy tak samo: spokojnie, rzetelnie i z myślą o człowieku, który do nas przychodzi. Poznaj nas bliżej."
      />
      <Specializations />
      <Team full />
      <Reviews />
      <Values />
      <ScrollToPerson />
    </main>
  );
}
