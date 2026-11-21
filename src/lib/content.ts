/* Home page content – edit the wording here, not in the components. */

export const hero = {
  eyebrow: "o prawie dla",
  words: ["przedsiębiorców", "lekarzy", "pacjentów", "weterynarzy", "samorządowców"],
};

/* nasze specjalizacje: each card opens the blog filtered to its category
   (category: the blog's filter value) */
export const specializations = [
  {
    name: "medycy i zakłady lecznicze",
    category: "medyk",
    description:
      "Wspieramy przychodnie, gabinety i kliniki – także weterynaryjne – a lekarzy reprezentujemy w sporach z pacjentami i przed urzędami.",
  },
  {
    name: "pacjenci",
    category: "pacjent",
    description:
      "Pomagamy w sprawach o błędy medyczne, także po zabiegach medycyny estetycznej, i dochodzimy odszkodowania lub zadośćuczynienia.",
  },
  {
    name: "przedsiębiorcy",
    category: "przedsiebiorca",
    description:
      "Przygotowujemy umowy, dbamy o dokumentację i obowiązki prawne firmy oraz reprezentujemy ją w sporach sądowych i sprawach podatkowych.",
  },
  {
    name: "samorządowcy",
    category: "samorzadowiec",
    description:
      "Doradzamy w planowaniu przestrzennym, uchwałach, postępowaniach administracyjnych i sprawach cywilnych gmin, znając ryzyka także z perspektywy mieszkańców.",
  },
  {
    name: "nieruchomości",
    category: "nieruchomosci",
    description:
      "Prowadzimy sprawy o własność, służebność, zasiedzenie, księgi wieczyste i rentę planistyczną – w sądzie i przed urzędami.",
  },
];

/* nasz zespół */
export const teamIntro = [
  "Jesteśmy dynamicznym, zgranym tandemem prawników, którym zależy, by wyjaśniać trudne zagadnienia jak najprościej i służyć wiedzą oraz doświadczeniem jak najefektywniej.",
  "Lubimy pomagać.",
];

export const team = [
  {
    slug: "maria-luszpinska",
    name: "Maria Łuszpińska",
    role: "Radca prawny",
    photo: "/assets/team/maria-luszpinska.png",
    bio: "Od 14 lat doradzam firmom, stowarzyszeniom i osobom prywatnym. Specjalizuję się w prawie cywilnym, medycznym i gospodarczym, a także reprezentuję klientów w sprawach cywilnych przed sądem. Prowadzę również sprawy bankowe, ubezpieczeniowe, dotyczące nieruchomości oraz nieuczciwej konkurencji.",
    /* O nas: the full bio, paragraph by paragraph */
    about: [
      "Mam 14-letnie doświadczenie zawodowe w obsłudze podmiotów profesjonalnych, stowarzyszeń i osób fizycznych. Specjalizuję się w szeroko rozumianym prawie cywilnym, medycznym i gospodarczym oraz w postępowaniach cywilnych.",
      "W przeszłości zajmowałam się sprawami z zakresu prawa zobowiązań, prawa rzeczowego - nieruchomości, sprawami dot. zwalczania nieuczciwej konkurencji, postępowaniami grupowymi (wszystkimi także na etapie kasacyjnym), jak również obrotem instrumentami finansowymi, prawem bankowym, prawem ubezpieczeń gospodarczych oraz sprawami administracyjnymi.",
    ],
  },
  {
    slug: "jakub-urbanski",
    name: "Jakub Urbański",
    role: "Aplikant adwokacki",
    photo: "/assets/team/jakub-urbanski.png",
    bio: "Od początku mojej praktyki zawodowej obsługuję firmy w postępowaniach sądowych i administracyjnych oraz w sprawach compliance i prawa umów. Specjalizuję się w prawie administracyjnym, samorządowym i gospodarczym. Prywatnie inwestuję na giełdzie, a wcześniej prowadziłem własne firmy w branży budowlanej i gastronomicznej.",
    about: [
      "Od początku mojej praktyki zawodowej zajmuję się kompleksową obsługą podmiotów profesjonalnych zarówno w ramach postępowań sądowych i administracyjnych, jak i w zakresie compliance i prawa umów. Do moich zainteresowań zawodowych należy w szczególności prawo administracyjne, prawo samorządu terytorialnego i prawo gospodarcze.",
      "Poza działalnością prawniczą na co dzień zajmuję się inwestycjami na rynkach finansowych, przede wszystkim na rynku akcji. W przeszłości prowadziłem indywidualną działalność gospodarczą w branży budowlanej oraz spółkę działającą w branży gastronomicznej i budowlanej.",
    ],
  },
];

/* zaufali nam */
export const reviews = [
  {
    quote:
      "Pomogli tam, gdzie inne kancelarie nie mogły znaleźć rozwiązania. Okazuje się, że skuteczna pomoc prawna nie zawsze polega na długich procesach sądowych.",
    author: "DUO BIS sp. z o.o.",
  },
  {
    quote:
      "Dzięki Panu Mecenasowi sprawnie otrzymałem niezbędne zezwolenia na prowadzenie działalności gospodarczej. Równie szybko udało się wyegzekwować należności z tytułu nieopłaconych faktur - polecam!",
    author: "Łukasz Basiura, TRAK-BAS",
  },
  {
    quote:
      "Dziękujemy za profesjonalne poprowadzenie sprawy dotyczącej administracyjnych kar pieniężnych oraz przyjemną współpracę. Pani Mecenas wykazała się zaangażowaniem w prowadzenie sprawy i pomysłowością w budowaniu argumentacji prawnej.",
    author: "Iga Uniszewska, CAPPUCCINO IGA UNISZEWSKA sp. j.",
  },
];

/* O nas: nasze wartości */
export const values = [
  {
    name: "nie komplikujemy rzeczy prostych",
    description:
      "Nie udowadniamy świetnej znajomości przepisów stustronnicowymi pismami procesowymi, a skutecznością. Dbamy, abyś zrozumiał swoją sytuację prawną i unikamy niezrozumiałej, fachowej terminologii - tę pozostawiamy sądowi i korespondencji z innymi prawnikami.",
  },
  {
    name: "podchodzimy indywidualnie",
    description:
      'Nie stosujemy taktyki "kopiuj-wklej" w rozwiązywaniu Twojej sprawy. Każda sytuacja wymaga indywidualnego podejścia i analizy. W sprawach nagłych uzgadniamy indywidualnie zasady dostępności poza normalnymi godzinami pracy.',
  },
  {
    name: "pracujemy dla Ciebie",
    description:
      "Nie ma dla nas większej nagrody niż Twój sukces i poczucie dobrze wykonanej pracy. Pomaganie daje nam satysfakcję.",
  },
  {
    name: "działamy rzetelnie",
    description:
      "Wiemy, że rzetelność to podstawa pracy prawnika. Dokładnie weryfikujemy wszystkie proponowane rozwiązania.",
  },
  {
    name: "myślimy nieszablonowo",
    description:
      "Jeżeli charakter sprawy na to pozwala, chętnie sięgamy po niestandardowe rozwiązania - nie tylko prawne, ale i umożliwiające dialog oraz pozwalające uniknąć (dłuższego) sporu.",
  },
];
