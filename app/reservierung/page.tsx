'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ReservierungPage() {
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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

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
      setErrorMessage('Reservierung konnte nicht gesendet werden. Bitte später erneut versuchen.');
      setLoading(false);
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

    setLoading(false);
    router.push('/danke');
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Tisch reservieren</h1>

        {errorMessage && <div className="error">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="form">
          <label>
            Name *
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <div className="grid">
            <label>
              Telefon
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>

            <label>
              E-Mail
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
          </div>

          <div className="grid">
            <label>
              Datum *
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>

            <label>
              Uhrzeit *
              <input
                required
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </label>
          </div>

          <label>
            Personen *
            <input
              required
              type="number"
              min="1"
              value={form.guests}
              onChange={(e) =>
                setForm({ ...form, guests: Number(e.target.value) })
              }
            />
          </label>

          <label>
            Bemerkung
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Wird gesendet...' : 'Reservierung anfragen'}
          </button>
        </form>
      </section>
    </main>
  );
}