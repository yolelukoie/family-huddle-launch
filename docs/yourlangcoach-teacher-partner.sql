-- YourLangCoach — Teacher Partner Program
-- Run this once in the YourLangCoach Supabase project (SQL Editor).
-- Project ref: vlspnmiqacqolmgtknpf

-- 1. Teachers -----------------------------------------------------------------
create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null unique,
  languages text not null,
  teaching_format text,
  student_count text,
  referral_code text not null unique,
  partner_code text unique default null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create unique index if not exists teachers_partner_code_idx on public.teachers (partner_code);

grant all on public.teachers to service_role;
alter table public.teachers enable row level security;
-- No anon/authenticated policies on purpose: all access goes through the
-- security-definer functions below, so the teacher list is never public.

-- 2. Student attribution (permanent, survives the 30-day Premium period) -------
create table if not exists public.teacher_student_referrals (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  referral_code text not null,
  source text,                      -- 'web', 'app_code', 'deep_link', ...
  attributed_at timestamptz not null default now(),
  premium_granted_at timestamptz,
  premium_expires_at timestamptz,
  unique (user_id)                  -- a student belongs to one teacher, forever
);

create index if not exists teacher_student_referrals_teacher_idx
  on public.teacher_student_referrals (teacher_id);

grant select on public.teacher_student_referrals to authenticated;
grant all on public.teacher_student_referrals to service_role;
alter table public.teacher_student_referrals enable row level security;

create policy "Students can read their own attribution"
on public.teacher_student_referrals
for select
to authenticated
using (user_id = auth.uid());

-- 3. Referral code generator ---------------------------------------------------
create or replace function public.ylc_generate_referral_code(_name text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  base text;
  candidate text;
  alphabet text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  i int;
begin
  base := upper(regexp_replace(coalesce(_name, ''), '[^a-zA-Z]', '', 'g'));
  base := left(nullif(base, ''), 6);
  if base is null then base := 'TEACH'; end if;

  for attempt in 1..50 loop
    candidate := base;
    for i in 1..3 loop
      candidate := candidate || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    if not exists (select 1 from public.teachers where referral_code = candidate) then
      return candidate;
    end if;
  end loop;

  return base || to_char(floor(random() * 100000)::int, 'FM00000');
end;
$$;

-- 4. Signup RPC (called by the website with the anon key) -----------------------
create or replace function public.create_teacher_partner(
  _first_name text,
  _last_name text,
  _email text,
  _languages text,
  _teaching_format text default null,
  _student_count text default null
)
returns table (referral_code text, already_registered boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  existing public.teachers;
  code text;
begin
  if coalesce(trim(_first_name), '') = '' or coalesce(trim(_email), '') = ''
     or coalesce(trim(_languages), '') = '' then
    raise exception 'Missing required fields';
  end if;

  select * into existing from public.teachers where lower(email) = lower(trim(_email));
  if found then
    return query select existing.referral_code, true;
    return;
  end if;

  code := public.ylc_generate_referral_code(trim(_first_name));

  insert into public.teachers (first_name, last_name, email, languages, teaching_format, student_count, referral_code)
  values (trim(_first_name), nullif(trim(coalesce(_last_name, '')), ''), lower(trim(_email)),
          trim(_languages), nullif(trim(coalesce(_teaching_format, '')), ''),
          nullif(trim(coalesce(_student_count, '')), ''), code);

  return query select code, false;
end;
$$;

revoke all on function public.create_teacher_partner(text, text, text, text, text, text) from public;
grant execute on function public.create_teacher_partner(text, text, text, text, text, text) to anon, authenticated;

-- 5. Attribution RPC (called by the native app / web app after the student signs in)
create or replace function public.redeem_teacher_code(_code text, _source text default 'app_code')
returns table (teacher_first_name text, already_attributed boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.teachers;
  existing public.teacher_student_referrals;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select * into existing from public.teacher_student_referrals where user_id = auth.uid();
  if found then
    select * into t from public.teachers where id = existing.teacher_id;
    return query select t.first_name, true;
    return;
  end if;

  select * into t from public.teachers where upper(referral_code) = upper(trim(_code)) and status = 'active';
  if not found then
    raise exception 'Invalid teacher code';
  end if;

  insert into public.teacher_student_referrals (teacher_id, user_id, referral_code, source, premium_granted_at, premium_expires_at)
  values (t.id, auth.uid(), t.referral_code, coalesce(_source, 'app_code'), now(), now() + interval '30 days');

  return query select t.first_name, false;
end;
$$;

revoke all on function public.redeem_teacher_code(text, text) from public;
grant execute on function public.redeem_teacher_code(text, text) to authenticated;
