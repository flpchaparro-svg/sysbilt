-- Learn membership (paste into Supabase SQL editor if you are not using the CLI).
-- Free tier. Run once per project.

create table if not exists public.learn_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  hubspot_synced_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.learn_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  source text not null check (source in ('open', 'stripe', 'grant', 'company')),
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.learn_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  course_id text not null,
  completed_at timestamptz,
  last_seen_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.learn_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  activity_id text not null,
  lesson_id text not null,
  score numeric,
  passed boolean not null default false,
  answers jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.learn_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists learn_entitlements_user_idx on public.learn_entitlements (user_id);
create index if not exists learn_progress_course_idx on public.learn_progress (user_id, course_id);
create index if not exists learn_attempts_lesson_idx on public.learn_attempts (user_id, lesson_id);
create index if not exists learn_comments_lesson_idx on public.learn_comments (lesson_id, created_at);

alter table public.learn_profiles enable row level security;
alter table public.learn_entitlements enable row level security;
alter table public.learn_progress enable row level security;
alter table public.learn_attempts enable row level security;
alter table public.learn_comments enable row level security;

drop policy if exists learn_profiles_own on public.learn_profiles;
create policy learn_profiles_own on public.learn_profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists learn_entitlements_own on public.learn_entitlements;
create policy learn_entitlements_own on public.learn_entitlements
  for select using (auth.uid() = user_id);

drop policy if exists learn_progress_own on public.learn_progress;
create policy learn_progress_own on public.learn_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists learn_attempts_own on public.learn_attempts;
create policy learn_attempts_own on public.learn_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists learn_comments_read on public.learn_comments;
create policy learn_comments_read on public.learn_comments
  for select using (true);

drop policy if exists learn_comments_write_own on public.learn_comments;
create policy learn_comments_write_own on public.learn_comments
  for insert with check (auth.uid() = user_id);

create or replace function public.learn_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.learn_profiles (id, email, display_name)
  values (
    new.id,
    lower(coalesce(new.email, '')),
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      ''
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists learn_on_auth_user_created on auth.users;
create trigger learn_on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.learn_handle_new_user();
