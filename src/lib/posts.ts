/* Blog posts, newest first: the card details (blog list and the home
   page's three newest). The full texts come with the post pages. */

export const categories = {
  pacjent: "Dla pacjenta",
  medyk: "Dla medyka",
  przedsiebiorca: "Dla przedsiębiorcy",
  samorzadowiec: "Dla samorządowca",
  nieruchomosci: "Nieruchomości",
} as const;

export type Category = keyof typeof categories;

export type Post = {
  slug: string;
  date: string; // YYYY-MM-DD
  categories: Category[];
  readingTime: number; // minutes
  title: string;
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "cos-poszlo-nie-tak",
    date: "2026-08-11",
    categories: ["pacjent", "medyk"],
    readingTime: 3,
    title: "Kiedy coś poszło nie tak w leczeniu. Co warto wiedzieć po obu stronach?",
    excerpt:
      "Pacjent wychodzi z gabinetu z pytaniem bez odpowiedzi, a lekarz dowiaduje się o skardze. Obie strony czują niepewność i chcą zrozumieć, co się stało. Ten tekst pokazuje, jak spokojnie uporządkować sytuację, jakie informacje są potrzebne i kiedy warto skonsultować się z prawnikiem.",
  },
  {
    slug: "pismo-z-urzedu",
    date: "2026-08-06",
    categories: ["przedsiebiorca"],
    readingTime: 3,
    title: "Pismo z urzędu. Co zrobić najpierw?",
    excerpt:
      "Prowadzisz firmę, a w skrzynce pojawia się pismo z urzędu albo wiadomość od kontrahenta, po której trzeba szybko zareagować. Zwykle nie ma wtedy czasu na długie analizy, a każda decyzja ma koszty.",
  },
  {
    slug: "czyste-powietrze",
    date: "2026-08-05",
    categories: ["samorzadowiec", "przedsiebiorca", "nieruchomosci"],
    readingTime: 2,
    title: 'Jak korzystać z programu "Czyste powietrze"?',
    excerpt:
      "Program „Czyste Powietrze”, choć w zamyśle miał wspomóc modernizację energetyczną nieruchomości niezależnie od zamożności inwestorów, to w rzeczywistości stał się pułapką wykorzystującą zaufanie obywateli do państwowych programów wsparcia.",
  },
  {
    slug: "spor-o-psychoterapie",
    date: "2026-08-01",
    categories: ["pacjent", "medyk"],
    readingTime: 2,
    title: "Projekt ustawy o zawodzie psychoterapeuty – „spór o psychoterapię”",
    excerpt:
      "W ostatnim czasie zajmowałam się zawodowo sprawą oscylującą wokół „sporu o psychoterapię” – i przy okazji nieco zgłębiłam argumenty osób świata nauki dotyczące poselskiego projektu ustawy o zawodzie psychoterapeuty oraz samorządzie zawodowym. Aktualnie projekt jest po I czytaniu i trwają prace nad nim w Podkomisji ds. zdrowia psychicznego.",
  },
  {
    slug: "lex-szarlatan",
    date: "2026-07-05",
    categories: ["pacjent", "medyk"],
    readingTime: 3,
    title: 'Lex szarlatan czyli czy tylko "niekonwencjonalni" mają się czego obawiać?',
    excerpt:
      "3 lipca 2026 r. Sejm uchwalił ustawę z 3 lipca 2026 r. o zmianie ustawy o prawach pacjenta i Rzeczniku Praw Pacjenta, tzw. lex szarlatan,",
  },
];

/* 2026-08-11 → 11.08.2026 */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
