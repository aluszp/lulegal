import Image from "next/image";
import Link from "next/link";

import { Section, SectionTitle, Squares } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { team, teamIntro } from "@/lib/content";
import { contact } from "@/lib/site";

/* nasz zespół, in two versions:
   - home (default): the lead, then a card per person with the short bio
     and "Dowiedz się więcej", leading to their card on O nas
   - full (O nas): no lead; each card has the full bio, LinkedIn and phone
   Card layout: .lx-member in src/styles/lulegal.css. */
export function Team({ full = false }: { full?: boolean }) {
  return (
    <Section tone="sky" stage="team" id={full ? "zespol" : "o-nas"} aria-labelledby="zespol-title">
      <Squares />
      <SectionTitle id="zespol-title">nasz zespół</SectionTitle>
      {!full && (
        <p className="lx-lead mt-8 text-[length:var(--lead)] font-medium">
          {teamIntro[0]}
          <br />
          {teamIntro[1]}
        </p>
      )}

      <div className="mt-[var(--head-gap)] flex flex-col gap-10">
        {team.map((m) => {
          const person = contact.people.find((p) => p.name === m.name)!;
          return (
            <article key={m.slug} id={full ? m.slug : undefined} className="lx-member" data-stage-card>
              <Image
                className="lx-member__photo"
                src={m.photo}
                alt={m.name}
                width={640}
                height={640}
                sizes="(max-width: 767px) 360px, (max-width: 1100px) 360px, 640px"
              />
              <div className="lx-member__body">
                <div className="lx-member__head">
                  <div className="flex flex-col gap-2">
                    <p className="lx-label text-coral">{m.role}</p>
                    <h3 className="max-w-[475px] text-[length:var(--title)] font-normal">{m.name}</h3>
                  </div>
                  {full ? (
                    <div className="flex max-w-[604px] flex-col gap-[1.35em] text-[length:var(--body)] font-medium">
                      {m.about.map((para) => (
                        <p key={para.slice(0, 20)}>{para}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="max-w-[604px] text-[length:var(--body)] font-medium">{m.bio}</p>
                  )}
                </div>
                {full ? (
                  <ul className="flex flex-wrap gap-x-10 gap-y-4 text-[length:var(--body)] font-medium tracking-[0.02em]">
                    <li className="flex items-center gap-2">
                      <Image src="/assets/icons/linkedin.svg" alt="" width={20} height={20} />
                      <a href={person.linkedin} target="_blank" rel="noopener" className="transition-colors hover:text-coral focus-visible:text-coral">
                        {m.name}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Image src="/assets/icons/telephone.svg" alt="" width={20} height={20} />
                      <a href={`tel:${person.tel}`} className="transition-colors hover:text-coral focus-visible:text-coral">
                        {person.phone}
                      </a>
                    </li>
                  </ul>
                ) : (
                  <Button asChild variant="outline" className="self-start">
                    <Link href={`/o-nas?osoba=${m.slug}`}>Dowiedz się więcej →</Link>
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
