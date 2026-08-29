-- Phone and country on the Learn profile.

alter table public.learn_profiles
  add column if not exists phone text,
  add column if not exists country text;
