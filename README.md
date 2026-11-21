# Lu Legal – website

The Lu Legal site (variant-focus from `hero-ai`), rebuilt on **Next.js 16**,
**React 19**, **Tailwind CSS 4** and **shadcn/ui**. It looks and moves exactly
like `hero-ai/variant-focus.html`, `blog.html`, `o-nas.html`, `kontakt.html` and
the `wpis-*.html` post pages.

## Running it

```bash
npm run dev          # development: http://localhost:3000 (updates as you edit)
npm run build        # the production version – checks everything, builds every page
npm run start        # serves that production version
```

**If a change doesn't show up** (most often CSS): stop `npm run dev`
(Ctrl+C), delete the `.next` folder, start it again. Next.js keeps a cache
there that can go stale; it only holds generated files.

## Common changes – where to edit

| What | File |
|---|---|
| Hero words, specialisations, team (roles, bios, photos), reviews, values | `src/lib/content.ts` |
| Menu links, e-mail, address, phone numbers, LinkedIn | `src/lib/site.ts` |
| Blog posts: title, date, categories, reading time, excerpt | `src/lib/posts.ts` |
| Blog posts: the full text (lead, parts, tips) | `src/lib/post-content.ts` |
| Category names | `categories` in `src/lib/posts.ts` |
| Brand colours, fonts, shadcn colour mapping | `src/app/globals.css` |
| Hero sizes, page background, section spacing, all the motion | `src/styles/lulegal.css` |

**Adding a post:** add its card details at the top of `posts` in
`src/lib/posts.ts` (newest first) and its text under the same `slug` in
`src/lib/post-content.ts`. The page `/blog/<slug>`, its table of contents,
author box, the blog list and the home page's three newest pick it up by
themselves. Paragraphs are HTML: `<strong>…</strong>`, `<a href="…">…</a>`, and
lists written as paragraphs starting with `→`.

## How it's organised

```
src/app/                 the pages – a folder is an address
  layout.tsx             around every page: top bar, contact section, footer
  page.tsx               /            (home)
  blog/page.tsx          /blog
  blog/[slug]/page.tsx   /blog/…      (one template for every post)
  o-nas/page.tsx         /o-nas
  kontakt/page.tsx       /kontakt
src/proxy.ts             a wrong /blog/… address → a real 404
src/components/ui/       shadcn components, styled to the design
                         (Button, Badge, Input, Textarea, Checkbox, Label,
                          Toggle/ToggleGroup – the blog filters, Sheet – the mobile menu)
src/components/site/     shared parts: top bar, footer, contact, sections,
                         post card, page hero, and the motion engines
src/components/home/     the home page sections
src/components/blog/     the blog list (filters, search, load more)
src/components/post/     post page parts (table of contents, author link, entrance)
src/components/about/    O nas parts (values, scroll to a person)
src/lib/                 the content (see above)
src/styles/lulegal.css   the design styles Tailwind can't express neatly
public/assets/           logo, icons, photos, background tiles
```

**Styling:** Tailwind classes for everyday styling; `lulegal.css` for the
design systems (the hero's scale, stacking, entrances). Its classes start with
`lx-` and sit in Tailwind's `components` layer, so a Tailwind class next to
one always wins. Note: write `leading-[normal]`, not `leading-normal` (that is
1.5 in Tailwind; the design uses the browser's normal line height).

**Motion** (all in `src/components/`):
- `home/hero.tsx` – the word-by-word snapping, focus, square, entrance
- `site/stacking.tsx` – sections pin, hold, peek and slide over each other
- `site/topbar.tsx` – the bar's colour follows the section under it
- `site/stage.tsx` – the scroll-in entrances; a section names its entrance
  (`<Section stage="specs">`), the parts that animate carry `data-stage-card`
- `post/post-enter.tsx` – the post hero's entrance

All of it respects "reduce motion" in the system settings.

## Before going live

- **Contact form:** it doesn't send anything yet (`src/components/site/contact.tsx`) –
  needs an e-mail service and a real reCAPTCHA (the box is a drawn placeholder).
- **Polityka prywatności:** the footer and form link to `#` – the page doesn't exist yet.
- **Blog list placeholders:** the five posts are listed twice so "Pokaż więcej
  wpisów" has something to load – remove the copies in
  `src/components/blog/blog-list.tsx` (`listed`) once there are more posts.
- **Broken link:** "w tym wpisie" in the psychotherapy post points to `#`.
- **404 page:** shows Next.js's default English text – a Polish one would be
  `src/app/not-found.tsx`.
- **Two AI-written posts** still need the author's review (as in `hero-ai`).
