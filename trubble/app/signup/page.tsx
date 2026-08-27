'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTrubbleAuth } from '../../context/TrubbleAuthContext';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TrubbleSignupPage() {
  const router = useRouter();
  const { trubbleLogin, trubbleLoading } = useTrubbleAuth();
  
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setMobile(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://trubble.vercel.app/login'
        }
      });

      if (signUpError) throw new Error(signUpError.message);

      if (data.user) {
        const { error: dbError } = await supabase
          .from('profiles')
          .upsert(
            { 
              id: data.user.id, 
              mobile: mobile 
            },
            { onConflict: 'id' }
          );

        if (dbError) throw new Error('Failed to save mobile number');

        await trubbleLogin(email, password);
        router.push('/trubble/menu');
      } else {
        setError('Signup successful, please check your email to verify.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ SNEAK IN... ☠️</h1>
        <p className="text-zinc-400 text-center mb-6 text-sm">Create your Trubble account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Mobile</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              maxLength={10}
              value={mobile}
              onChange={handleMobileChange}
              placeholder="0000000000"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password (6 characters)</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || trubbleLoading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
              loading || trubbleLoading
                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
            }`}
          >
            {loading || trubbleLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Already have access?</p>
          <p className="mt-1">
            <Link href="/trubble/login" className="text-red-400 hover:text-red-300 font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}