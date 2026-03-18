create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'user'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.investment_opportunities (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  risk text not null check (risk in ('Low', 'Medium', 'High')),
  liquidity text not null,
  expected_return text,
  fit text,
  score integer not null default 50 check (score >= 0 and score <= 100),
  description text,
  partner_name text,
  partner_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.watchlists (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id bigint not null references public.investment_opportunities(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, opportunity_id)
);

create table if not exists public.articles (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.partner_clicks (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  partner_name text not null,
  opportunity_id bigint references public.investment_opportunities(id) on delete set null,
  clicked_at timestamptz not null default now()
);
