# NC Facility Services — Deployment Checklist

Follow these in order. Check each box as you go so nothing gets missed.
Replace every `REPLACE_ME` placeholder with your real value.

---

## Part 1 — Push to GitHub (Git configured for THIS project only)

> Using `--local` sets your name/email for this repo only, and does **not** touch your global Git config.

- [ ] **1.1 Initialize the repo** (run from the project root `/Users/andreikalianchuk/NCcleaning`)
  ```bash
  cd /Users/andreikalianchuk/NCcleaning
  git init
  ```

- [ ] **1.2 Set your identity for THIS project only** (note: `--local`, not `--global`)
  ```bash
  git config --local user.name "REPLACE_ME_Your Name"
  git config --local user.email "REPLACE_ME_you@example.com"
  ```

- [ ] **1.3 Confirm it did NOT change your global config**
  ```bash
  git config --local --list   # should show your name/email
  git config --global user.email   # should be empty or your OTHER identity, unchanged
  ```

- [ ] **1.4 Verify secrets are ignored** — `.env` is already in `.gitignore`. Double-check it will NOT be committed:
  ```bash
  git status --porcelain | grep -i "\.env$" && echo "WARNING: .env is tracked!" || echo "OK: .env is ignored"
  ```
  You should see `OK: .env is ignored`. Never commit your real `.env`.

- [ ] **1.5 First commit**
  ```bash
  git add .
  git commit -m "Initial commit: NC Facility Services website"
  git branch -M main
  ```

- [ ] **1.6 Create the GitHub repo and push** — pick ONE option:

  **Option A — GitHub CLI (easiest):**
  ```bash
  gh auth login            # only needed once; choose GitHub.com + HTTPS
  gh repo create nc-facility-services --private --source=. --remote=origin --push
  ```

  **Option B — Manual (create the repo on github.com first, empty, no README):**
  ```bash
  git remote add origin https://github.com/REPLACE_ME_USERNAME/nc-facility-services.git
  git push -u origin main
  ```

- [ ] **1.7 Confirm the push worked**
  ```bash
  git remote -v
  git log --oneline -1
  ```
  Then refresh the repo page on GitHub — your files should be there (and **no** `.env`).

---

## Part 2 — Deploy on Netlify (connected to GitHub for auto-deploys)

- [ ] **2.1 Log in / sign up** at https://app.netlify.com (use your GitHub account).

- [ ] **2.2 Add new site** → **Import an existing project** → **GitHub** → authorize → pick the `nc-facility-services` repo.

- [ ] **2.3 Build settings** — Netlify reads `netlify.toml` automatically, so these should be pre-filled. Confirm:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`

- [ ] **2.4 Add environment variables** (Site settings → Environment variables → Add). These power the contact form:
  | Key | Value |
  |-----|-------|
  | `RESEND_API_KEY` | (from Part 3.2) |
  | `QUOTE_TO_EMAIL` | `ncfacilityserv@gmail.com` |
  | `QUOTE_FROM_EMAIL` | `NC Facility Services <onboarding@resend.dev>` (change after Part 4.5) |

  > You can add `RESEND_API_KEY` now if you already created it in Part 3, or come back after.

- [ ] **2.5 Deploy** — click **Deploy site**. Wait for the build to finish (green "Published").

- [ ] **2.6 Open the live URL** (e.g. `https://REPLACE_ME.netlify.app`) and click through every page: Home, Services + each service page, About, Service Areas, Contact.

- [ ] **2.7 Confirm auto-deploy works** — every `git push` to `main` will now trigger a new deploy automatically.

---

## Part 3 — Set up & test Resend (contact form email)

- [ ] **3.1 Create a Resend account** at https://resend.com and verify your account email.

- [ ] **3.2 Create an API key** — https://resend.com/api-keys → **Create API Key** → copy it (starts with `re_...`). You only see it once.

- [ ] **3.3 Put the key in Netlify** — add/confirm `RESEND_API_KEY` in Netlify env vars (Part 2.4), then trigger a redeploy (Deploys → Trigger deploy → Deploy site) so the new value is picked up.

- [ ] **3.4 (Optional) Test locally first** before relying on production:
  ```bash
  cp .env.example .env
  # edit .env and paste your real RESEND_API_KEY
  npx netlify dev
  ```
  Open the local URL, submit the quote form, and check `ncfacilityserv@gmail.com`.

- [ ] **3.5 Test on the live site** — go to your Netlify URL, fill out and submit the **Request a Quote** form with real Name / Phone / Email.

- [ ] **3.6 Confirm the email arrived** at `ncfacilityserv@gmail.com` (subject: "Quote Request from ...").
  **Check the spam/promotions folder** — with the default `onboarding@resend.dev` sender it often lands there until you verify your own domain (Part 4).

- [ ] **3.7 If it fails** — check Netlify → **Functions → send-quote** logs, and Resend → **Emails/Logs** dashboard for the error.

---

## Part 4 — Add your domain name

- [ ] **4.1 Get a domain** — buy one (Namecheap, Google/Squarespace, Cloudflare, etc.) or use one you own, e.g. `REPLACE_ME_ncfacilityservices.com`.

- [ ] **4.2 Add it in Netlify** — Site → **Domain management** → **Add a domain** → enter your domain.

- [ ] **4.3 Point DNS** — pick ONE:
  - **Easiest:** use **Netlify DNS** → Netlify gives you 4 nameservers → set them at your domain registrar (replace the registrar's default nameservers).
  - **Or keep your registrar's DNS** → add the records Netlify shows (an `A` record for the apex `@` → Netlify's load balancer IP, and a `CNAME` for `www` → your `*.netlify.app`).
  - DNS changes can take from a few minutes up to 24–48 hours to propagate.

- [ ] **4.4 Enable HTTPS** — Netlify auto-provisions a free Let's Encrypt SSL certificate once DNS resolves. Confirm the padlock shows on `https://yourdomain`.

- [ ] **4.5 Verify the domain in Resend (so email comes FROM your domain, not spam)**
  - Resend → **Domains** → **Add Domain** → enter your domain.
  - Add the **DKIM / SPF / (DMARC)** DNS records Resend gives you at your DNS provider.
  - Wait for Resend to show the domain as **Verified**.

- [ ] **4.6 Update the sender address** — once verified, change `QUOTE_FROM_EMAIL` in Netlify env vars to use your domain, e.g.:
  ```
  QUOTE_FROM_EMAIL=NC Facility Services <quotes@REPLACE_ME_ncfacilityservices.com>
  ```
  Then **redeploy** (Deploys → Trigger deploy).

- [ ] **4.7 Re-test the form** from the live domain and confirm the email now arrives in the **inbox** (not spam) from your domain address.

- [ ] **4.8 Final smoke test** — visit `https://yourdomain`, check the logo/images load, submit the form once more, confirm receipt.

---

## Quick reference

- Recipient email: `ncfacilityserv@gmail.com`
- Business phone: `509-555-0198`
- Env vars needed on Netlify: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`
- Build: `npm run build` → publish `dist` → functions in `netlify/functions`
- Never commit `.env` (already gitignored).
