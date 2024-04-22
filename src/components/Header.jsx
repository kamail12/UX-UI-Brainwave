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

Opis Struktury i Kluczowych Aspektów
1. Kontener główny: Utrzymuje nagłówek na górze strony niezależnie od przewijania. Zmienia styl w zależności od tego, czy nawigacja jest otwarta (openNav), co wpływa na efekt rozmycia i tło.

2. Kontener wewnętrzny: Organizuje elementy nagłówka, takie jak logo, nawigację, i przyciski. Dostosowuje marginesy i paddingi dla różnych rozmiarów ekranu.

3. Link do sekcji "hero": Zapewnia szybki dostęp do głównej sekcji strony. Jest to element wizualny i nawigacyjny.

4. Nawigacja: Zmienia swoją widoczność w zależności od stanu openNav i rozmiaru ekranu. Na mniejszych ekranach jest ukryta i pojawia się tylko po aktywacji przez użytkownika. Zawiera elementy nawigacyjne, które są dynamicznie tworzone z danych (navigation.map(...)).

5. Elementy nawigacyjne: Mapowane z obiektu navigation, reagują na kliknięcie, zmieniając stan nawigacji i umożliwiając przewijanie strony.

6. HamburgerMenu: Komponent, który jest widoczny tylko na mniejszych ekranach. Jego stan zmienia się w zależności od openNav, co kontroluje widoczność nawigacji.

7. Przyciski "New account" i "Sign in": "New account" jest widoczny tylko na większych ekranach. "Sign in" ma dwie formy: jako tekst na większych ekranach i jako przycisk na mniejszych, z możliwością otwarcia nawigacji.

(Schemat Struktury Komponentu Header)
-------->
Header
│
├── Kontener główny (zawsze na górze, z efektem rozmycia, reaguje na stan nawigacji)
│   │
│   ├── Kontener wewnętrzny (dla elementów nagłówka, z marginesami i paddingiem)
│   │   │
│   │   ├── Link do sekcji "hero" (z logo)
│   │   │
│   │   ├── Nawigacja (dynamika widoczności zależna od stanu i rozmiaru ekranu)
│   │   │   │
│   │   │   ├── Elementy nawigacyjne (mapowane z danych, reagują na kliknięcie)
│   │   │   │
│   │   │   └── HamburgerMenu (widoczny na mniejszych ekranach, stan zależny od nawigacji)
│   │   │
│   │   ├── Link "New account" (widoczny tylko na większych ekranach)
│   │   │
│   │   └── Przyciski "Sign in" i menu (dynamika widoczności zależna od rozmiaru ekranu)
│   │
│   └── (Potencjalne inne elementy, np. dodatkowe przyciski, jeśli byłyby dodane)
│
└── (Potencjalne inne sekcje, np. dodatkowy pasek informacyjny, jeśli by był)
<-------------

Dlaczego taka struktura?

**-> Responsywność i dostępność: Struktura zapewnia łatwą nawigację po stronie na różnych urządzeniach, dostosowując się do rozmiaru ekranu i preferencji użytkownika.

**-> Interaktywność: Użycie stanu openNav do kontrolowania widoczności elementów i możliwości przewijania strony zwiększa interakty

*/
