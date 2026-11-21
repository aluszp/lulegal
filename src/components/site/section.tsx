import { cn } from "cn";

import { Peek } from "@/components/site/stacking";
import { Stage, type StageKind } from "@/components/site/stage";

/* The building blocks every content section shares (see .lx-section in
   src/styles/lulegal.css for the spacing per screen size). */

/* A section: navy (white text) or sky (navy text). `stage`: its scroll-in
   entrance (see stage.tsx); the parts that animate are marked in the
   markup with data-stage-card. */
export function Section({
  tone,
  stage,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { tone: "navy" | "sky"; stage?: StageKind }) {
  return (
    <section
      className={cn("lx-section", tone === "navy" ? "bg-navy text-white" : "bg-sky text-navy", className)}
      {...props}
    >
      {children}
      {/* the next layer's peek while this one holds; also hooks the
          section into the stacking (see stacking.tsx) */}
      <Peek />
      {stage && <Stage kind={stage} />}
    </section>
  );
}

/* The three squares above a heading: coral, coral, then sky (navy on sky) */
export function Squares() {
  return (
    <div className="lx-squares" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

/* A section heading: Instrument Serif Italic, 120 / 86 / 60px */
export function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("lx-section-title", className)} {...props} />;
}
