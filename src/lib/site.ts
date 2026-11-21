/* The site's shared content: navigation and contact details, used by the
   top bar, the mobile menu and the footer – change them here once. */

export const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const contact = {
  email: "lulegal.kancelaria@gmail.com",
  address: "ul. Pilotów 29/11, 31-462 Kraków",
  people: [
    {
      name: "Maria Łuszpińska",
      phone: "888 561 292",
      tel: "+48888561292",
      linkedin: "https://www.linkedin.com/in/maria-%C5%82uszpi%C5%84ska-158711245/",
    },
    {
      name: "Jakub Urbański",
      phone: "609 647 679",
      tel: "+48609647679",
      linkedin: "https://www.linkedin.com/in/jakub-urba%C5%84ski-264a322a2/",
    },
  ],
} as const;
