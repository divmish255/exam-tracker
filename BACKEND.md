# Backend setup: email OTP login and report card upload

The site is still a static page (`index.html`, `app.js`, `data.js`, `styles.css`). The new `api/` folder holds Vercel serverless functions that the page calls.

| Endpoint | Method | What it does |
|---|---|---|
| `/api/send-otp` | POST `{email}` | Emails a 6-digit code (valid 10 minutes) |
| `/api/verify-otp` | POST `{email, otp}` | Checks the code and starts a 24-hour login session (HttpOnly cookie) |
| `/api/me` | GET / POST | GET: who is logged in. POST: log out |
| `/api/upload` | POST raw file body | Saves a PDF, JPG or PNG (max 4 MB) to Vercel Blob. Needs login |
| `/api/reports` | GET | Lists the logged-in student's uploaded report cards |

In the page: the **Login with Email** button now runs the real OTP flow, and the new **My Report Card** tab handles uploads.

## One-time setup

1. **Resend (sends the OTP emails):** create an account at https://resend.com and make an API key.
   Until you verify your own domain there, Resend only delivers to the email address you signed up with. Verify a domain to email any student.
2. **Vercel Blob (stores the files):** Vercel dashboard → your project → *Storage* → create a Blob store and connect it. This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. **Environment variables** (Vercel → Settings → Environment Variables), copy names from `.env.example`:
   - `AUTH_SECRET`: a long random string. Generate one with
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`: for example `BoardRank AI <onboarding@resend.dev>`
4. **Deploy:** push this folder to your GitHub repo (Vercel redeploys on every push), or run `npx vercel --prod`.

## Run locally

`npx serve .` only serves static files, so the backend will not work there. Use:

```
npm install
npx vercel dev
```

and put the variables from `.env.example` in a `.env.local` file (it is git-ignored).

## Known limits and next steps

- **No limit on OTP guesses.** A 6-digit code can be guessed with enough requests. Add rate limiting (Vercel Firewall rate-limit rule or Upstash Redis) on `/api/send-otp` and `/api/verify-otp` before real students use it.
- **Uploaded files have public but unguessable links.** Anyone who has a link can open it. For sensitive data, serve files through a login-protected endpoint.
- **4 MB upload cap** comes from Vercel's request size limit.
- **Study progress, mock scores and syllabus status are still saved in the browser (localStorage).** Moving them to a database (Neon or Supabase Postgres) would make them follow the student across devices.
