# DJ Set Planner

Prosta aplikacja React + Vite do układania listy utworów. Działa lokalnie, bez backendu i bazy danych.

## Uruchomienie

W terminalu w folderze projektu:

```sh
npm install
npm run dev
```

Otwórz adres podany przez Vite (zwykle http://localhost:5173). Terminal musi pozostać uruchomiony. Zatrzymasz serwer skrótem Ctrl+C.

## Build

```sh
npm run build
npm run preview
```

Build tworzy gotową wersję w `dist/`. Preview pozwala ją sprawdzić w przeglądarce. Nie otwieraj `index.html` dwuklikiem — użyj serwera Vite.

## Pliki

- `index.html` — dokument HTML z miejscem na aplikację.
- `src/main.jsx` — uruchamia React i importuje style.
- `src/App.jsx` — formularz, lista, usuwanie i zapis w localStorage.
- `src/styles.css` — ciemny wygląd i układ dopasowany do telefonu.
- `package.json` — zależności i polecenia npm.
- `package-lock.json` — dokładne wersje zainstalowanych zależności.
- `.gitignore` — pomija wygenerowane pliki w Git.

## Dane

Wpisz utwór w jednym polu, np. `Rene Wise - Knock Motion`. Aplikacja rozdziela wykonawcę i tytuł przy pierwszym myślniku ze spacjami (obsługuje też `–` i `—`). Myślniki wewnątrz nazw i kolejne myślniki w tytule zostają zachowane. Wykonawca i tytuł są obowiązkowe.

Nowe utwory mają puste BPM i tonację, wyświetlane jako `—`. Wcześniej zapisane utwory zachowują swoje wartości. Aplikacja nie korzysta z zewnętrznego API.

Lista jest zapisywana w localStorage tej przeglądarki dla konkretnego adresu aplikacji. Czyszczenie danych przeglądarki usuwa listę. Inna przeglądarka lub inny port ma osobną listę. Nie ma synchronizacji ani wysyłania utworów na serwer.

## Czego się nauczyć

1. Komponenty React i JSX — jak opisać interfejs.
2. `useState` — jak zapamiętać formularz i listę oraz odświeżać widok.
3. Zdarzenia `onChange`, `onSubmit`, `onClick` — jak reagować na działania użytkownika.
4. `map` i `filter` — jak wyświetlać i usuwać elementy listy bez zmieniania starej tablicy.
5. `useEffect`, JSON i localStorage — jak zachować dane po odświeżeniu.
6. CSS Grid i media queries — jak dopasować układ do rozmiaru ekranu.

## Ręczne sprawdzenie

- Dodaj `Rene Wise - Knock Motion` i sprawdź wykonawcę oraz tytuł na liście. BPM i tonacja powinny wyświetlać `—`.
- Odśwież stronę — utwór powinien pozostać.
- Usuń utwór i ponownie odśwież stronę — nie powinien wrócić.
- Spróbuj wysłać pusty formularz, sam tytuł lub wpis bez wykonawcy — utwór nie powinien zostać dodany.
- Sprawdź widok na wąskim ekranie.
