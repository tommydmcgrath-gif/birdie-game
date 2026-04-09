# Birdie Game - Country Club of Fairfield

A mobile-first web app for tracking a season-long golf birdie competition. Players compete to be the first to birdie all 18 holes on the course.

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS (via Vite)
- **Backend:** Supabase (PostgreSQL + real-time)
- **Hosting:** Vercel

## Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor** in your Supabase dashboard
3. Run the schema file: copy and paste the contents of `supabase/schema.sql` and execute
4. Run the seed file: copy and paste the contents of `supabase/seed.sql` and execute
5. Go to **Settings > API** and copy your **Project URL** and **anon public** key

### 2. Configure Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Install and Run Locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Deploy to Vercel

1. Push this repo to GitHub
2. Import the repository in [vercel.com](https://vercel.com)
3. Add the environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings
4. Deploy. Vercel will auto-detect the Vite framework

The `vercel.json` file is already configured to handle client-side routing.

## Database Schema

### `players`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Auto-generated |
| name | text | Player name |
| created_at | timestamptz | Auto-set |

### `holes`
| Column | Type | Description |
|--------|------|-------------|
| id | serial (PK) | Auto-generated |
| number | integer (unique) | Hole 1-18 |
| yards | integer | Distance |
| par | integer | Par for hole |
| stroke_index | integer | Difficulty ranking |

### `player_holes`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Auto-generated |
| player_id | uuid (FK) | References players |
| hole_number | integer | Hole 1-18 |
| completed_at | date | Date birdie was made |
| created_at | timestamptz | Auto-set |
| | unique | (player_id, hole_number) |

## Features

- **Leaderboard** - Live rankings sorted by completed holes with progress strips
- **Punch Card** - Tap to mark birdies with date tracking and celebration animations
- **Course Info** - Full scorecard with yardage, par, and stroke index
- **Rules** - Clear display of competition rules
- **Join** - Simple name entry to create a new player
