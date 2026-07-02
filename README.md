# von Neumann — AI Automation Agency (frontend scaffold)

Marketing frontend for **von Neumann AI Automation**. Design language follows the
Photon / Spectrum reference in `design inspiration/`: Apple-clean light canvas,
dark showcase panels, Inter + Geist Mono type, and a warm "spectrum" accent
gradient.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling (design tokens in `tailwind.config.ts`)
- **Framer Motion** for scroll/entry animation
- **lucide-react** for icons
- Fonts via `next/font` — Inter (UI) + Geist Mono (labels/code)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build / preview production:

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx        # fonts, metadata, <html>/<body>
  page.tsx          # section composition
  globals.css       # tokens, button/eyebrow/spectrum utilities
components/          # one file per section (Hero, Process, Platform, ...)
lib/content.ts      # all copy + section data in one place
tailwind.config.ts  # color tokens, radii, animations
```

## Where to edit

- **Copy & data** → `lib/content.ts`
- **Colors / radii / fonts** → `tailwind.config.ts` and `app/globals.css`
- **Sections** → the matching file in `components/`

## Design tokens

| Token        | Value     | Use                          |
| ------------ | --------- | ---------------------------- |
| `canvas`     | `#f5f5f7` | page background              |
| `surface`    | `#ffffff` | cards                        |
| `ink`        | `#0a0a0a` | dark showcase panels / text  |
| `amber`      | `#ffab2a` | primary accent               |
| `cyan`       | `#00bbff` | secondary accent             |
| spectrum     | gradient  | headline highlight, dividers |

> `design inspiration/` holds the saved reference pages and is excluded from the
> TypeScript build.
