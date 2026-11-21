import Link from "next/link";

import { Section, SectionTitle, Squares } from "@/components/site/section";
import { specializations } from "@/lib/content";

/* nasze specjalizacje: five cards on navy, each opening the blog filtered
   to its category (the blog opens at the top, then scrolls to the list).
   Card look and hover: .lx-spec in src/styles/lulegal.css. */
export function Specializations() {
  return (
    <Section tone="navy" stage="specs" id="specjalizacje" aria-labelledby="specjalizacje-title">
      <Squares />
      <SectionTitle id="specjalizacje-title">nasze specjalizacje</SectionTitle>
      <ul className="mt-12 md:mt-[72px] lg:mt-[100px]">
        {specializations.map((s) => (
          <li key={s.category} data-stage-card>
            <Link href={`/blog?kategoria=${s.category}&przewin`} className="lx-spec">
              <span className="relative flex max-w-[748px] flex-col gap-4">
                <span className="lx-spec__name text-[length:var(--title)] leading-[normal]">{s.name}</span>
                <span className="lx-spec__desc text-[length:var(--body)] leading-[normal] font-medium">{s.description}</span>
              </span>
              <span className="lx-spec__arrow" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
