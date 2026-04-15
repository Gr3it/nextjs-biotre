# Struttura sito GAS

> Stack: Next.js + Tailwind CSS

## Navbar

Presente su tutte le pagine, contiene le voci di navigazione principali:

- **Home** — link alla homepage
- **Gestionale ordini** ↗ — link esterno
- **Webmail** ↗ — link esterno
- **Accesso area riservata** — bottone distinto visivamente (es. bottone pieno)

---

## Area pubblica

### Homepage

Pagina unica scorrevole che raccoglie:

- Presentazione del GAS
- Sezione "Chi siamo"
- Sezione "Contatti" con l'indirizzo email

---

## Area riservata

Accessibile tramite login. Contiene:

### Autenticazione — Auth0

- Provider: **Auth0** (piano gratuito)
- Integrazione tramite pacchetto ufficiale `@auth0/nextjs-auth0`
- Il middleware Next.js protegge tutte le route sotto `/area-riservata/*`, reindirizzando al login Auth0 se la sessione non è attiva
- Dopo il login, Auth0 reindirizza alla dashboard dell'area riservata
- Nessuna gestione manuale di sessioni o token: tutto delegato all'SDK

---

### Calendario ordini

**Fonte dati:** Google Sheet nel Drive dell'account di gestione del GAS.

**Accesso:** tramite Google Sheets API v4, autenticato con un service account Google (credenziali lato server, mai esposte al client).

**Struttura attesa del foglio** (da concordare):

| Produttore | Gen | Feb | Mar | Apr | … | Dic |
|------------|-----|-----|-----|-----|---|-----|
| Nome       |  ✓  |     |  ✓  |     |   |  ✓  |

**Rendering:** il sito legge i dati e li mostra come tabella HTML stilata con Tailwind.

**Strategia di fetch — da decidere in base all'hosting:**

| Scenario hosting | Strategia consigliata |
|---|---|
| Vercel / Netlify (serverless) | ISR (Incremental Static Regeneration) — pagina rigenerata ogni N minuti (`revalidate`) |
| VPS / container sempre attivo | SSR con cache in memoria, o ISR con `revalidate` breve |
| Hosting statico puro | Non applicabile — richiede SSR o ISR |

Con ISR la pagina viene servita da cache (veloce) e rigenerata in background dopo il timeout impostato, senza bisogno di intervento manuale. Se i dati cambiano raramente, un `revalidate` di 3600 secondi (1 ora) o anche 86400 (1 giorno) è sufficiente.

> **Nota:** la revalidazione on-demand tramite webhook (es. trigger da uno script quando si modifica il foglio) è possibile con Next.js ma aggiunge complessità. Da valutare solo se serve aggiornamento immediato.

---

### Verbali

**Fonte dati:** cartella `verbali/` nel Drive dell'account di gestione del GAS.

**Accesso:** tramite Google Drive API v3, stesso service account usato per il foglio ordini. La cartella deve essere condivisa con il service account in lettura.

**Logica:** il sito elenca i file nella cartella e genera automaticamente i link di download/visualizzazione. L'ordine può essere per data di creazione o per nome file (es. `2024-03-verbale.pdf`).

**Strategia di fetch — stesse considerazioni del calendario:**

| Scenario | Strategia |
|---|---|
| Hosting serverless | ISR con `revalidate` medio (es. 3600s). Oppure revalidazione on-demand tramite webhook dopo ogni upload su Drive |
| SSR puro | Fetch ad ogni richiesta — più semplice, leggermente più lento |

Con ISR il vantaggio è che un nuovo verbale caricato su Drive appare sul sito entro il tempo di revalidazione, senza deploy. Se si usa la revalidazione on-demand, si può triggerare uno script (o una Google Apps Script sul Drive) che chiama l'endpoint `/api/revalidate` di Next.js subito dopo l'upload.

---

### Riepilogo dipendenze tecniche area riservata

- `@auth0/nextjs-auth0` — autenticazione
- `googleapis` — client ufficiale per Sheets API e Drive API
- Service account Google con accesso in lettura al Drive di gestione
- Variabili d'ambiente necessarie: credenziali Auth0, credenziali service account Google, ID del foglio ordini, ID della cartella verbali

---

## Footer

Presente su tutte le pagine, organizzato in tre colonne:

### Documenti

- Statuto *(pagina web, con opzione scarica PDF)*
- Regolamento *(pagina web, con opzione scarica PDF)*
- Modulo iscrizione *(PDF da scaricare e stampare)*

### Link rapidi

- Gestionale ordini ↗
- Webmail ↗

### Info

- Privacy policy
- © Anno — Nome GAS
