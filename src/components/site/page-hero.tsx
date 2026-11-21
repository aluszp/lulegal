import { cn } from "cn";

/* The hero of a subpage (Blog, O nas, Kontakt): the page title with a
   coral square as its full stop, the lead under it and, optionally,
   more content (Kontakt's e-mail and address). Styles: .lx-page-hero
   in src/styles/lulegal.css. */
export function PageHero({
  title,
  lead,
  className,
  children,
}: {
  title: string;
  lead: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("lx-page-hero", className)} aria-labelledby="page-title">
      <h1 className="lx-page-hero__title" id="page-title">
        {title}
        <span className="lx-page-hero__dot" aria-hidden />
      </h1>
      <p className="lx-page-hero__lead">{lead}</p>
      {children}
    </section>
  );
}
