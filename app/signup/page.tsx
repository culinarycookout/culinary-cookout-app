'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../context/AuthContext';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') === 'fun' ? '/fun' : '/login';

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

        await signup(email, password);
        router.push(redirectTo);
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-0 px-4 pb-32 md:justify-center md:pt-0">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-8 shadow-2xl md:p-8">
        <div className="flex flex-col items-center pt-0 md:pt-0">
          <img src="/logo.png" alt="Culinary Cookout" className="h-60 w-auto object-contain md:h-80" />
          <h1 className="text-2xl font-bold text-red-600 mt-1 md:mt-2">
            WE OUTSIDE COOKIN'
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Create your account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mt-4 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 md:mt-6">
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
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
              loading
                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
            }`}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Been here before?</p>
          <p className="mt-1">
            <Link href="/login" className="text-red-400 hover:text-red-300 font-bold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading sign up...</div>}>
      <SignupForm />
    </Suspense>
  );
}