-- Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  confirmed boolean not null default false,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "anyone can subscribe" on public.newsletter_subscribers;
create policy "anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admins can view subscribers" on public.newsletter_subscribers;
create policy "admins can view subscribers"
  on public.newsletter_subscribers
  for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins can update subscribers" on public.newsletter_subscribers;
create policy "admins can update subscribers"
  on public.newsletter_subscribers
  for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins can delete subscribers" on public.newsletter_subscribers;
create policy "admins can delete subscribers"
  on public.newsletter_subscribers
  for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);
