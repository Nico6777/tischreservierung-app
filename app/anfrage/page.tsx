'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ContactRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.phone && !form.email) {
      setError('Bitte Telefonnummer oder E-Mail angeben.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('contact_requests').insert(form);
    setLoading(false);
    if (error) {
      setError('Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen.');
      return;
    }
    router.push('/danke');
  }

  return (
    <main className="main">
      <div className="card">
        <h1>Anfrage senden</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submitRequest} className="grid">
          <div className="full"><label>Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label>Telefon</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><label>E-Mail</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="full"><label>Nachricht *</label><textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
          <div className="full"><button disabled={loading} type="submit">{loading ? 'Wird gesendet...' : 'Anfrage senden'}</button></div>
        </form>
      </div>
    </main>
  );
}
