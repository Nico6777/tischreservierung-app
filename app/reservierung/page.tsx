'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const { error } = await supabase.from('reservations').insert({
  name: form.name,
  phone: form.phone,
  email: form.email,
  date: form.date,
  time: form.time,
  guests: form.guests,
  message: form.message,
  status: 'open',
});

await fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'reservation',
    ...form,
  }),
});

router.push('/danke');

export default function ReservationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', guests: 2, message: '' });

  async function submitReservation(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.phone && !form.email) {
      setError('Bitte Telefonnummer oder E-Mail angeben.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('reservations').insert({ ...form, status: 'open' });
    setLoading(false);

    if (error) {
      setError('Reservierung konnte nicht gesendet werden. Bitte später erneut versuchen.');
      return;
    }
    router.push('/danke');
  }

  return (
    <main className="main">
      <div className="card">
        <h1>Tisch reservieren</h1>
        <p>Die Reservierung wird als Anfrage gesendet und danach bestätigt.</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submitReservation} className="grid">
          <div className="full"><label>Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label>Telefon</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><label>E-Mail</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label>Datum *</label><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
          <div><label>Uhrzeit *</label><input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
          <div><label>Personen *</label><input required type="number" min="1" max="30" value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} /></div>
          <div className="full"><label>Bemerkung</label><textarea placeholder="z. B. Hund dabei, vegan, Kinderstuhl" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
          <div className="full"><button disabled={loading} type="submit">{loading ? 'Wird gesendet...' : 'Reservierung anfragen'}</button></div>
        </form>
      </div>
    </main>
  );
}
