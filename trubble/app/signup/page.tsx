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
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (phone.length !== 10) {
      setError('Please enter exactly 10 digits');
      setLoading(false);
      return;
    }

    try {
      // ✅ Sign up and log in immediately using the 10-digit phone PIN
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: phone,
      });

      if (signUpError) throw new Error(signUpError.message);

      if (data.user) {
        await trubbleLogin(email, phone);
        router.push('/menu');
      } else {
        setError('Signup successful, but please check your email to verify.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
    setPhone('');
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-0 px-4 pb-32 md:justify-center md:pt-0">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-8 shadow-2xl md:p-8">
        <div className="flex flex-col items-center pt-0 md:pt-0">
          <img src="/logo.png" alt="Culinary Cookout" className="h-60 w-auto object-contain md:h-80" />
          <h1 className="text-2xl font-bold text-red-600 mt-1 md:mt-2">
            {step === 1 ? '☠️ SNEAK IN... ☠️' : 'SET PHONE PIN'}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {step === 1 ? 'Enter your email to begin...' : 'Set your 10-digit phone PIN'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mt-4 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleContinue} className="space-y-4 mt-4 md:mt-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">Continue</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 md:mt-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">10-Digit Phone PIN</label>
              <input type="text" inputMode="numeric" pattern="[0-9]*" required maxLength={10} value={phone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="0000000000" className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={handleBack} className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all">Back</button>
              <button type="submit" disabled={loading} className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${loading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'}`}>
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>Been here before?</p>
          <p className="mt-1">
            <Link href="/login" className="text-red-400 hover:text-red-300 font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}