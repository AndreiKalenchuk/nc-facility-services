# Quote form email — setup steps

Domain: **ncfacilityserveces.com**
DNS host: **Netlify** (Namecheap nameservers point to `dns1–4.p01.nsone.net`)
Everything below is done by you. No Namecheap access needed.

---

## Step 1 — Fix the domain in Resend

The domain currently in Resend is `ncfacilityservices.com`, which is not the domain you own.

1. Resend → Domains → delete `ncfacilityservices.com`
2. **Add domain** → `ncfacilityserveces.com`
3. Leave **Enable Sending** on and **Enable Receiving** off

Resend will show a fresh set of records. **The DKIM value will be different** from the one generated for the old domain — DKIM keys are generated per domain, so copy the new values, don't reuse the old ones.

## Step 2 — Add the records in Netlify DNS

Netlify → Domains → `ncfacilityserveces.com` → **DNS records** → Add new record.

| Type | Name | Value |
|---|---|---|
| TXT | `resend._domainkey` | the new `p=...` string from Resend |
| CNAME | `rsend` | `rsend.forge.rmta.net` |
| CNAME | `send` | `send.forge.rmta.net` |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |

Name field takes the prefix only — Netlify appends the domain. No quotes around TXT values. Default TTL.

## Step 3 — Verify

Resend → Domains → **I've added the records**. Usually a few minutes. Don't continue until it reads **Verified**.

## Step 4 — Netlify environment variable

Site configuration → Environment variables → **Add a variable**

- Key: `QUOTE_FROM_EMAIL`
- Value: `NC Facility Services <quotes@ncfacilityserveces.com>`

Your account forces per-context values, so paste the same string into Production, Deploy Previews, Branch deploys, and Preview Server contexts.

Confirm `QUOTE_TO_EMAIL` is still `ncfacilityserv@gmail.com`.

## Step 5 — Redeploy and test

Deploys → **Trigger deploy → Clear cache and deploy site**. Env var changes don't reach an already-built deploy.

Then submit the quote form. If it fails, Logs → Functions → `send-quote` shows the actual Resend error.

---

## Notes

- No mailbox is created at `quotes@ncfacilityserveces.com` and none is needed. Resend sends from any address at a verified domain. Replies go to the customer via `replyTo`; the quote itself lands in `ncfacilityserv@gmail.com`.
- `_dmarc` is optional in Resend. `p=none` is monitor-only — it doesn't affect delivery but helps Gmail inbox placement.
- Repo references updated to the `serveces` spelling: `src/data/company.js`, `.env.example`, `README.md`, `DEPLOYMENT.md`.
