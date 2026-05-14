# Tischreservierung App

Fertige einfache Web-App/PWA für Tischreservierungen und Anfragen.

## Enthalten
- Startseite
- Reservierungsformular
- Anfrageformular
- Danke-Seite
- Admin-Login über Supabase
- Admin-Bereich für Reservierungen
- Bestätigen/Ablehnen von Reservierungen
- Impressum und Datenschutz als Platzhalter
- PWA Manifest

## Wichtig
Du musst nur noch Supabase einrichten und die Zugangsdaten in `.env.local` eintragen.

## Installation lokal
```bash
npm install
npm run dev
```

Dann im Browser öffnen:
```txt
http://localhost:3000
```

## Supabase einrichten
1. Auf https://supabase.com ein kostenloses Projekt erstellen.
2. Im Projekt links auf SQL Editor gehen.
3. Den Inhalt aus `supabase-schema.sql` ausführen.
4. Unter Project Settings > API folgende Werte kopieren:
   - Project URL
   - anon public key
5. Datei `.env.local.example` in `.env.local` umbenennen.
6. Werte eintragen.
7. Unter Authentication > Users deinen Admin-Benutzer anlegen.

## Online stellen
Einfach bei Vercel importieren:
1. Projekt zu GitHub hochladen.
2. Bei https://vercel.com importieren.
3. Environment Variables eintragen:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy klicken.

## Rechtliches
Impressum und Datenschutz sind nur Platzhalter. Für echten Betrieb musst du sie korrekt ausfüllen.
