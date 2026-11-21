import { BlogPreview } from "@/components/home/blog-preview";
import { Hero } from "@/components/home/hero";
import { Reviews } from "@/components/home/reviews";
import { Specializations } from "@/components/home/specializations";
import { Team } from "@/components/home/team";

/* The home page, section by section (step 6). */
export default function Home() {
  return (
    <main className="contents">
      {/* "contents": the sections pin against the whole page, not just <main> (see "Stacking" in lulegal.css) */}
      <Hero />
      <Specializations />
      <Team />
      <Reviews />
      <BlogPreview />
    </main>
  );
}
