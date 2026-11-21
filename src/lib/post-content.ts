/* The posts' full texts (generated from the hero-ai post pages).
   Each post: its author, the lead and the body – parts (a heading
   and paragraphs) and tips, in reading order. Paragraphs are HTML:
   <strong>, <a href="…"> and the → of the lists. */

export type PostBlock =
  | { type: "part"; id: string; title: string; paragraphs: string[] }
  | { type: "tip"; label: string; paragraphs: string[] };

export type PostContent = {
  author: "maria-luszpinska" | "jakub-urbanski";
  lead: string;
  blocks: PostBlock[];
};

export const postContent: Record<string, PostContent> = {
  "cos-poszlo-nie-tak": {
    "author": "maria-luszpinska",
    "lead": "Pacjent wychodzi z gabinetu z pytaniem bez odpowiedzi, a lekarz dowiaduje się o skardze. Obie strony czują niepewność i chcą zrozumieć, co się stało. Ten tekst pokazuje, jak spokojnie uporządkować sytuację, jakie informacje są potrzebne i kiedy warto skonsultować się z prawnikiem.",
    "blocks": [
      {
        "type": "part",
        "id": "czesc-1",
        "title": "Powikłanie to jeszcze nie błąd",
        "paragraphs": [
          "Nie każdy niepomyślny wynik leczenia oznacza, że ktoś popełnił błąd. Medycyna nie daje gwarancji efektu – lekarz odpowiada za staranne działanie zgodne z aktualną wiedzą medyczną, a nie za to, że leczenie na pewno się powiedzie. Powikłanie, o którym pacjent został wcześniej poinformowany i które mieści się w ryzyku zabiegu, co do zasady nie jest podstawą odpowiedzialności.",
          "O błędzie medycznym mówimy wtedy, gdy postępowanie było niezgodne z wiedzą medyczną albo zabrakło należytej staranności – na przykład przy diagnozie, wyborze metody leczenia, samym zabiegu czy opiece po nim. Granica bywa cienka, dlatego zanim padną oskarżenia, warto najpierw ustalić fakty."
        ]
      },
      {
        "type": "part",
        "id": "czesc-2",
        "title": "Pierwszy krok pacjenta: dokumentacja medyczna",
        "paragraphs": [
          "Pacjent ma prawo dostępu do swojej dokumentacji medycznej. Może ją przejrzeć na miejscu albo poprosić o kopię – pierwsza kopia jest bezpłatna. To od niej zaczyna się każda rzetelna ocena sprawy: z dokumentacji wynika, co ustalono, jakie decyzje podjęto i czy pacjent wyraził zgodę na zabieg po otrzymaniu informacji o ryzyku.",
          "→ Zapisz daty wizyt, nazwiska osób, z którymi rozmawiałeś, i swoje objawy – póki pamiętasz szczegóły.",
          "→ Zachowaj recepty, wyniki badań, zdjęcia i korespondencję z placówką.",
          "→ Jeśli leczenie trzeba kontynuować, zrób to – dbanie o zdrowie jest ważniejsze niż spór, a dalsza dokumentacja też będzie miała znaczenie."
        ]
      },
      {
        "type": "part",
        "id": "czesc-3",
        "title": "Pierwszy krok lekarza: spokój i porządek w papierach",
        "paragraphs": [
          "Wiadomość o skardze lub piśmie od pełnomocnika pacjenta zwykle wywołuje silne emocje. Najważniejsze, by nie działać pod ich wpływem. Dokumentacji medycznej nie wolno uzupełniać ani poprawiać „po fakcie” – każda zmiana wprowadzona po otrzymaniu skargi podważa wiarygodność całej dokumentacji i może mieć poważne konsekwencje.",
          "→ Sprawdź, czy dokumentacja jest kompletna, i zabezpiecz ją w obecnym stanie.",
          "→ Zgłoś sprawę ubezpieczycielowi OC – polisy zwykle przewidują termin na zawiadomienie o roszczeniu.",
          "→ Zanim odpowiesz na pismo, skonsultuj treść odpowiedzi z prawnikiem."
        ]
      },
      {
        "type": "tip",
        "label": "Wskazówka",
        "paragraphs": [
          "Rozmowa z pacjentem i odpowiedź na jego pismo to dwie różne rzeczy. W rozmowie warto okazać zrozumienie i wyjaśnić przebieg leczenia. W piśmie każde zdanie może zostać później odczytane jako przyznanie odpowiedzialności – dlatego jego treść lepiej przygotować na spokojnie i z pomocą prawnika.",
          "Nie wiesz jak to zrobić? <a href=\"#kontakt\">Napisz do nas</a>."
        ]
      },
      {
        "type": "part",
        "id": "czesc-4",
        "title": "Jakie są drogi dochodzenia roszczeń",
        "paragraphs": [
          "Pacjent, który uważa, że jego prawa zostały naruszone, może złożyć skargę do placówki albo zwrócić się do Rzecznika Praw Pacjenta. Przy Rzeczniku działa także Fundusz Kompensacyjny Zdarzeń Medycznych – pozasądowa droga uzyskania świadczenia w przypadku zdarzeń w szpitalu, zwykle szybsza niż proces.",
          "Najszerszą drogą pozostaje pozew o odszkodowanie i zadośćuczynienie przed sądem cywilnym. Roszczenia nie są jednak wieczne: co do zasady przedawniają się po trzech latach od dnia, w którym poszkodowany dowiedział się o szkodzie i o osobie zobowiązanej do jej naprawienia. Niezależnie od tego mogą toczyć się postępowania przed rzecznikiem odpowiedzialności zawodowej, a w poważnych przypadkach – postępowanie karne."
        ]
      },
      {
        "type": "part",
        "id": "czesc-5",
        "title": "Kiedy warto porozmawiać z prawnikiem",
        "paragraphs": [
          "Z perspektywy pacjenta – zanim zdecydujesz, którą drogę wybrać. Ocena dokumentacji często pozwala odpowiedzieć na pytanie, czy sprawa ma szanse, zanim poniesiesz koszty opinii czy procesu.",
          "Z perspektywy lekarza – jak najwcześniej, najlepiej zanim jakiekolwiek pismo trafi do pacjenta lub jego pełnomocnika. Dobrze przygotowana pierwsza odpowiedź często decyduje o tym, czy spór uda się zakończyć polubownie."
        ]
      }
    ]
  },
  "pismo-z-urzedu": {
    "author": "jakub-urbanski",
    "lead": "Prowadzisz firmę, a w skrzynce pojawia się pismo z urzędu albo wiadomość od kontrahenta, po której trzeba szybko zareagować. Zwykle nie ma wtedy czasu na długie analizy, a każda decyzja ma koszty. Poniżej znajdziesz kolejność kroków, która pozwala uniknąć najczęstszych błędów.",
    "blocks": [
      {
        "type": "part",
        "id": "czesc-1",
        "title": "Ustal, kto pisze i w jakiej sprawie",
        "paragraphs": [
          "Zacznij od nagłówka: kto jest nadawcą (urząd skarbowy, ZUS, gmina, inspekcja), jaki jest znak sprawy i na jakiej podstawie prawnej urząd działa. Ta informacja zwykle znajduje się na pierwszej stronie i od niej zależy wszystko, co dalej – inne przepisy obowiązują w postępowaniu podatkowym, a inne w zwykłym postępowaniu administracyjnym.",
          "Sprawdź też, czy pismo na pewno dotyczy Twojej firmy. Zdarza się, że trafia do niewłaściwego podmiotu albo dotyczy innego okresu niż ten, o którym myślisz."
        ]
      },
      {
        "type": "part",
        "id": "czesc-2",
        "title": "Rozpoznaj rodzaj pisma",
        "paragraphs": [
          "Od rodzaju pisma zależy, co możesz, a co musisz zrobić:",
          "→ <strong>wezwanie</strong> – urząd prosi o dokumenty, wyjaśnienia albo stawiennictwo; zwykle wskazuje termin i skutki jego niedotrzymania,",
          "→ <strong>postanowienie</strong> – rozstrzyga kwestię w toku sprawy (np. o wszczęciu kontroli); czasem przysługuje na nie zażalenie,",
          "→ <strong>decyzja</strong> – rozstrzyga sprawę co do istoty (np. nakłada obowiązek albo karę); co do zasady przysługuje od niej odwołanie.",
          "Na końcu decyzji i postanowienia znajduje się pouczenie: czy i do kogo przysługuje środek odwoławczy oraz w jakim terminie. Przeczytaj je uważnie – to najważniejszy fragment pisma."
        ]
      },
      {
        "type": "part",
        "id": "czesc-3",
        "title": "Policz termin – od dnia doręczenia",
        "paragraphs": [
          "Terminy liczy się od dnia doręczenia pisma, a nie od daty, którą nosi pismo. Dzień doręczenia nie wlicza się do terminu. Jeśli ostatni dzień przypada w sobotę albo dzień ustawowo wolny od pracy, termin upływa w najbliższy dzień roboczy.",
          "Uwaga na awizo: jeśli nie odbierzesz listu, po 14 dniach od pierwszego zawiadomienia pismo uważa się za doręczone, choć go nie przeczytałeś. Podobnie działa skrzynka do e-Doręczeń – nieodebrana wiadomość też może zostać uznana za doręczoną.",
          "Przykładowe terminy w zwykłym postępowaniu administracyjnym to 14 dni na odwołanie od decyzji i 7 dni na zażalenie na postanowienie. Termin z wezwania wyznacza urząd. Zawsze kieruj się jednak pouczeniem w konkretnym piśmie."
        ]
      },
      {
        "type": "tip",
        "label": "Wskazówka",
        "paragraphs": [
          "Od razu po odebraniu pisma zapisz datę doręczenia i wpisz do kalendarza ostatni dzień terminu – z kilkudniowym wyprzedzeniem. Zachowaj kopertę albo potwierdzenie z e-Doręczeń: to dowód, od kiedy liczysz termin.",
          "Nie wiesz jak to zrobić? <a href=\"#kontakt\">Napisz do nas</a>."
        ]
      },
      {
        "type": "part",
        "id": "czesc-4",
        "title": "Zbierz dokumenty, zanim odpowiesz",
        "paragraphs": [
          "Odpowiedź na wezwanie powinna być kompletna i spójna z tym, co urząd już wie. Zanim cokolwiek wyślesz, zbierz w jednym miejscu umowy, faktury, korespondencję i wcześniejsze pisma w tej sprawie. Jeśli współpracujesz z księgową lub biurem rachunkowym, zaangażuj je od początku.",
          "Odpowiadaj na to, o co pyta urząd – bez dopisywania wątków, o które nikt nie prosił. Każde wyjaśnienie trafia do akt i może zostać wykorzystane w dalszej części postępowania."
        ]
      },
      {
        "type": "part",
        "id": "czesc-5",
        "title": "Gdy nie zdążysz z terminem",
        "paragraphs": [
          "Jeśli wiesz, że nie zdążysz z kompletem dokumentów w terminie z wezwania, napisz do urzędu przed jego upływem i poproś o przedłużenie, krótko podając powód. Urzędy często się na to zgadzają.",
          "Gdy termin już minął bez Twojej winy – na przykład z powodu choroby – można wnieść prośbę o jego przywrócenie. Trzeba to zrobić w ciągu 7 dni od ustania przyczyny uchybienia i jednocześnie dokonać czynności, której termin dotyczył."
        ]
      },
      {
        "type": "part",
        "id": "czesc-6",
        "title": "A jeśli pisze kontrahent?",
        "paragraphs": [
          "Wezwanie do zapłaty czy zawiadomienie o karze umownej od kontrahenta to nie pismo urzędowe, ale też nie warto go odkładać. Sprawdź, co mówi umowa: terminy, kary, sposób składania reklamacji i zawiadomień. Jeśli roszczenie jest bezpodstawne, odpowiedz na piśmie i to uzasadnij – łatwiej będzie potem wykazać, że od początku je kwestionowałeś.",
          "W obu przypadkach zasada jest ta sama: najpierw ustal fakty i termin, potem zdecyduj o odpowiedzi. Pierwsze pismo w sprawie często wyznacza kierunek całego sporu."
        ]
      }
    ]
  },
  "czyste-powietrze": {
    "author": "jakub-urbanski",
    "lead": "Program „Czyste Powietrze”, choć w zamyśle miał wspomóc modernizację energetyczną nieruchomości niezależnie od zamożności inwestorów, to w rzeczywistości stał się pułapką wykorzystującą zaufanie obywateli do państwowych programów wsparcia.",
    "blocks": [
      {
        "type": "part",
        "id": "czesc-1",
        "title": "Gdzie tkwi haczyk",
        "paragraphs": [
          "Pod szczytnym celem programu, dobrym marketingiem domokrążców i zapewnieniami „darmowej” dotacji kryje się olbrzymi hak – <strong>Wojewódzki Fundusz Ochrony Środowiska i Gospodarki Wodnej nie weryfikuje rzetelności firm budowlanych</strong>, czyli wykonawców inwestycji w ramach „Czystego Powietrza”, i całym ryzykiem związanym z prawidłowością wykonania inwestycji obciąża właścicieli nieruchomości korzystających ze wsparcia."
        ]
      },
      {
        "type": "part",
        "id": "czesc-2",
        "title": "Kto płaci za błędy wykonawcy",
        "paragraphs": [
          "Niestety taka praktyka prowadzi do patologii – przedsiębiorcy nie wykonują umówionych prac lub wykonują je w sposób sprzeczny z umową, co skutkuje <strong>utratą dotacji</strong> przez właścicieli nieruchomości. A co za tym idzie, muszą oni zwracać z własnych środków wypłacone przedsiębiorcom kwoty dotacji, a swoich racji muszą dochodzić na własną rękę."
        ]
      },
      {
        "type": "part",
        "id": "czesc-3",
        "title": "Przykład z praktyki",
        "paragraphs": [
          "Wykonawca bez zgody inwestora przekroczył zakres dotowanej inwestycji i oprócz budynku mieszkalnego ocieplił także budynek gospodarczy znajdujący się obok domu. Co więcej, powierzchnia wykonanego ocieplenia przekraczającego dotowany projekt została przeszacowana przez urzędników z WFOŚiGW w wyniku błędnego pomiaru w trakcie kontroli.",
          "Fundusz z tego powodu obniżył kwotę przyznanej dotacji o mniej więcej 1/3 i nie wypłacił jej wykonawcy (firmie budowlanej), w wyniku czego wykonawca wezwał inwestora do zapłaty tej kwoty na jego rzecz.",
          "→ Czyli <strong>za błędy urzędników i przedsiębiorcy odpowiada obywatel</strong> korzystający z programu „Czyste Powietrze” – to bowiem właściciele nieruchomości są stronami umowy dotacji i umowy o roboty budowlane."
        ]
      },
      {
        "type": "tip",
        "label": "Wskazówka",
        "paragraphs": [
          "Zanim podpiszesz umowę z wykonawcą, sprawdź, czy zakres prac opisany w umowie dokładnie odpowiada zakresowi z wniosku o dotację. Na każdą zmianę – także „dodatkowe” prace proponowane w trakcie budowy – zgadzaj się wyłącznie na piśmie.",
          "Nie wiesz jak to zrobić? <a href=\"#kontakt\">Napisz do nas</a>."
        ]
      },
      {
        "type": "part",
        "id": "czesc-4",
        "title": "Zanim weźmiesz dotację",
        "paragraphs": [
          "Na szczęście w tym przypadku inwestor w porę zdecydował się na pomoc prawną i sprawa nie została poddana walkowerem. Natomiast przykład ten powinien służyć za przestrogę, że zanim weźmiecie dotację, subwencję czy inną formę pomocy państwa – warto iść z tym do dobrego prawnika."
        ]
      }
    ]
  },
  "spor-o-psychoterapie": {
    "author": "maria-luszpinska",
    "lead": "W ostatnim czasie zajmowałam się zawodowo sprawą oscylującą wokół „sporu o psychoterapię” – i przy okazji nieco zgłębiłam argumenty osób świata nauki dotyczące poselskiego projektu ustawy o zawodzie psychoterapeuty oraz samorządzie zawodowym. Aktualnie projekt jest po I czytaniu i trwają prace nad nim w Podkomisji ds. zdrowia psychicznego.",
    "blocks": [
      {
        "type": "part",
        "id": "czesc-1",
        "title": "Świadczenie zdrowotne czy zwykła usługa?",
        "paragraphs": [
          "Podobnie jak w przypadku regulacji zawodu psychologa (co rozważałam <a href=\"#\">w tym wpisie</a>) – nie jest jasne, czy świadczenia psychoterapeutyczne będą kwalifikowane jako świadczenia zdrowotne, a co za tym idzie – czy psychoterapeuci zostaną „świadczeniodawcami” (klienci zaś – „pacjentami”), ze wszystkimi prawnymi konsekwencjami, które będą z tego płynąć. Okazuje się, że odpowiedź na to pytanie będzie zależała od kierunku, w którym zostanie rozstrzygnięty branżowy <strong>spór o psychoterapię</strong>."
        ]
      },
      {
        "type": "part",
        "id": "czesc-2",
        "title": "Co zakłada projekt ustawy",
        "paragraphs": [
          "Otóż projekt ustawy w aktualnym kształcie sprzyja rozszerzeniu pojęcia psychoterapii na rozwój osobisty, coaching, czy ogólne wsparcie psychologiczne. Zakłada także dopuszczenie do zawodu (po ukończeniu szkolenia) nie tylko osób o wykształceniu psychologicznym i lekarzy psychiatrów (ew. innych wykonujących zawody pomocowe), ale także osób posiadających wykształcenie wyższe w innych dziedzinach – bez podstawowego przygotowania psychologicznego lub medycznego."
        ]
      },
      {
        "type": "tip",
        "label": "Wskazówka",
        "paragraphs": [
          "Już teraz warto jasno opisać w umowie albo w zasadach współpracy, na czym polega Twoja usługa: czy to terapia, czy wsparcie rozwojowe. Jeśli przepisy zmienią się w kierunku świadczeń zdrowotnych, łatwiej będzie dostosować dokumenty, a klient od początku będzie wiedział, czego może się spodziewać.",
          "Nie wiesz jak to zrobić? <a href=\"#kontakt\">Napisz do nas</a>."
        ]
      },
      {
        "type": "part",
        "id": "czesc-3",
        "title": "Stanowisko środowiska naukowego",
        "paragraphs": [
          "Tymczasem przeciwnicy tych rozwiązań w środowisku nauki akcentują, że psychoterapia jest stricte leczeniem zaburzeń zdrowia psychicznego metodami psychologicznymi – co w interesie pacjentów powinno powodować postawienie psychoterapeutom wyższych wymogów niż tylko ukończenie kilkuletniego szkolenia bez wcześniejszej solidnej edukacji z zakresu zdrowia psychicznego.",
          "Jasne jest, że o ile regulacja zawodu psychoterapeuty podążyłaby w tym „drugim” kierunku – mielibyśmy do czynienia ze świadczeniem zdrowotnym oraz „pacjentami”."
        ]
      },
      {
        "type": "part",
        "id": "czesc-4",
        "title": "Pytania, które zostają otwarte",
        "paragraphs": [
          "→ Co jednak jeśli kierunek wyznaczony aktualnie przez projekt utrzyma się, tj. powstanie rozwiązanie, w którym jeden psychoterapeuta poprowadzi rzeczywiście terapię zaburzenia psychicznego metodami psychologicznymi, a inny psychoterapeuta, pod tą samą nazwą, będzie prowadził usługę rozwojową?",
          "→ Czy to klient / pacjent samodzielnie będzie wówczas musiał rozstrzygać, czy w konkretnym przypadku jest / był świadczeniobiorcą i jakie prawa mu przysługują?",
          "→ Czy psychoterapeuci również będą się musieli „pilnować”, skoro raz będą świadczeniodawcami, a innym razem zwykłymi usługodawcami?"
        ]
      }
    ]
  },
  "lex-szarlatan": {
    "author": "maria-luszpinska",
    "lead": "3 lipca 2026 r. Sejm uchwalił ustawę z 3 lipca 2026 r. o zmianie ustawy o prawach pacjenta i Rzeczniku Praw Pacjenta, tzw. lex szarlatan, która przyznaje Rzecznikowi Praw Pacjenta nową grupę kompetencji z zakresu „prowadzenia postępowań w sprawach praktyk pseudomedycznych”, które zgodnie z Ustawą mają być zakazane, oraz przeciwdziałania „dezinformacji medycznej”.",
    "blocks": [
      {
        "type": "part",
        "id": "czesc-1",
        "title": "Dwie nowe definicje",
        "paragraphs": [
          "Ustawa wprowadza więc dwie nowe definicje: „praktyki pseudomedycznej” i „dezinformacji medycznej”."
        ]
      },
      {
        "type": "part",
        "id": "czesc-2",
        "title": "Czym jest praktyka pseudomedyczna",
        "paragraphs": [
          "<strong>Praktyka pseudomedyczna</strong> to:",
          "→ udzielanie <strong>przez niemedyka</strong> świadczeń zdrowotnych stwarzających <strong>ryzyko</strong> uszkodzenia ciała lub rozstroju zdrowia, albo śmierci człowieka,",
          "→ oferowanie/stosowanie (przez kogokolwiek) metody niebędącej świadczeniem zdrowotnym, gdzie <strong>wprowadza się w błąd</strong>, że posiada właściwości świadczenia zdrowotnego w zakresie diagnostyki lub leczenia małoletnich, chorób onkologicznych, ciężkich nieuleczalnych chorób lub zaburzeń psychicznych,",
          "→ wykonywanie działalności leczniczej bez uzyskania wpisu do rejestru.",
          "RPP będzie mógł wydać decyzję o uznaniu praktyki za praktykę pseudomedyczną i nakazaniu jej zaniechania; sankcja: kara do 1 mln zł."
        ]
      },
      {
        "type": "part",
        "id": "czesc-3",
        "title": "Czym jest dezinformacja medyczna",
        "paragraphs": [
          "<strong>Dezinformacja medyczna</strong> to rozpowszechnianie / promowanie, w celu osiągnięcia korzyści majątkowej lub osobistej, informacji o:",
          "→ metodzie, w przypadku której deklaruje się/sugeruje, że ma właściwości świadczenia zdrowotnego, niezgodnej z aktualną wiedzą medyczną, zagrażającej życiu lub zdrowiu, lub",
          "→ szkodliwości metody zgodnej z aktualną wiedzą medyczną jako zagrażającej życiu lub zdrowiu.",
          "RPP będzie mógł wpisać stosującego „dezinformację” do specjalnego rejestru, a także złożyć do przedsiębiorcy internetowego wniosek o przekierowywanie połączeń do domeny „dezinformującego” – na stronę RPP ze stosownym ostrzeżeniem."
        ]
      },
      {
        "type": "tip",
        "label": "Wskazówka",
        "paragraphs": [
          "Jeśli w swojej działalności stosujesz metody spoza medycyny konwencjonalnej, przejrzyj, jak opisujesz je na stronie i w mediach społecznościowych. Szczególnie ostrożnie podchodź do zapewnień o skuteczności w leczeniu chorób onkologicznych, ciężkich chorób, zaburzeń psychicznych oraz w terapii dzieci.",
          "Nie wiesz jak to zrobić? <a href=\"#kontakt\">Napisz do nas</a>."
        ]
      },
      {
        "type": "part",
        "id": "czesc-4",
        "title": "Wnioski",
        "paragraphs": [
          "→ <strong>W teorii</strong> „medycyna ludowa”, także ta stosowana przez niemedyka, wydaje się być niezagrożona Ustawą, o ile nie stwarza ryzyka uszkodzenia ciała, rozstroju zdrowia, czy śmierci – i o ile ten, kto ją stosuje, nie zapewnia, że to doprowadzi w ten sposób do wyleczenia chorób ciężkich,",
          "→ wolno w świetle Ustawy informować o korzyściach np. z ziołolecznictwa, ponieważ ogólnie medycyna ludowa jest zgodna z wiedzą medyczną; nie można tylko zachwalać metod, które: 1) zgodne z wiedzą medyczną nie są i 2) jednocześnie mogą zagrażać zdrowiu / życiu."
        ]
      },
      {
        "type": "part",
        "id": "czesc-5",
        "title": "Gdzie Ustawa jest wadliwa",
        "paragraphs": [
          "Wadliwość Ustawy polega jednak na:",
          "→ powierzeniu kompetencji RPP – urzędnikowi, który <strong>nie jest medykiem</strong>, a ma wydawać decyzje w oparciu o niezdefiniowane i ciągle ewoluujące kryterium „wiedzy medycznej”, bądź kryteria „ryzyka uszkodzenia ciała, rozstroju zdrowia, śmierci”,",
          "→ zastosowaniu administracyjnoprawnego trybu, który zakłada kontrolę sądu administracyjnego; ten zaś nie prowadzi postępowania dowodowego, jak więc wykazać ww. kryteria?"
        ]
      }
    ]
  }
};

/* the author box's bio, per person (shorter than on O nas) */
export const authorBio: Record<PostContent["author"], string> = {
  "maria-luszpinska": "Mam 14-letnie doświadczenie zawodowe w obsłudze podmiotów profesjonalnych, stowarzyszeń i osób fizycznych. Specjalizuję się w szeroko rozumianym prawie cywilnym, medycznym i gospodarczym oraz w postępowaniach cywilnych.",
  "jakub-urbanski": "Od początku mojej praktyki zawodowej zajmuję się kompleksową obsługą podmiotów profesjonalnych zarówno w ramach postępowań sądowych i administracyjnych, jak i w zakresie compliance i prawa umów. Do moich zainteresowań zawodowych należy w szczególności prawo administracyjne, prawo samorządu terytorialnego i prawo gospodarcze."
};
