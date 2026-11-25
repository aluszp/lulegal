"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PostCard } from "@/components/site/post-card";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories, posts, type Category, type Post } from "@/lib/posts";

/* The blog list (Figma 689:4286): category filters (shadcn ToggleGroup,
   one at a time) and a search over the titles and excerpts (ignoring
   case and Polish letters); the matching posts, PAGE at a time, with
   "Pokaż więcej wpisów" and its loader; an empty state when nothing
   matches.
   The category lives in the address (/blog?kategoria=pacjent), so it can
   be shared, and the cards' tags and the home page's specialisation
   cards link straight to a filtered list. */

const PAGE = 5;
const LOAD_MS = 800; // stands in for the request a CMS would make
// a new filter or search: the loader shows this long (from the last
// keystroke), so the visitor sees the list respond
const FILTER_MS = 600;

/* Placeholder copies of the posts, so "Pokaż więcej wpisów" has a second
   page to load (as on the current site). Remove once there are more than
   five real posts. */
const listed: Post[] = [...posts, ...posts];

const fold = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
const searchText = listed.map((p) => fold(`${p.title} ${p.excerpt}`));

const isCategory = (c: string | null): c is Category => !!c && c in categories;

export function BlogList() {
  // the address is only known in the browser: until then (and in the
  // pre-rendered page) the list shows all categories
  return (
    <Suspense fallback={<List category="" />}>
      <ListFromAddress />
    </Suspense>
  );
}

function ListFromAddress() {
  const params = useSearchParams();
  const param = params.get("kategoria");
  const category = isCategory(param) ? param : "";

  // "?przewin" (from the specialisation cards): the page opens at the top,
  // so the visitor sees where they are, then glides down to the list
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("przewin")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: "instant" });
    const timer = setTimeout(() => {
      // drop it from the address, so a reload doesn't scroll again
      const url = new URL(window.location.href);
      url.searchParams.delete("przewin");
      window.history.replaceState(null, "", url);
      document.getElementById("filtry")?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
    }, reduce ? 0 : 700);
    return () => clearTimeout(timer);
  }, []);

  return <List category={category} />;
}

function List({ category }: { category: Category | "" }) {
  const [query, setQuery] = useState("");
  // the filter + search the list shows: it catches up with the chosen
  // ones after FILTER_MS, with the loader in the list's place meanwhile
  const [applied, setApplied] = useState({ category, query });
  const filtering = applied.category !== category || applied.query !== query;
  // how many matching posts show; it belongs to one filter + search
  // combination, so a new one starts again from the first page
  const filterKey = `${applied.category}|${applied.query}`;
  const [paging, setPaging] = useState({ key: filterKey, limit: PAGE });
  const limit = paging.key === filterKey ? paging.limit : PAGE;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const allRef = useRef<HTMLButtonElement>(null);
  const focusIndex = useRef<number | null>(null);

  const q = fold(applied.query.trim());
  const matches = listed
    .map((post, i) => ({ post, i }))
    .filter(
      ({ post, i }) =>
        (!applied.category || post.categories.includes(applied.category)) && (!q || searchText[i].includes(q))
    );
  const shown = matches.slice(0, limit);

  useEffect(() => {
    if (!filtering) return;
    const timer = setTimeout(() => {
      setApplied({ category, query });
      setStatus("Lista wpisów zaktualizowana.");
    }, FILTER_MS);
    return () => clearTimeout(timer);
  }, [category, query, filtering]);

  // after "load more": keyboard and screen-reader users continue at the
  // first new post
  useEffect(() => {
    if (focusIndex.current === null) return;
    document.querySelector<HTMLElement>(`[data-post="${focusIndex.current}"]`)?.focus({ preventScroll: true });
    focusIndex.current = null;
  }, [limit]);

  function selectCategory(c: string) {
    const url = new URL(window.location.href);
    if (c) url.searchParams.set("kategoria", c);
    else url.searchParams.delete("kategoria");
    window.history.replaceState(null, "", url); // updates the list too
  }

  function loadMore() {
    setLoading(true);
    setStatus("Ładowanie kolejnych wpisów…");
    setTimeout(() => {
      const added = matches.slice(limit, limit + PAGE);
      focusIndex.current = added[0]?.i ?? null;
      setPaging({ key: filterKey, limit: limit + PAGE });
      setLoading(false);
      setStatus(`Załadowano kolejne wpisy: ${added.length}.`);
    }, LOAD_MS);
  }

  function clearAll() {
    setQuery("");
    selectCategory("");
    allRef.current?.focus(); // the clicked button disappears with the empty state
  }

  return (
    <Section tone="sky" id="filtry" aria-label="Wpisy" className="lx-blog-list">
      {/* filters: the tags and the search, side by side on desktop */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[60px]">
        <ToggleGroup
          type="single"
          spacing={3}
          value={category || "all"}
          onValueChange={(v) => v && selectCategory(v === "all" ? "" : v)}
          aria-label="Kategorie"
          className="w-auto flex-1"
        >
          <ToggleGroupItem value="all" ref={allRef}>
            Wszystkie kategorie
          </ToggleGroupItem>
          {Object.entries(categories).map(([value, label]) => (
            <ToggleGroupItem key={value} value={value}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="group relative min-w-0 lg:flex-[0_1_510px]">
          <label htmlFor="blog-search" className="sr-only">
            Szukaj wpisów
          </label>
          <Input
            ref={searchRef}
            id="blog-search"
            type="search"
            tone="light"
            autoComplete="off"
            placeholder="Szukaj na blogu"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[url(/assets/icons/search.svg)] bg-[length:20px_20px] bg-[position:16px_center] bg-no-repeat px-[52px] group-hover:border-coral [&::-webkit-search-cancel-button]:appearance-none"
          />
          {/* the × appears once something is typed; it clears the search
              and keeps the cursor in the field */}
          {query && (
            <button
              type="button"
              aria-label="Wyczyść wyszukiwanie"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
              className="absolute right-4 bottom-[18px] size-5 cursor-pointer bg-[url(/assets/icons/cancel.svg)] bg-[length:20px_20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            />
          )}
        </div>
      </div>

      <div className="pt-12 md:pt-16 lg:pt-[88px]" aria-busy={filtering}>
        {filtering ? (
          // the same loader as "load more", where the list was
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : shown.length > 0 ? (
          // mobile: the cards edge to edge, 24px apart (as on the home page)
          <div className="lx-bleed flex flex-col gap-6 md:gap-10">
            {shown.map(({ post, i }) => (
              <PostCard key={i} post={post} heading="h2" tabIndex={-1} data-post={i} />
            ))}
          </div>
        ) : (
          // empty state (Figma 787:6739)
          <div className="flex flex-col items-center gap-10 text-center">
            <div className="lx-squares lx-squares--muted" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <p className="max-w-[640px] text-[length:var(--lead)] tracking-[-0.01em]">
              Nie znaleźliśmy takiego wpisu. Zmień wyszukiwanie albo opisz nam swoją sprawę. Pomożemy znaleźć odpowiedź.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button variant="outline" onClick={clearAll}>
                Wyczyść filtry
              </Button>
              <Button asChild>
                <Link href="#kontakt">Napisz do nas</Link>
              </Button>
            </div>
          </div>
        )}

        {/* load more: the button, or the loader in its place */}
        {!filtering && matches.length > limit && (
          <div className="mt-10 flex justify-center">
            {loading ? (
              <Loader />
            ) : (
              <Button onClick={loadMore}>Pokaż więcej wpisów</Button>
            )}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {status}
        </p>
      </div>
    </Section>
  );
}

function Loader() {
  return (
    <div className="lx-loader" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}
