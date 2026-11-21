import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { Topbar } from "@/components/site/topbar";

/* Brand fonts (hosted by Next.js, not loaded from Google at run time):
   Manrope for text and buttons, Instrument Serif Italic for the big
   headings. Each is exposed as a CSS variable that globals.css uses. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"], // latin-ext: Polish letters (ą, ę, ł, ś…)
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Lu Legal",
  description: "Kancelaria Lu Legal – piszemy prosto o prawie.",
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
};

/* The home hero's and a blog post's hero entrances (see .lx-hero-enter
   and .lx-post-enter in lulegal.css): hidden from the first paint, played
   by the page once the font is in. Safety net: shown after 5s (4s)
   regardless. Not with reduced motion. */
const heroEnterScript = `
if (location.pathname === "/" && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("lx-hero-enter");
  setTimeout(() => document.documentElement.classList.add("lx-hero-in"), 5000);
}
if (location.pathname.startsWith("/blog/") && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("lx-post-enter");
  setTimeout(() => document.documentElement.classList.add("lx-post-in"), 4000);
}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      // smooth scrolling for jumps within a page, but not when moving to another page
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
      // the scripts below add classes to <html> before React starts
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: heroEnterScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* every page: the top bar, its content, the contact section and the footer */}
        <Topbar />
        {children}
        <Contact />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
