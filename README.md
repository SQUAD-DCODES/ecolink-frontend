# EcoLink — Informal Economy OS

> **Squad API Hackathon 2025** · Built by Ikechukwu Dennis

EcoLink is a fintech SaaS platform purpose-built for Nigeria's informal economy. It gives market traders, artisans, gig workers, and smallholder farmers access to digital financial infrastructure — virtual accounts, escrow-protected gigs, rotating savings groups, vocal reputation scoring, and micro-credit — all through a single, responsive web application.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Route Map](#route-map)
- [Design System](#design-system)
- [Squad API Integration](#squad-api-integration)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Hackathon Context](#hackathon-context)

---

## Overview

Over 80 million Nigerians participate in the informal economy — market stalls, daily labour, rotating savings circles (Ajo/Esusu), and community-based credit. Yet they remain largely excluded from formal financial infrastructure because traditional credit scoring, KYC pipelines, and banking products weren't designed for them.

EcoLink solves this with three core pillars:

| Pillar | What it does |
|---|---|
| **Squad Virtual Account** | Every user gets a NUBAN account (via Squad API) to send, receive, and hold money — no BVN required to start |
| **Vocal Reputation** | Community members record voice vouches in Pidgin, Yoruba, Igbo, or Hausa. AI extracts trust signals to build a portable credit identity |
| **Contextual Products** | Escrow-protected gig jobs, digital Ajo/Esusu savings groups, and Squad-backed micro-loans built on top of the trust score |

---

## Core Features

### Wallet & Payments
- Squad Virtual Account (NUBAN) with instant top-up, send, and receive
- QR code payment and shareable payment links — no recipient app needed
- USSD fallback for zero-data environments (`*1234#`)
- Full transaction history with categorised spend view
- Export statement as CSV

### Jobs & Gigs
- AI-matched gig listings scored against the user's skills profile and location
- Escrow protection: payment locked at Squad until the employer marks the job complete
- Employer side: post jobs, manage active gigs, release escrowed funds
- Worker side: browse, apply, track application status, receive payment on completion

### Savings (Ajo / Esusu)
- Create or join digital rotating savings groups (up to 20 members)
- Configurable frequency (daily / weekly / bi-weekly / monthly), payout order (rotation, ballot, need-based vote), and automated late-payment rules
- Contributions auto-deducted via Squad; disbursements programmatic on payout date
- Contribution calendar and position tracker per group

### Vocal Reputation
- Record 15–60 second voice vouches for community members in their local language
- AI processes audio to extract structured trust signals: reliability, honesty, work ethic, community standing
- Trust score (0–100) computed across five weighted factors: payment reliability, vocal vouches, savings consistency, gig completion, identity verification
- Reputation is portable — it travels with the user across jobs, savings, and credit applications

### Credit
- EcoLink Credit Score (0–100) derived from Squad transaction data and vocal reputation
- Pre-approved micro-loan offers from NIRSAL-accredited lending partners
- Transparent 3-step application with live repayment breakdown
- Repayments auto-deducted from Squad wallet on schedule

### Identity & KYC
- Onboarding with phone number only — no BVN gate at entry
- Tiered KYC: NIN, BVN, International Passport, or Driver's Licence + selfie liveness match
- Verified badge unlocks higher wallet limits, escrow eligibility, and credit access

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS v4 | ^4 |
| Language | TypeScript | ^5 |
| Fonts | DM Sans + DM Serif Display | Google Fonts |
| Payments | Squad API | — |
| Linting | ESLint + eslint-config-next | 16.2.6 |

### Key architectural decisions

- **No dark mode** — `color-scheme: light only` enforced in CSS and the `<html>` element to prevent OS-level overrides
- **CSS-first Tailwind v4** — design tokens live in a `@theme {}` block inside `globals.css`; no `tailwind.config.js` needed
- **Route groups** — `(app)` group shares the sidebar + bottom nav shell; `(auth)` group renders clean full-page layouts
- **Sidebar offset via injected `<style>`** — margin offset (64px tablet, 240px desktop) is injected as a `<style>` tag in `(app)/layout.tsx` to avoid Tailwind v4 dynamic class issues
- **Next.js 16 dynamic params** — `params: Promise<{ id: string }>` pattern used throughout (breaking change in Next.js 15+)
- **Static data prototype** — all Squad API calls are mocked with static data; the wiring points are documented below

---

## Project Structure

```
eco-link/
├── app/
│   ├── (app)/                        # Authenticated app shell
│   │   ├── layout.tsx                # Sidebar + BottomNav + CSS margin injection
│   │   ├── page.tsx                  # Dashboard
│   │   ├── wallet/
│   │   │   ├── page.tsx              # Wallet overview + transaction history
│   │   │   ├── send/page.tsx         # Send money (3-step)
│   │   │   └── receive/page.tsx      # Receive / QR code / payment link
│   │   ├── jobs/
│   │   │   ├── page.tsx              # AI-matched gig listings
│   │   │   ├── [id]/page.tsx         # Job detail + apply
│   │   │   ├── post/page.tsx         # Post a job — employer (3-step)
│   │   │   └── mine/page.tsx         # My active + past gigs — employer
│   │   ├── savings/
│   │   │   ├── page.tsx              # Ajo group list + contribution calendar
│   │   │   ├── [groupId]/page.tsx    # Group detail + rotation tracker
│   │   │   └── create/page.tsx       # Create new Ajo group (3-step)
│   │   ├── credit/
│   │   │   ├── page.tsx              # Credit score + loan offers
│   │   │   └── apply/page.tsx        # Micro-loan application (3-step)
│   │   ├── profile/
│   │   │   ├── page.tsx              # Identity card + trust signals + settings
│   │   │   ├── reputation/page.tsx   # Vocal reputation + vouch cards
│   │   │   ├── edit/page.tsx         # Edit profile details, skills, location
│   │   │   └── kyc/page.tsx          # KYC: ID upload + selfie verification
│   │   └── vouch/
│   │       └── record/page.tsx       # Record a vocal vouch
│   ├── (auth)/                       # Unauthenticated pages (no sidebar)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx            # Phone number + 4-digit PIN numpad
│   │   ├── register/page.tsx         # 3-step registration flow
│   │   ├── verify/page.tsx           # 6-digit OTP with auto-advance
│   │   └── onboarding/page.tsx       # Skills picker + PIN setup + account reveal
│   ├── icon.png                      # App icon / favicon (auto-served by Next.js)
│   ├── layout.tsx                    # Root layout (bare minimum — no sidebar)
│   └── globals.css                   # Tailwind v4 design system + utilities
├── components/
│   ├── Sidebar.tsx                   # Fixed left nav (240px on lg, 64px on md)
│   └── BottomNav.tsx                 # Mobile bottom tab bar (hidden on md+)
├── public/
│   └── Eco.png                       # Brand logo — 1102×1090 RGBA PNG
└── tsconfig.json
```

---

## Route Map

### App routes `/(app)`

| Route | Description |
|---|---|
| `/` | Dashboard: balance stats, wallet card, recent transactions, vouch preview, trust score, upcoming events |
| `/wallet` | Wallet: full transaction history, balance card, monthly stats |
| `/wallet/send` | Send money: 3-step flow — recipient → amount (quick presets) → confirm → success |
| `/wallet/receive` | Receive: QR code, NUBAN account details, payment link generator, recent received |
| `/jobs` | Find a gig: AI-matched listings with filter chips and match score bars |
| `/jobs/[id]` | Job detail: full description, escrow breakdown, apply button, trader profile |
| `/jobs/post` | Post a job: 3-step employer flow — basics → pay + escrow toggle → review |
| `/jobs/mine` | My jobs: employer view of active gigs and past history table |
| `/savings` | Savings: Ajo group list with progress rings, contribution calendar, how-it-works |
| `/savings/[groupId]` | Group detail: member contributions, payout rotation order, transaction history, invite |
| `/savings/create` | Create group: 3-step — name + frequency → contribution + payout rules → review |
| `/credit` | Credit: score ring SVG, 5-factor breakdown with trend arrows, loan offer cards |
| `/credit/apply` | Apply for loan: 3-step — purpose → repayment plan with live calculator → confirm |
| `/profile` | Profile: identity card, credit arc, trust signal breakdown, settings list |
| `/profile/reputation` | Reputation: trust score hero, AI signal bars, voice vouch cards with waveforms |
| `/profile/edit` | Edit profile: name, bio, business type, skills, location |
| `/profile/kyc` | KYC: 3-step — why verify → ID document upload → selfie capture |
| `/vouch/record` | Record vouch: language selector, animated recorder, waveform, submit flow |

### Auth routes `/(auth)`

| Route | Description |
|---|---|
| `/login` | Phone number entry → 4-digit PIN numpad with visual dot indicators |
| `/register` | 3-step: personal info → business type picker → location → OTP |
| `/verify` | 6-digit OTP with auto-focus advance between inputs and resend timer |
| `/onboarding` | Skills tag cloud → PIN set + confirm → Squad account reveal screen |

---

## Design System

All design tokens are defined in `app/globals.css` inside the `@theme {}` block.

### Colour palette

| Token | Hex | Usage |
|---|---|---|
| `--color-green-700` | `#0F6E56` | Primary brand, CTAs, active nav |
| `--color-green-500` | `#1D9E75` | Hover, gradient midpoints, progress bars |
| `--color-green-50` | `#E8F5F0` | Green tint backgrounds, badge fills |
| `--color-amber-500` | `#E5A10A` | Warnings, "my turn" indicators |
| `--color-amber-700` | `#9A6A05` | Amber text, overdue labels |
| `--color-coral-500` | `#E05A34` | Errors, destructive actions |
| `--color-sand-50` | `#FAFAF7` | Page background |
| `--color-sand-100` | `#F4F3EE` | Card sections, secondary fills |
| `--color-sand-200` | `#E8E6DF` | Borders, dividers |
| `--color-sand-500` | `#9E9B92` | Muted text, disabled states |
| `--color-sand-700` | `#5C5A54` | Subtle text, secondary labels |
| `--color-sand-900` | `#1C1B18` | Primary text |

### Global utility classes

```css
.card           /* White card — sand border + 14px radius */
.card-hover     /* .card with hover shadow + border transition */
.btn-primary    /* Filled #0F6E56 pill button with hover + active states */
.btn-ghost      /* Outlined sand pill button */
.badge-green    /* Green pill label */
.badge-amber    /* Amber pill label */
.badge-coral    /* Coral pill label */
.badge-sand     /* Neutral sand pill label */
.text-muted     /* sand-500 (#9E9B92) */
.text-subtle    /* sand-700 (#5C5A54) */
.bg-subtle      /* sand-100 (#F4F3EE) */
.pb-nav         /* padding-bottom for mobile nav clearance */
```

### Typography

- **Body**: DM Sans — weights 300, 400, 500, 600
- **Display**: DM Serif Display — used for hero headings
- Heading letter-spacing: `-0.02em` to `-0.03em`
- Uppercase label letter-spacing: `tracking-widest` + `text-xs font-medium`

### Responsive layout

| Breakpoint | Sidebar | Content offset |
|---|---|---|
| `< 768px` | Hidden | 0 — bottom nav visible |
| `768px–1023px` | 64px icon-only | `margin-left: 64px` |
| `≥ 1024px` | 240px with labels | `margin-left: 240px` |

Header height is locked at `h-16` (64px) across all pages to align precisely with the sidebar brand area.

---

## Squad API Integration

EcoLink is designed to deeply integrate with the [Squad API](https://squadco.com) for all financial operations. The prototype uses static mock data; below is where each Squad endpoint maps to in the codebase.

| Feature | Squad Endpoint | Codebase location |
|---|---|---|
| Create virtual account | `POST /virtual-account` | `app/api/wallet/create/route.ts` *(to build)* |
| Send money | `POST /transaction/initiate` | `app/(app)/wallet/send/page.tsx` → API handler |
| Payment link | `POST /payment-link/create` | `app/(app)/wallet/receive/page.tsx` |
| Escrow — lock | `POST /escrow/create` | `app/(app)/jobs/post/page.tsx` step 3 |
| Escrow — release | `POST /escrow/release` | `app/(app)/jobs/mine/page.tsx` release button |
| Savings disbursement | Scheduled `POST /transaction/initiate` | `app/(app)/savings/[groupId]/page.tsx` |
| Webhook events | `payment.completed`, `escrow.released` | `app/api/webhooks/squad/route.ts` *(to build)* |

### Wiring Squad in production

1. Add credentials to `.env.local` (see [Environment Variables](#environment-variables))
2. Create `lib/squad.ts` — a typed fetch wrapper with `Authorization: Bearer ${SQUAD_SECRET_KEY}`
3. Move all financial mutations to Next.js Route Handlers under `app/api/`
4. Register your webhook URL in the Squad dashboard and implement `app/api/webhooks/squad/route.ts`
5. Use server actions or `useSWR` to wire live balances and transaction history into each page

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/eco-link.git
cd eco-link

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app opens at the Dashboard (`/`). To walk the auth flow, navigate to `/login` manually.

**Recommended demo path:**
```
/login → /register → /verify → /onboarding → / → /wallet → /jobs → /savings → /credit → /profile/reputation
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Squad API — get keys at https://dashboard.squadco.com
SQUAD_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
SQUAD_BASE_URL=https://sandbox.squadco.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> The prototype runs fully without any environment variables — all data is static mock data. Env vars are only needed when implementing real Squad API calls.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Hackathon Context

EcoLink was built for the **Squad API Hackathon 2025**. The central thesis: Squad's virtual accounts, payment links, and escrow primitives are exactly the right financial building blocks for informal economy products — the gap is an application layer that understands how these users actually earn, save, and build trust.

### Why vocal reputation?

Traditional credit bureaus have no data on informal workers. But their community does. A market trader's reputation — whether she pays back debts, shows up on time, delivers what she promised — exists as oral knowledge. EcoLink externalises that knowledge as structured data using voice + AI, creating a credit identity that is portable, community-verified, and fraud-resistant.

### Why digitise Ajo/Esusu?

Rotating savings circles already manage billions of naira annually in Nigeria. The problem is trust failure when the organiser disappears with the pot. Squad's escrow ensures the pot sits in a neutral auditable account, and disbursements are programmatic — eliminating the single point of failure.

### Judging alignment

| Criterion | EcoLink approach |
|---|---|
| **Squad API usage depth** | Virtual accounts, payment links, escrow (jobs + savings), webhooks for automated disbursements |
| **Real-world impact** | 80M+ addressable users in Nigeria's informal sector |
| **Innovation** | Vocal reputation as a credit signal — language-native, AI-structured, fraud-resistant |
| **Technical execution** | 22 routes, zero TypeScript errors, fully responsive SaaS UI (desktop / tablet / mobile) |
| **Business model** | Transaction fee share (Squad split), escrow float, loan origination partner commissions |

---

*EcoLink · Next.js 16 · React 19 · Tailwind CSS v4 · Squad API*
