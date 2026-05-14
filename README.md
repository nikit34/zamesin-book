# AURA Book Reader — variant "Quiet Authority"

**Live:** [nikit34.github.io/zamesin-book](https://nikit34.github.io/zamesin-book/) · deploys from `main` via GitHub Actions

Design-contest entry for [@zamesin](https://t.me/zamesin/2516)'s book-reader site for the *Advanced Jobs To Be Done* book and the future AURA library.

The chapter you read in the browser is the same `demo-chapter.md` referenced in the brief, translated and adapted into English with the four voices, the gas-station gallery, the case-study quartet and every block type from §7.4 of the brief.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle in dist/
npm run preview  # serve dist/ on http://localhost:4173
```

Node 20+. Build output is plain static HTML/CSS/JS, ready for Netlify / Vercel / GitHub Pages.

## Direction — "Quiet Authority"

The brief asks for *Linear / Notion clean + book-reading feel*; *modern serious, mature, authoritative, without academic dust, without SaaS-coldness*. This variant reads that brief as:

> A warm paper-tone surface, near-black ink, a single oxblood accent, and a second teal voice for the Skeptic. A clear three-column shell with sticky context on the left two columns and unhurried whitespace around the reading column. Body in a humanist serif, headings in a sharp grotesque, UI in mono caps.

### Palette (light theme only, per brief §12)

| Token              | Value     | Where it shows |
|--------------------|-----------|---|
| `--paper`          | `#F7F4EE` | page surface |
| `--paper-elev`     | `#FBF9F4` | cards, callouts |
| `--paper-sunk`     | `#EFEAE0` | inline code background, kbd |
| `--ink`            | `#1B1A17` | primary text, drop cap |
| `--ink-soft`       | `#4A463F` | secondary text |
| `--ink-mute`       | `#807A70` | captions, kicker, status pills |
| `--accent`         | `#9C2A1A` | active chapter, accent rules, drop cap, ordered-list markers, in-page links |
| `--skeptic`        | `#20524C` | Skeptic block, operational callout, "Read" state |

### Typography (all OFL / Apache, no licensing surprises)

- **Display & UI** — [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) (variable, SIL OFL).
- **Body & pull-quotes** — [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) (variable, optical-size axis, SIL OFL).
- **Mono / labels / chapter kicker / code** — [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Apache 2.0).

Sources & licenses are commented at the top of `index.html` and `src/styles/main.css`.

## What's in v1

- **Chapter reader (`/books/{book}/{chapter}` shape)** — 3-column layout per brief §7.1, sticky rail + sticky chapter context + reading column. Every block type from §7.4 is wired and styled.
- **TOC overlay (`Cmd+K` / `Cmd+/` / click on "Table of contents")** — full-bleed sheet, 40 chapters across 6 Parts, current chapter highlighted, draft/up-next/in-progress badges per brief §13.1.
- **Global client-side search** — MiniSearch index built from the catalog, prefix + fuzzy, keyboard-navigable (↑/↓/Enter), highlighted matches.
- **Copy-link button** — `navigator.clipboard` + 2-second confirm flash.
- **Contributors line** — `<details>` that shows the 5 contributors only when there are any.
- **Mobile (≤767 px)** — single column, top app-bar with brand + nav, floating "Contents" pill bottom-right, full-bleed TOC overlay.
- **PCA-inspired `?progress=NN.NN` URL** — scroll position persists in the URL, shareable deep-links per `t.me/zamesin/2516` (the brief's own deep-link `?progress=8.74` is the precedent).
- **Galleries in three layouts** — `row`, `strip` (horizontal-scroll snap), `grid` (2-col on desktop, 1-col on mobile).
- **Skeptic** — distinct teal voice with the badge breaking through the border.
- **Scholar quote** — `Cited`-tagged horizontal section with mono caps citation.
- **Callout** — operational box with arrow heading and teal rule.
- **Drop cap** on the first paragraph, in the accent color.

## What's left for v2 (per brief)

- `/` landing, `/books` shelf, `/books/{slug}` book page, `/canon` page.
- A real chapter-state store keyed to local storage (Read / Reading / Unread).
- Two-pane "PCA spread" block — researched the technique (`position: sticky; margin-top: -100lvh` + per-block 50% lanes) but not implemented in v1 since brief §7.4 marks it optional.
- Tablet middle-column drawer (currently the middle column hides at <1024 px and reappears via the FAB-opened TOC).

## File map

```
DESIGN-BRIEF.md            # the brief, captured verbatim
demo-chapter.md            # the chapter source — markdown with custom :::gallery and :::callout containers
index.html                 # shell + the rendered chapter is inlined here at build time
vite.config.js             # custom plugin that renders demo-chapter.md into index.html
src/
  main.js                  # entry — wires the modules
  lib/markdown.js          # markdown-it config + custom containers + frontmatter parser
  scripts/
    decorate-chapter.js    # post-render DOM tweaks (captions, gallery figures, pull-quote)
    scrollspy.js           # current-section highlight in the middle column
    copy-link.js           # canonical-URL clipboard handler
    catalog.js             # the multi-book / 40-chapter catalog used by TOC + search
    toc.js                 # TOC overlay open/close + render
    search.js              # MiniSearch + ⌘K + keyboard nav
    progress.js            # PCA-style `?progress=...` URL sync
  styles/main.css          # one stylesheet, tokenized; see header comment for the directional brief
public/favicon.svg
```

## Notes for the next iteration

- Each book gets a slot for its own accent color in `:root` (currently every book inherits the oxblood). Brief §13.3 leans towards a shared palette across books — I left a single `--accent` for now, but the variable swap is trivial when v2 starts.
- The `::: gallery` / `::: callout` syntax intentionally uses **square brackets** (`[layout="strip"]`) instead of curly braces, because `markdown-it-attrs` claims `{...}` for itself. This is documented in `src/lib/markdown.js`.
- The fonts load from `fonts.googleapis.com`. For air-gap or offline-print builds, self-host the OFL files.
