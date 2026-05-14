import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="main">
      <div className="card">
        <h1>Danke!</h1>
        <p>Deine Anfrage wurde gesendet. Wir melden uns zur Bestätigung.</p>
        <Link className="button" href="/">Zur Startseite</Link>
      </div>
    </main>
  );
}
