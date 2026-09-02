# NC Facility Services LLC — Website

Marketing website for NC Facility Services LLC (commercial cleaning). Built with
React + Vite, deployed on Netlify, with a Resend-powered quote/contact form.

## Tech stack

- React 18 + Vite
- react-router-dom (multi-page SPA)
- Plain CSS (design tokens in `src/styles/global.css`)
- Netlify Functions + Resend for the contact/quote form

## Local development

```bash
npm install
```

Then run the full local stack (site + serverless function) with the Netlify CLI:

```bash
npx netlify dev
```

This serves the site at http://localhost:8888 and the function at
`/.netlify/functions/send-quote`.

To run only the frontend (the quote form won't send email):

```bash
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` and fill in your Resend key:

```bash
cp .env.example .env
```

| Variable          | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `RESEND_API_KEY`  | API key from https://resend.com/api-keys                           |
| `QUOTE_TO_EMAIL`  | Where form submissions are delivered (default `ncfacilityserv@gmail.com`) |
| `QUOTE_FROM_EMAIL`| Sender address. Uses Resend's test sender until you verify a domain |

> Note: Resend cannot send **from** a gmail.com address. It uses
> `onboarding@resend.dev` (test sender) by default. To send from a branded
> address (e.g. `quotes@ncfacilityserveces.com`), verify your domain in Resend
> and update `QUOTE_FROM_EMAIL`.

## Deploying to Netlify

1. Push this repo to GitHub and "Import from Git" in Netlify.
2. Build settings are read from `netlify.toml` (build `npm run build`, publish
   `dist`, functions `netlify/functions`).
3. In Netlify → Site settings → Environment variables, add `RESEND_API_KEY`
   (and optionally `QUOTE_TO_EMAIL` / `QUOTE_FROM_EMAIL`).
4. Deploy.

## Regenerating image assets

Logo, hero, service icons, and section images are cropped from the source
images (`IMG_4675.png`, `IMG_4770.png`) into `public/assets/`:

```bash
npm run extract-assets
```

## Project structure

```
netlify/functions/send-quote.js   # Resend email function
public/assets/                     # cropped images (logo, icons, hero, etc.)
scripts/extract-assets.mjs         # regenerates public/assets from source images
src/
  components/                      # TopBar, Header, Footer, QuoteForm, RequestQuoteBlock, ...
  data/                            # company info + services content
  pages/                           # Home (mockup-exact), Services, ServiceDetail, About, ServiceAreas, Contact
  styles/global.css                # design tokens + base styles
```
