# NTP Cuber — Next.js

Modern speedcubing platform built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Then edit .env.local with your Supabase credentials
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── page.tsx              # Home (/)
├── layout.tsx            # Root layout — Navbar + Footer + LanguageProvider
├── globals.css           # Tailwind v4 + reveal animation
├── courses/
│   ├── page.tsx          # /courses — Course listing
│   └── [slug]/page.tsx   # /courses/zbll-mastery — Video learning page
├── coaching/page.tsx     # /coaching — Services + booking form
├── resources/page.tsx    # /resources — Algorithm sheets
├── dashboard/page.tsx    # /dashboard — User account + booking history
├── login/
│   ├── page.tsx          # /login — Suspense wrapper
│   └── LoginClient.tsx   # Login/signup UI (client component)
└── admin/page.tsx        # /admin — Admin panel (is_admin gate)

components/
├── Navbar.tsx            # Sticky nav with auth widget + lang toggle
└── Footer.tsx            # Simple footer

context/
└── LanguageContext.tsx   # EN/TH language switcher (localStorage-persisted)

lib/
└── supabase.ts           # Supabase client + auth helpers
```

## Key Features
- **Bilingual** — EN/TH toggle via React Context, persisted to localStorage
- **Auth** — Email/password + Google OAuth via Supabase
- **Admin panel** — Protected by `app_metadata.is_admin` JWT claim
- **Course guard** — Checks `course_purchases` table before showing content
- **Booking form** — Multi-step wizard, sends to Google Apps Script + saves to Supabase

## Deployment (Vercel)
1. Push to GitHub
2. Import repo at vercel.com
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — zero config needed

> **Note on fonts:** `next/font/google` is used in production (Vercel auto-downloads fonts at build time). The current layout uses a `<link>` tag fallback for local development compatibility.
