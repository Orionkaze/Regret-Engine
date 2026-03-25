# Regret Engine - Development To-Do List

This document outlines the step-by-step implementation plan for the **Regret Engine** application, based on the PRD, Design Document, and Tech Rules.

## Phase 1: MVP Construction 🚀

### 1. Project Initialization & Tooling
- [ ] Initialize monorepo structure (`pnpm-workspace.yaml`).
- [ ] Create `client/` app using React + TypeScript + Vite (`pnpm create vite client --template react-ts`).
- [ ] Create `server/` app using Node.js + Express + TypeScript (`mkdir server && pnpm init`).
- [ ] Setup `pnpm` workspace to manage dependencies effectively.
- [ ] Setup Git repository and `.gitignore`.
- [ ] Define environment files (`.env` and `.env.example`) for both client and server.

### 2. Branding & Design System
- [ ] Install Tailwind CSS, PostCSS, and Autoprefixer within the `client/`.
- [ ] Initialize `tailwind.config.js` with the exact color palette, box-shadows (glows), typography scale, and custom animations from the Design Doc.
- [ ] Configure `index.css` for base resets and global styling (font-family: Inter).
- [ ] Implement spacing rules, grid configurations, and CSS utility helpers (e.g., `clsx` + `tailwind-merge`).

### 3. Database & Authentication Setup (Supabase)
- [ ] Initialize Supabase project (from Supabase Dashboard).
- [ ] Run `supabase/schema.sql` to generate database tables (`profiles`, `habit_counts`, `decisions`, `response_cache`, `leaderboard_entries`).
- [ ] Verify Row Level Security (RLS) policies according to PRD.
- [ ] Setup Supabase Client within `client/src/lib/supabase.ts`.
- [ ] Configure Authentication mechanisms (Email auth + Google OAuth).

### 4. Server & Core API Development (Express)
- [ ] Setup Express with necessary middleware (`cors`, `helmet`, `express-rate-limit`).
- [ ] Implement `services/groq.ts`: Integrate Groq API (`llama-3.3-70b-versatile`) with the defined system/user prompts for (`savage`, `motivational`, `reality`).
- [ ] Implement fallback AI responses utilizing `server/data/fallbacks.json` logic for resilience.
- [ ] Create API Route: `POST /api/simulate`
  - Body validation.
  - Supabase `response_cache` check (24h validity).
  - Habit/escalation memory fetch/upsert logic.
  - Save results to `decisions` table.
- [ ] Create API Route: `GET /api/user/stats` (Fetch user profile + badges).
- [ ] Create API Route: `GET /api/health` configuration.

### 5. Frontend Foundation (React + Vite)
- [ ] Setup routing mechanism with `react-router-dom` (`Home.tsx`, `Result.tsx`, `Leaderboard.tsx`, `Profile.tsx`).
- [ ] Setup global state management with Zustand (`useAppStore.ts`).
- [ ] Implement API service wrapper (`client/src/lib/api.ts`) pointing to `/api`.

### 6. Core UI Component Build
- [ ] **Header System**: Responsive header showing logo ("☠️ Regret Engine") and dynamic auth state.
- [ ] **Decision Input**: `<DecisionInput />` with active typing areas, fallback pill suggestions.
- [ ] **Personality Toggle**: `<PersonalityToggle />` with animated active state transitions.
- [ ] **Sequential Feedback UI**:
  - `<LoadingState />` (cyclic quotes spinner).
  - `<OutcomeCard />` (sequential appearance for Day 1 → Year 1 timeline).
  - `<MoodGraph />` using Recharts for visual consequences.
  - `<RegretScore />` with SVG drawing ring and numeric roll-up animation.
  - `<RoastCard />` showcasing the `aiRoast` returned from Groq.

### 7. Page Assembly & Finalization (Phase 1)
- [ ] **Home Page**: Integrate Header, Hero UI, Decision Input, and Preview.
- [ ] **Result Page**: Orchestrate cascading animations (`OutcomeCard` stagger 200ms delay, `MoodGraph` visualization execution).
- [ ] **Profile Page**: Display accumulated regret metrics, individual run history, and conditional Habit Badges.
- [ ] Full responsiveness pass: 100% adherence to touch guidelines and dynamic layouts based on `Tech Rules`.

---

## Phase 2: Engagement & Virality 💀

### 1. Leaderboard Integration
- [ ] **API Updates**:
  - Create `GET /api/leaderboard` (Tabs: All Time, This Week, Most Relatable).
  - Create `POST /api/leaderboard/submit` (Move private `Decision` result to public sphere, with abuse limits).
  - Create `POST /api/leaderboard/:id/react` (Increment `skull`, `fire`, `cry`, `relate`).
- [ ] **UI Work**:
  - `<LeaderboardFeed />` using an infinite scroll list architecture.
  - Skeleton screens `<SkeletonCard />` for leaderboard data loading.
  - `<LeaderboardCard />` visual reaction elements with spring bounce feedback loops.

### 2. The Meme Engine (Sharability)
- [ ] Integrate `html-to-image` dependency.
- [ ] Construct `<MemeCard />` off-screen, 600px fixed width canvas.
- [ ] Expose "Share" button linking generation logic down to client download feature.

### 3. Future Enhancements (Post MVP)
- [ ] Integrate Supabase Realtime logic to broadcast active decision evaluations live on the Leaderboard.
