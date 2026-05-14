'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Reservation = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  date: string;
  time: string;
  guests: number;
  message: string | null;
  status: 'open' | 'confirmed' | 'declined';
  created_at: string;
};

type ContactRequest = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  created_at: string;
};

const statusText: Record<string, string> = {
  open: 'Offen',
  confirmed: 'Bestätigt',
  declined: 'Abgelehnt'
};

export default function AdminPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function checkLoginAndLoad() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push('/login');
      return;
    }
    await Promise.all([loadReservations(), loadRequests()]);
    setLoading(false);
  }

  async function loadReservations() {
    const { data } = await supabase.from('reservations').select('*').order('date', { ascending: true }).order('time', { ascending: true });
    if (data) setReservations(data);
  }

  async function loadRequests() {
    const { data } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
    if (data) setRequests(data);
  }

  async function updateStatus(id: string, status: 'open' | 'confirmed' | 'declined') {
    await supabase.from('reservations').update({ status }).eq('id', id);
    await loadReservations();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  useEffect(() => { checkLoginAndLoad(); }, []);

  if (loading) return <main className="main"><div className="card">Lade Admin-Bereich...</div></main>;

  return (
    <main className="main">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin-Bereich</h1>
        <button onClick={logout}>Ausloggen</button>
      </div>

      <h2>Reservierungen</h2>
      {reservations.length === 0 && <div className="card">Keine Reservierungen vorhanden.</div>}
      {reservations.map((r) => (
        <div className="card" key={r.id}>
          <h2>{r.name}</h2>
          <p><strong>{r.date}</strong> um <strong>{r.time}</strong> Uhr · <strong>{r.guests}</strong> Personen</p>
          <p>Telefon: {r.phone || '-'}<br />E-Mail: {r.email || '-'}</p>
          <p>Bemerkung: {r.message || '-'}</p>
          <span className={`status ${r.status}`}>{statusText[r.status]}</span>
          <div className="row">
            <button onClick={() => updateStatus(r.id, 'confirmed')}>Bestätigen</button>
            <button onClick={() => updateStatus(r.id, 'declined')}>Ablehnen</button>
            <button onClick={() => updateStatus(r.id, 'open')}>Wieder offen</button>
          </div>
        </div>
      ))}

      <h2>Allgemeine Anfragen</h2>
      {requests.length === 0 && <div className="card">Keine Anfragen vorhanden.</div>}
      {requests.map((req) => (
        <div className="card" key={req.id}>
          <h2>{req.name}</h2>
          <p>Telefon: {req.phone || '-'}<br />E-Mail: {req.email || '-'}</p>
          <p>{req.message}</p>
        </div>
      ))}
    </main>
  );
}
