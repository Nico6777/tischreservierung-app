import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tischreservierung',
  description: 'Tischreservierungen und Anfragen einfach online senden',
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="header">
          <a className="brand" href="/">Tischreservierung</a>
          <nav>
            <a href="/reservierung">Reservieren</a>
            <a href="/anfrage">Anfrage</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </footer>
      </body>
    </html>
  );
}
