# 🌿 Piano di Implementazione — Sito Biotre GAS

> **Stack:** Next.js 16.2.3 · Tailwind CSS v4 · TypeScript · Auth0 · Google APIs
> **Riferimenti:** `struttura-sito-gas.md` · `bozza-copy.md` · `style-guidelines.md`

---

## Fase 1 — Frontend (Area Pubblica)

### Step 1.1 — Design System & Global Styles

**File:** `app/globals.css`

- [x] Definire CSS custom properties (variabili di colore, tipografia, spaziatura) secondo `style-guidelines.md`
- [x] Importare font Google (`Lora` per i titoli, `Inter` per il body) tramite `next/font/google`
- [x] Configurare colori Tailwind v4 con `@theme` nel CSS (verde bosco, crema, terracotta — vedi style-guidelines)
- [x] Aggiungere reset/base layer: `box-sizing`, `scroll-behavior: smooth`, selezione testo con il colore brand

---

### Step 1.2 — Layout Root

**File:** `app/layout.tsx`

- [x] Applicare i font importati come classi CSS alla `<html>` o `<body>`
- [x] Aggiungere `<meta>` SEO di base: `description`, `og:title`, `og:image` con il logo
- [x] Impostare `lang="it"` sull'elemento `<html>`
- [x] Wrappare il contenuto con `<Navbar />` e `<Footer />` (creati negli step successivi)

---

### Step 1.3 — Componente Navbar

**File:** `components/Navbar.tsx`

Voci di navigazione da `struttura-sito-gas.md`:

- [x] Logo (usa `LogoSmall.png` per mobile, `LogoFull.png` o `LogoWithText.png` per desktop) con `next/image`
- [x] **Home** — link interno `/`
- [x] **Gestionale Ordini ↗** — link esterno `http://www.agora-gas.it/gas/ag3_biotre/` con `target="_blank" rel="noopener noreferrer"`
- [x] **Webmail ↗** — link esterno `http://webmail.biotre-tn.it/` con `target="_blank" rel="noopener noreferrer"`
- [x] **Accesso Area Riservata** — bottone CTA visivamente distinto (stile pieno, colore accent)
- [x] Hamburger menu per mobile con stato `open/closed` in `useState`
- [x] Navbar sticky con **sfondo solido** (`--color-bg` o `--color-bg-dark`) — niente `backdrop-blur`, niente ombra

---

### Step 1.4 — Componente Footer

**File:** `components/Footer.tsx`

Struttura a 3 colonne da `struttura-sito-gas.md`:

- [x] **Colonna Documenti:**
  - Statuto (link pagina web `/statuto`)
  - Regolamento (link pagina web `/regolamento`)
  - Modulo iscrizione (link diretto al PDF in `public/documents/`)
- [x] **Colonna Link Rapidi:**
  - Gestionale Ordini ↗
  - Webmail ↗
- [x] **Colonna Info:**
  - © 2025 — Biotre GAS Trento
- [x] Logo centrato sopra le colonne (o piccolo a sinistra)

---

### Step 1.5 — Sezione Hero (Homepage)

**File:** `app/page.tsx` — sezione `#hero`

Dal copy in `bozza-copy.md`:

- [x] Mostrare `LogoWithText.png` centrato e prominente
- [x] Tagline o claim sotto il logo (es. _"Acquisto critico, km 0, comunità"_)
- [x] Carosello immagini sotto il logo:
  - useState per l'indice corrente, auto-play ogni 4s, frecce prev/next, indicatori pallino
  - Immagini da aggiungere in `public/images/hero`
- [x] Smooth scroll verso la sezione successiva con freccia in basso
- [x] Animazione d'entrata (fade-in + slide-up) per logo e testo

---

### Step 1.6 — Sezione Chi Siamo (Homepage)

**File:** `app/page.tsx` — sezione `#chi-siamo`

Dal copy in `bozza-copy.md`:

- [x] Titolo `<h2>Chi siamo</h2>`
- [x] Paragrafo del copy: _"Per capire chi siamo, bisogna partire dal giardino di Roberta..."_
- [x] Badge o stat highlight: **30 soci** · **km 0** · **biologico**
- [x] Foto del gruppo in `public/images/members`

---

### Step 1.7 — Sezione Contatti (Homepage)

**File:** `app/page.tsx` — sezione `#contatti`

Dal copy in `bozza-copy.md`:

- [x] Titolo `<h2>Contatti</h2>`
- [x] Testo del copy definitivo
- [x] Link `mailto:info@biotre-tn.it` stilato come bottone secondario
- [x] Sfondo a contrasto alternato rispetto alla sezione precedente

---

### Step 1.8 — Pagine Statiche Documenti

**File:** `app/statuto/page.tsx` · `app/regolamento/page.tsx`

- [x] Layout riutilizzabile `DocumentPage` con titolo `<h1>`, corpo testuale, bottone "Scarica PDF"
- [x] PDF da collocare in `public/documents/` (statuto.pdf, regolamento.pdf)
- [x] `generateMetadata` per il SEO di ciascuna pagina

---

## Fase 2 — Autenticazione con Auth0

> **Prerequisiti:** account Auth0 gratuito, applicazione creata, domain + client ID disponibili.

### Step 2.1 — Installazione & Configurazione

```bash
npm install @auth0/nextjs-auth0
```

**File:** `.env.local`

```env
AUTH0_SECRET='valore-casuale-32-char'   # openssl rand -hex 32
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://<DOMAIN>.auth0.com'
AUTH0_CLIENT_ID='<CLIENT_ID>'
AUTH0_CLIENT_SECRET='<CLIENT_SECRET>'
```

- [ ] Creare applicazione Auth0 (tipo: Regular Web App)
- [ ] Aggiungere `http://localhost:3000/api/auth/callback` agli Allowed Callback URLs
- [ ] Aggiungere `http://localhost:3000` agli Allowed Logout URLs
- [ ] Leggere la doc in `node_modules/next/dist/docs/` prima di procedere

---

### Step 2.2 — Route Handler Auth0

**File:** `app/api/auth/[auth0]/route.ts`

- [ ] Usare `handleAuth()` dell'SDK per creare automaticamente le route:
  - `GET /api/auth/login`
  - `GET /api/auth/logout`
  - `GET /api/auth/callback`
  - `GET /api/auth/me`
- [ ] Configurare nel handler del login, così dopo il login Auth0 riporta l'utente sulla pagina di origine:

---

### Step 2.3 — Middleware di Protezione

**File:** `middleware.ts` (root del progetto)

L'SDK `@auth0/nextjs-auth0` fornisce già `withMiddlewareAuthRequired()` (importato da `@auth0/nextjs-auth0/edge`): basta wrappare il middleware con quel helper e Auth0 gestisce il redirect al login in automatico per tutte le route protette.

```ts
// middleware.ts
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ["/area-riservata/:path*"],
};
```

- [ ] Importare `withMiddlewareAuthRequired` da `@auth0/nextjs-auth0/edge`
- [ ] Esportare `default withMiddlewareAuthRequired()` — nessuna logica custom necessaria
- [ ] Impostare il `matcher` su `/area-riservata/:path*` — asset statici e API pubbliche non sono toccati
- [ ] Verificare che il `matcher` escluda anche `/_next/static`, `/_next/image`, `/favicon.ico` (comportamento di default del `matcher` di Next.js)

> **Nota versione:** verificare che `@auth0/nextjs-auth0` installato supporti l'import da `/edge`. Dal v3 in poi è garantito; per versioni precedenti usare `withMiddlewareAuthRequired` da `@auth0/nextjs-auth0/middleware`.

---

### Step 2.4 — Navbar condizionale Login/Logout

**File:** `components/Navbar.tsx` (aggiornamento)

Dopo il login l'utente rimane sulla homepage. La navigazione alle aree protette avviene **direttamente dalla Navbar**, che si trasforma in base allo stato della sessione.

- [ ] Usare `useUser()` dell'SDK per leggere lo stato sessione lato client
- [ ] Utente **non loggato**: mostrare il bottone CTA "Accesso Area Riservata" → `/api/auth/login`
- [ ] Utente **loggato**: sostituire il bottone CTA con:
  - Link **"Calendario Ordini"** → `/area-riservata/calendario`
  - Link **"Verbali"** → `/area-riservata/verbali`
  - Separatore visivo (es. `|` o `·`)
  - Bottone **"Esci"** → `/api/auth/logout?returnTo=/`
- [ ] Su mobile (hamburger aperto): gli stessi link appaiono in colonna nel menu verticale
- [ ] Il nome/avatar dell'utente è opzionale — da valutare se aggiunge valore senza appesantire la barra

---

## Fase 3 — Integrazione Google APIs

> **Prerequisiti:** progetto Google Cloud attivo, Service Account con chiave JSON, Sheets API e Drive API abilitate.

### Step 3.1 — Installazione Client Google

```bash
npm install googleapis
```

---

### Step 3.2 — Variabili d'ambiente Service Account

**File:** `.env.local` (aggiungere)

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL='account@progetto.iam.gserviceaccount.com'
GOOGLE_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
GOOGLE_SHEETS_ID='id-del-foglio-ordini'
GOOGLE_DRIVE_FOLDER_ID='id-della-cartella-verbali'
```

- [ ] Condividere il foglio Sheets con l'email del service account (lettura)
- [ ] Condividere la cartella Drive con l'email del service account (lettura)

---

### Step 3.3 — Utility Server-Side Google Auth

**File:** `lib/google.ts`

- [ ] `getGoogleAuth()` — istanzia `google.auth.GoogleAuth` con le credenziali env
- [ ] `getSheetsClient()` — client Sheets autenticato (solo server-side)
- [ ] `getDriveClient()` — client Drive autenticato (solo server-side)

---

### Step 3.4 — API Route: Calendario Ordini

**File:** `app/api/calendario/route.ts`

- [ ] Chiamata `spreadsheets.values.get` sul range del foglio (es. `Sheet1!A1:M50`)
- [ ] Parsing in array `{ produttore: string, mesi: Record<string, boolean> }[]`
- [ ] `export const revalidate = 3600` (ISR, 1 ora)
- [ ] Risposta JSON tipizzata con TypeScript

---

### Step 3.5 — Pagina Calendario Ordini

**File:** `app/area-riservata/calendario/page.tsx`

- [ ] Fetch dei dati dall'API route (o direttamente dalla funzione server)
- [ ] Tabella HTML: colonne = mesi, righe = produttori, celle = ✓ / –
- [ ] Colonna "Produttore" fissa su mobile (sticky horizontal scroll)
- [ ] Header mesi sticky verticalmente
- [ ] Skeleton loading e stato di errore

---

### Step 3.6 — API Route: Verbali

**File:** `app/api/verbali/route.ts`

- [ ] Chiamata `files.list` con filter `parents in '<FOLDER_ID>'`
- [ ] Campi: `id`, `name`, `createdTime`, `webViewLink`, `webContentLink`
- [ ] Ordinamento per `createdTime` decrescente
- [ ] `export const revalidate = 3600`

---

### Step 3.7 — Pagina Verbali

**File:** `app/area-riservata/verbali/page.tsx`

- [ ] Lista verbali: nome, data, link "Visualizza" + "Scarica"
- [ ] Icona PDF accanto al nome
- [ ] Empty state e stato di errore

---

## Checklist Pre-Deploy

- [ ] Variabili d'ambiente configurate nel pannello hosting (Vercel, ecc.)
- [ ] `AUTH0_BASE_URL` aggiornata con il dominio di produzione
- [ ] Callback URL Auth0 aggiornati con il dominio di produzione
- [ ] Test login/logout completo in produzione
- [ ] Test accesso calendario e verbali da utente loggato
- [ ] Test redirect al login da utente non loggato su `/area-riservata/*`
- [ ] Ottimizzare immagini hero (WebP, dimensioni per `next/image`)
- [ ] Verifica SEO: title, description, og tags su tutte le pagine
- [ ] Audit accessibilità: contrast ratio, focus states, aria-label sui link esterni
