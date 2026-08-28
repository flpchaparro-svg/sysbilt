-- Run in the Supabase SQL editor after 001_learn.sql.

alter table public.learn_profiles
  add column if not exists interest text,
  add column if not exists goal text,
  add column if not exists onboarded_at timestamptz;
