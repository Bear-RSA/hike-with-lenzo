# Hiking with Lenzo & Friends

Single-page site for a Cape Town hiking guide. Visitors browse 21 trails across Table Mountain National Park, open a trail's details, and send an enquiry that lands in Lenzo's inbox via [Resend](https://resend.com).

Stack: Next.js 16 (App Router) · Tailwind v4 · Resend · zod · react-email.

## Run it

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev                         # http://localhost:3000
```

## Email setup (Resend)

1. Create an account at resend.com and an API key → `RESEND_API_KEY`.
2. Set `ENQUIRY_TO_EMAIL` to Lenzo's real inbox.
3. For testing, `ENQUIRY_FROM_EMAIL` can stay as `Hiking with Lenzo <onboarding@resend.dev>` — but Resend only lets that sender deliver to the email address that owns the API key. For production, verify a domain in Resend and use e.g. `Hiking with Lenzo <hello@hikingwithlenzo.co.za>`.

Every enquiry sends two emails: one to Lenzo (with *Reply-To* set to the hiker, so he just hits reply) and a confirmation to the hiker. The route also has a honeypot field and a light per-IP rate limit.

## Things Lenzo will want to change

| What | Where |
| --- | --- |
| Email, WhatsApp, Instagram, bio, credentials, stats, pricing | `lib/site.config.ts` |
| Trails (names, stats, copy, photos) | `lib/trails.ts` |
| Trail photos | Currently Unsplash. To use his own, put a file in `public/trails/` and set `image: "/trails/<file>.jpg"` on that trail |
| Testimonials, "what's included / what to bring" | `components/Sections.tsx` |
| Logo | `public/hiking-with-lenzo-logo-flat.png` (nav/favicon) and `public/hiking-with-lenzo-logo.png` (footer) |

Deep link to a pre-selected trail: `/?trail=lions-head#enquire`.

## Deploy

Push to GitHub and import into Vercel. Add the three environment variables in the Vercel project settings. Update `site.url` in `lib/site.config.ts` to the live domain.
