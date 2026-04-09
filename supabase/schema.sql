-- Birdie Game Schema for Country Club of Fairfield
-- Run this in your Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Players table
create table if not exists players (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamp with time zone default now()
);

-- Holes table (static course data)
create table if not exists holes (
  id serial primary key,
  number integer not null unique,
  yards integer not null,
  par integer not null,
  stroke_index integer not null
);

-- Player hole completions (the punch card)
create table if not exists player_holes (
  id uuid primary key default uuid_generate_v4(),
  player_id uuid not null references players(id) on delete cascade,
  hole_number integer not null,
  completed_at date not null,
  created_at timestamp with time zone default now(),
  unique(player_id, hole_number)
);

-- Index for fast leaderboard queries
create index if not exists idx_player_holes_player_id on player_holes(player_id);
create index if not exists idx_player_holes_created_at on player_holes(created_at desc);

-- Row Level Security (allow all for public app)
alter table players enable row level security;
alter table holes enable row level security;
alter table player_holes enable row level security;

create policy "Allow all access to players" on players
  for all using (true) with check (true);

create policy "Allow all access to holes" on holes
  for all using (true) with check (true);

create policy "Allow all access to player_holes" on player_holes
  for all using (true) with check (true);
