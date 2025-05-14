# System organizacji imprez i wydarzeń

Aplikacja webowa umożliwiająca tworzenie, edytowanie oraz zarządzanie wydarzeniami i zaproszonymi użytkownikami. Projekt oparty na Node.js, Express oraz MongoDB z wykorzystaniem szablonów EJS.

## Funkcjonalności

- Tworzenie i edytowanie wydarzeń (eventów)
- Dodawanie i usuwanie zaproszonych użytkowników do wydarzenia
- Lista wszystkich wydarzeń
- Widok użytkowników przypisanych do konkretnego wydarzenia
- Prosty layout szablon ze stylem CSS

## Struktura projektu

- `/models` – modele `Event` i `User`
- `/controllers` – logika aplikacji: `eventController`, `userController`
- `/routing` – routing HTTP
- `/views` – widoki EJS
- `/public/css/main.css` – główny plik stylu dla layout
- `app.js` – główny plik aplikacji ze wszystkimi middleware funkcjami
- `server.js` - nasłuchuje na określonym porcie

##  Wymagania

- Node.js 
- MongoDB 

## Instalacja

```   bash
    git clone https://github.com/Sainettt/mvc-prjct.git
    cd mvc-prjct
    npm i
```

## Konfiguracja

- W projekcie znajduje się plik `.env.expamle`, należy utworzyć własny plik `.env` i dodać do niego swoje dane 

