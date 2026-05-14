import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="main">
      <section className="hero">
        <h1>Tisch reservieren</h1>
        <p>Reserviere einfach online einen Tisch oder sende eine allgemeine Anfrage. Die Reservierung ist erst nach Bestätigung verbindlich.</p>
        <div className="actions">
          <Link className="button" href="/reservierung">Tisch reservieren</Link>
          <Link className="button secondary" href="/anfrage">Anfrage senden</Link>
        </div>
      </section>
    </main>
  );
}
