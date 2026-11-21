import { NextResponse, type NextRequest } from "next/server";

import { posts } from "@/lib/posts";

/* Runs before a /blog/… page is rendered. An address that isn't one of
   our posts gets a real "404 Not Found" (the site's not-found page).
   Without this, Next.js 16 (Cache Components) would answer it with
   "200 OK" and show the not-found message – search engines and link
   checkers would take it for a real page. See the Next.js docs:
   file-conventions/loading.md, "Status codes". */

const slugs = new Set(posts.map((p) => p.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (slug && !slug.includes("/") && slugs.has(slug)) return; // a post: carry on
  // any address that matches no page renders the not-found page with a 404
  return NextResponse.rewrite(new URL("/_brak-strony", request.url));
}

export const config = {
  matcher: "/blog/:slug+",
};
