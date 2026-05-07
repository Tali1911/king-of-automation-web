-- Add unsubscribe token to newsletter subscribers
alter table public.newsletter_subscribers
  add column if not exists unsubscribe_token text unique;

create index if not exists newsletter_subscribers_unsubscribe_token_idx
  on public.newsletter_subscribers (unsubscribe_token);
