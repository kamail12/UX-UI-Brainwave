import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

import { brainwave } from '../assets';
import { navigation } from '../constants';

import Button from './Button';
import MenuSvg from '../assets/svg/MenuSvg';

import { HamburgerMenu } from '../components/design/Header';

const Header = () => {
  const pathname = useLocation();

  const [openNav, setOpenNav] = useState(false);

  const toggleNavigation = () => {
    if (openNav) {
      setOpenNav(false);
      enablePageScroll();
    } else {
      setOpenNav(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNav) return;

    setOpenNav(false);
    enablePageScroll();
  };

  return (
    // Główny kontener nagłówka, który jest zawsze na górze strony i ma efekt rozmycia tła
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNav ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
      }`}
    >
      {/*  Kontener wewnętrzny dla elementów nagłówka, z marginesami i paddingiem odpowiednio dostosowanymi
       */}
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        {/*Link do sekcji "hero" strony, zawierający logo
         */}
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} alt="brainwave" width={190} height={40} />
        </a>

        {/*Nawigacja, która jest domyślnie ukryta i staje się widoczna tylko na dużych ekranach (lg i większe)
         */}
        <nav
          className={`${
            openNav ? 'flex' : 'hidden'
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? 'lg:hidden' : ''
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? 'z-2 lg:text-n-1'
                    : 'lg:text-n-1/50'
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Sign in
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNav} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

/*

* -> Kluczowe aspekty struktury i ich zastosowanie:

** -> Pozycjonowanie i widoczność: Użycie klas fixed, top-0, i z-50 zapewnia, że nagłówek jest zawsze widoczny na górze strony, niezależnie od przewijania. z-50 gwarantuje, że nagłówek będzie na wierzchu innych elementów.

*** -> Responsywność: Klasa lg: oznacza, że określone style (np. lg:flex, lg:bg-transparent) są stosowane tylko na ekranach o szerokości większej niż zdefiniowany breakpoint dla lg. Dzięki temu nawigacja i inne elementy mogą się różnie zachowywać w zależności od rozmiaru ekranu.

**** -> Stylizacja i efekty: Klasy takie jak backdrop-blur-sm dodają efekty wizualne, np. rozmycie tła za elementem, co może poprawić estetykę i czytelność na złożonych tłach.

***** -> Układ i rozmiar: Użycie klas typu flex, items-center, justify-center pozwala na elastyczne i centrowane rozmieszczenie elementów wewnątrz kontenerów, co jest kluczowe dla nowoczesnego, responsywnego designu.

Header
│
├── Kontener główny (zawsze na górze, z efektem rozmycia)
│   │
│   ├── Kontener wewnętrzny (dla elementów nagłówka, z marginesami i paddingiem)
│   │   │
│   │   ├── Link do sekcji "hero" (z logo)
│   │   │
│   │   └── Nawigacja (ukryta na małych ekranach, widoczna na dużych)
│   │       │
│   │       └── Kontener nawigacji (dla elementów nawigacyjnych)
│   │
│   └── (Potencjalne inne elementy, np. przyciski logowania, jeśli by były)
│
└── (Potencjalne inne sekcje, np. dodatkowy pasek informacyjny, jeśli by był)

Dlaczego taka struktura?

1. Kontener główny: Utrzymuje nagłówek na górze strony niezależnie od przewijania. Efekt rozmycia (backdrop-blur-sm) poprawia czytelność i estetykę, szczególnie na złożonych tłach.

2. Kontener wewnętrzny: Służy do organizacji elementów wewnątrz nagłówka. Umożliwia łatwe zarządzanie marginesami i paddingiem, co jest kluczowe dla responsywnego designu.

3. Link do sekcji "hero": Bezpośredni dostęp do głównej sekcji strony z logo firmy/marki. Jest to często pierwszy element, na który użytkownik zwraca uwagę.

4. Nawigacja: Ukryta na mniejszych ekranach, aby zaoszczędzić miejsce i uniknąć zatłoczenia. Staje się widoczna na większych ekranach, gdzie jest więcej miejsca na ekranie. To podejście jest częścią responsywnego designu, który dostosowuje się do różnych rozmiarów ekranu.

5. Kontener nawigacji: Organizuje elementy nawigacyjne. Możliwość zmiany układu z pionowego na poziomy na większych ekranach poprawia użyteczność i estetykę.

*/
