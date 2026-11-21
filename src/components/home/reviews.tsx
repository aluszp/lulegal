import { Section, SectionTitle } from "@/components/site/section";
import { reviews } from "@/lib/content";

/* zaufali nam: three reviews on navy – five coral stars, the quote and
   the author, each with a sky line under it. */
const STARS = [
  "M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z",
  "M40 0L42.6942 8.2918H51.4127L44.3593 13.4164L47.0534 21.7082L40 16.5836L32.9466 21.7082L35.6407 13.4164L28.5873 8.2918H37.3058L40 0Z",
  "M68 0L70.6942 8.2918H79.4127L72.3593 13.4164L75.0534 21.7082L68 16.5836L60.9466 21.7082L63.6407 13.4164L56.5873 8.2918H65.3058L68 0Z",
  "M96 0L98.6942 8.2918H107.413L100.359 13.4164L103.053 21.7082L96 16.5836L88.9466 21.7082L91.6407 13.4164L84.5873 8.2918H93.3058L96 0Z",
  "M124 0L126.694 8.2918H135.413L128.359 13.4164L131.053 21.7082L124 16.5836L116.947 21.7082L119.641 13.4164L112.587 8.2918H121.306L124 0Z",
];

function Stars() {
  return (
    <svg viewBox="0 0 136 24" width={136} height={24} fill="#E15643" role="img" aria-label="Ocena: 5 na 5" className="lx-stars block">
      {/* each star drawn in its own place (not one shape moved with
          `transform`: the pop-in animation scales the stars with
          transform, which would pile them all up on the first) */}
      {STARS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function Reviews() {
  return (
    <Section tone="navy" stage="reviews" id="opinie" aria-labelledby="opinie-title">
      <SectionTitle id="opinie-title">zaufali nam</SectionTitle>
      <div className="mt-[var(--head-gap)] flex flex-col gap-10 md:gap-[60px]">
        {reviews.map((r) => (
          <figure key={r.author} className="lx-review" data-stage-card>
            <div className="flex max-w-[860px] flex-col gap-8">
              <Stars />
              <blockquote className="text-[length:var(--lead)] leading-[normal] font-medium">{r.quote}</blockquote>
              <figcaption className="lx-label text-sky">{r.author}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </Section>
  );
}
