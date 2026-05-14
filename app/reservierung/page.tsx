'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ReservationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    message: '',
  });

  async function submitReservation(e: React.FormEvent) {
    e.preventDefault();

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

    if (error) {
      alert('Fehler beim Senden der Reservierung.');
      return;
    }

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
  }

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>Tisch reservieren</h1>

      <form onSubmit={submitReservation}>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Telefon"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="email"
          placeholder="E-Mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          required
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <input
          required
          type="number"
          min="1"
          placeholder="Personen"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
        />

        <textarea
          placeholder="Bemerkung"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button type="submit">Reservierung anfragen</button>
      </form>
    </main>
  );
}