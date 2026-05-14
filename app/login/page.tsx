'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Login fehlgeschlagen. E-Mail oder Passwort prüfen.');
      return;
    }
    router.push('/admin');
  }

  return (
    <main className="main">
      <div className="card">
        <h1>Admin Login</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={login} className="grid">
          <div className="full"><label>E-Mail</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="full"><label>Passwort</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <div className="full"><button disabled={loading}>{loading ? 'Einloggen...' : 'Einloggen'}</button></div>
        </form>
      </div>
    </main>
  );
}
