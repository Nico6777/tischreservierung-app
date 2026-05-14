create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  date date not null,
  time text not null,
  guests integer not null check (guests > 0),
  message text,
  status text not null default 'open' check (status in ('open', 'confirmed', 'declined')),
  created_at timestamp with time zone default now()
);

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  created_at timestamp with time zone default now()
);

alter table reservations enable row level security;
alter table contact_requests enable row level security;

-- Gäste dürfen Reservierungen und Anfragen erstellen.
create policy "Anyone can create reservations"
on reservations for insert
to anon, authenticated
with check (true);

create policy "Anyone can create contact requests"
on contact_requests for insert
to anon, authenticated
with check (true);

-- Nur eingeloggte Admins dürfen lesen und bearbeiten.
create policy "Authenticated users can read reservations"
on reservations for select
to authenticated
using (true);

create policy "Authenticated users can update reservations"
on reservations for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can read contact requests"
on contact_requests for select
to authenticated
using (true);
