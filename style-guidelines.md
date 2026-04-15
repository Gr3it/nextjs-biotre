# 🌿 Style Guidelines — Biotre GAS

> Queste linee guida devono essere rispettate in **tutte** le pagine e componenti del sito, sia nell'area pubblica che nell'area riservata.

---

## 1. Palette Colori

La palette è ispirata alla natura, alla terra e all'agricoltura biologica. Tonalità naturali e calde, mai colori saturi o artificiali.

| Nome Token              | Colore          | Hex       | Uso                                      |
| ----------------------- | --------------- | --------- | ---------------------------------------- |
| `--color-primary`       | Verde Bosco     | `#3A5A40` | CTA primari, link attivi, accenti        |
| `--color-primary-dark`  | Verde Profondo  | `#2D4531` | Hover su primary, header scuro           |
| `--color-primary-light` | Verde Salvia    | `#6B9E73` | Badge, sfumature, icone                  |
| `--color-accent`        | Terracotta      | `#B5603A` | Accenti secondari, hover su outline, tag |
| `--color-bg`            | Crema           | `#FAF7F2` | Sfondo principale pagina                 |
| `--color-bg-alt`        | Avorio          | `#F0EBE1` | Sezioni alternate (es. Chi siamo)        |
| `--color-bg-dark`       | Verde Notte     | `#1E2D22` | Footer, header area riservata            |
| `--color-text`          | Marrone Grafite | `#2C2416` | Testo principale (body)                  |
| `--color-text-muted`    | Grigio Caldo    | `#6B5E4E` | Testo secondario, caption, placeholder   |
| `--color-border`        | Beige Bordo     | `#DDD4C5` | Linee divisorie, bordi card              |
| `--color-white`         | Bianco Puro     | `#FFFFFF` | Sfondo card, testo su dark               |
| `--color-error`         | Rosso Terra     | `#A53325` | Messaggi di errore                       |
| `--color-success`       | Verde Chiaro    | `#4A7A52` | Messaggi di successo, check              |

### Regole d'uso colori

- Il **verde bosco** è il colore dominante: usarlo per CTA principali, link nel nav, bordi active
- La **terracotta** è l'accento caldo: usarla con parsimonia (max 1-2 elementi per vista)
- I **fondi crema/avorio** creano profondità tra le sezioni senza usare ombre pesanti
- Il **testo** va sempre testato per il contrasto: minimo ratio **4.5:1** su sfondo chiaro, **3:1** su sfondo scuro
- **Mai** usare nero puro `#000` o bianco puro `#fff` per i testi — usare i token sopra

---

## 2. Tipografia

Il sito usa **due font**: uno serif caldo per i titoli, uno sans-serif moderno per il corpo.

### Font-family

| Ruolo                    | Font                   | Import             |
| ------------------------ | ---------------------- | ------------------ |
| **Titoli** (h1–h4)       | `Lora` (Google Fonts)  | `next/font/google` |
| **Corpo** (p, label, UI) | `Inter` (Google Fonts) | `next/font/google` |

### Scala tipografica

| Classe / Token | Dimensione        | Peso | Uso                         |
| -------------- | ----------------- | ---- | --------------------------- |
| `text-display` | `3.5rem` (56px)   | 700  | Hero title (solo homepage)  |
| `text-h1`      | `2.5rem` (40px)   | 700  | Titolo principale di pagina |
| `text-h2`      | `1.875rem` (30px) | 600  | Titoli sezione              |
| `text-h3`      | `1.375rem` (22px) | 600  | Sottotitoli, titoli card    |
| `text-h4`      | `1.125rem` (18px) | 600  | Label, intestazioni tabella |
| `text-body`    | `1rem` (16px)     | 400  | Testo corrente              |
| `text-small`   | `0.875rem` (14px) | 400  | Caption, note, meta info    |
| `text-xs`      | `0.75rem` (12px)  | 400  | Badge, tag, tooltip         |

### Regole tipografiche

- `Lora` solo per `h1`–`h4` e display — mai per label, bottoni, o testo UI
- `Inter` per tutto il corpo testo, navigazione, bottoni, form
- **Line-height:** `1.7` per il corpo, `1.2` per i titoli
- **Letter-spacing:** `-0.02em` per i titoli grandi, `0` per il corpo
- Testo mainbody: **max-width `65ch`** per la leggibilità delle colonne di testo

---

## 3. Spaziatura e Layout

### Spacing scale

Usare multipli di `4px` (sistema a 4pt):

| Token        | Valore | Uso tipico                           |
| ------------ | ------ | ------------------------------------ |
| `--space-1`  | `4px`  | Gap interno micro                    |
| `--space-2`  | `8px`  | Gap icon-text, padding tag           |
| `--space-3`  | `12px` | Padding bottoni small                |
| `--space-4`  | `16px` | Padding default, gap colonne strette |
| `--space-6`  | `24px` | Padding card, gap sezioni interne    |
| `--space-8`  | `32px` | Margine tra blocchi                  |
| `--space-12` | `48px` | Padding sezioni desktop              |
| `--space-16` | `64px` | Spaziatura verticale tra sezioni     |
| `--space-24` | `96px` | Padding hero                         |

### Layout

- **Max-width contenuto:** `1400px` centrato con `margin: 0 auto`
- **Padding laterale pagina:** `16px` mobile · `24px` tablet · `48px` desktop
- **Grid:** preferire CSS Grid per layout a colonne; Flexbox per allineamenti lineari
- **Breakpoint:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

---

## 4. Componenti UI

### Bottoni

| Variante      | Sfondo            | Testo                | Bordo             | Hover                                |
| ------------- | ----------------- | -------------------- | ----------------- | ------------------------------------ |
| **Primary**   | `--color-primary` | bianco               | —                 | `--color-primary-dark` + scale(1.02) |
| **Secondary** | trasparente       | `--color-primary`    | `--color-primary` | bg `--color-primary` + testo bianco  |
| **Ghost**     | trasparente       | `--color-text-muted` | `--color-border`  | bg `--color-bg-alt`                  |
| **Danger**    | `--color-error`   | bianco               | —                 | opacità 0.9                          |

**Proprietà comuni bottoni:**

- `border-radius: 8px`
- `padding: 10px 20px` (default) · `6px 14px` (small)
- `font-family: Inter` · `font-weight: 500` · `font-size: 0.9375rem`
- `transition: all 200ms ease`
- Focus outline: `2px solid --color-primary` con `outline-offset: 2px`

### Card

- `background: --color-white`
- `border: 1px solid --color-border`
- `border-radius: 12px`
- `padding: --space-6`
- `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`
- Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.10)` + `translateY(-2px)`
- Transizione: `200ms ease`

### Link navigazione

- Colore default: `--color-text`
- Hover: `--color-primary` + `text-decoration: underline` (offset 3px)
- Active/current: `--color-primary` + `font-weight: 600`
- Link esterni: aggiungere sempre icona `↗` o equivalente SVG

### Input / Form

- `border: 1px solid --color-border`
- `border-radius: 8px`
- `padding: 10px 14px`
- Focus: `border-color: --color-primary` + `box-shadow: 0 0 0 3px rgba(58,90,64,0.15)`
- Placeholder: `--color-text-muted`

---

## 5. Immagini e Loghi

### Loghi disponibili

| File                           | Uso                             |
| ------------------------------ | ------------------------------- |
| `public/logo/LogoFull.png`     | Hero homepage, pagine documento |
| `public/logo/LogoWithText.png` | Navbar desktop, footer          |
| `public/logo/LogoSmall.png`    | Navbar mobile, favicon fallback |

### Regole immagini

- Usare **sempre** `next/image` per ottimizzazione automatica (WebP, lazy loading)
- Fornire `alt` descrittivo su ogni immagine — mai `alt=""` su immagini contenuto
- Immagini hero: aspect ratio `16:9` o `21:9`, `object-fit: cover`
- Non stirare mai i loghi: usare `width`/`height` proporzionali o `object-fit: contain`

---

## 6. Iconografia

- Usare **Heroicons** (outline per UI, solid per stati attivi) — già compatibili con Tailwind
- Dimensioni standard: `20px` (inline), `24px` (standalone), `32px` (feature icon)
- Colore: ereditare dal contenitore (`currentColor`) — mai hardcodare colori nelle SVG
- Link esterni: sempre accompagnati dall'icona `ArrowTopRightOnSquareIcon`

---

## 7. Motion & Animazioni

Tenere le animazioni **sottili e funzionali**, non decorative.

### Principi

- Durata: `150ms`–`300ms` per interazioni UI, `400ms`–`600ms` per entrate pagina
- Easing: `ease` per entrate, `ease-in` per uscite, `ease-in-out` per transizioni bidirezionali
- Nessuna animazione su elementi `prefers-reduced-motion: reduce` — usare sempre il media query

### Pattern standard

```css
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 400ms ease forwards;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Transizioni hover

- Bottoni: `transform scale(1.02)` + cambio colore — `200ms ease`
- Card: `translateY(-2px)` + ombra — `200ms ease`
- Link nav: cambio colore — `150ms ease`

---

## 8. Accessibilità

- **Contrasto minimo:** 4.5:1 per testo normale, 3:1 per testo grande (≥18pt) — verificare con [contrast checker](https://webaim.org/resources/contrastchecker/)
- **Focus visibile** su tutti gli elementi interattivi: outline `2px solid --color-primary`
- **aria-label** su tutti i link che non hanno testo visibile (es. icone, bottoni con solo logo)
- **`rel="noopener noreferrer"`** su tutti i link `target="_blank"`
- Struttura heading semantica: una sola `<h1>` per pagina, gerarchia corretta `h2` → `h3`
- Immagini decorative: `alt=""` e `aria-hidden="true"`

---

## 9. Responsive Design

### Principi

- **Mobile-first**: scrivere gli stili base per mobile, poi sovrascrivere con breakpoint più grandi
- Navbar: hamburger su mobile (< md), orizzontale da `md` in su
- Sezioni homepage: colonna singola su mobile, affiancate su desktop
- Footer: colonna singola su mobile, 3 colonne su desktop
- Tabella calendario: scroll orizzontale su mobile con colonna produttore sticky

### Touch targets

- Tutti i bottoni e link devono avere un'area cliccabile minima di `44×44px`
- Aumentare il padding piuttosto che la dimensione del testo per raggiungere il requisito

---

## 10. SEO & Metadata

Ogni pagina deve avere:

```tsx
// app/NomePagina/page.tsx
export const metadata = {
  title: "Titolo Pagina — Biotre GAS Trento",
  description: "Descrizione unica della pagina (max 160 char)",
  openGraph: {
    title: "Titolo Pagina — Biotre GAS Trento",
    description: "Descrizione OG",
    images: ["/logo/LogoFull.png"],
  },
};
```

- **Title format:** `[Titolo Pagina] — Biotre GAS Trento`
- **Description:** unica per ogni pagina, max 160 caratteri
- **OG image:** `LogoFull.png` come fallback, immagine contestuale dove disponibile
- `lang="it"` sull'elemento `<html>` (già in layout.tsx)
