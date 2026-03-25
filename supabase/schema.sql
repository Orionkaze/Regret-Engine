-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) primary key,
  username text unique not null,
  total_regret_score integer default 0,
  decision_count integer default 0,
  created_at timestamp with time zone default now()
);

-- Habit counts per user per category
create table public.habit_counts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  category text not null,
  count integer default 1,
  unique(user_id, category)
);

-- All decisions simulated
create table public.decisions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  decision_text text not null,
  mode text check (mode in ('savage', 'motivational', 'reality')),
  regret_score integer check (regret_score between 0 and 100),
  score_label text not null,
  roast_text text not null,
  outcomes jsonb not null,        -- { day1, week1, month1, year1 }
  mood_data jsonb not null,       -- array of mood objects
  category text not null,
  repeat_count integer default 1,
  is_public boolean default false,
  created_at timestamp with time zone default now()
);

-- Reactions table
create table public.reactions (
  id uuid default gen_random_uuid() primary key,
  decision_id uuid references public.decisions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  type text not null check (type in ('skull', 'fire', 'sob', 'relatable')),
  created_at timestamp with time zone default now(),
  unique (decision_id, user_id)
);

-- Response cache (avoid duplicate Groq calls)
create table public.response_cache (
  id uuid default gen_random_uuid() primary key,
  cache_key text unique not null,
  response jsonb not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.decisions enable row level security;
alter table public.reactions enable row level security;
alter table public.habit_counts enable row level security;

-- Basic Policies
create policy "Public reactions read" on public.reactions for select using (true);
create policy "Public decisions read if public" on public.decisions for select using (is_public = true);
create policy "Users read own decisions" on public.decisions for select using (auth.uid() = user_id);
create policy "Users insert own decisions" on public.decisions for insert with check (auth.uid() = user_id);
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
