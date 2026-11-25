import { Section, SectionTitle, Squares } from "@/components/site/section";
import { values } from "@/lib/content";

/* nasze wartości (O nas): five numbered rows – a big number with a coral
   full stop, the value and its description. Styles: .lx-value. */
export function Values() {
  return (
    <Section tone="sky" stage="values" id="wartosci" aria-labelledby="wartosci-title">
      <Squares />
      <SectionTitle id="wartosci-title">nasze wartości</SectionTitle>
      {/* mobile: the rows and their lines edge to edge (Figma Mobile / o nas) */}
      <ol className="lx-bleed mt-12 md:mt-[72px] lg:mt-[100px]">
        {values.map((v, i) => (
          <li key={v.name} className="lx-value" data-stage-card>
            <span className="lx-value__num" aria-hidden>
              {/* the number rises through its baseline (see "Entrances") */}
              <span className="lx-value__rise">
                {i + 1}
                <span className="text-coral">.</span>
              </span>
            </span>
            <div className="flex min-w-0 flex-col gap-4">
              <h3 className="lx-value__name text-[length:var(--title)] font-normal">{v.name}</h3>
              <p className="lx-value__desc max-w-[640px] text-[length:var(--body)] font-medium">{v.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
