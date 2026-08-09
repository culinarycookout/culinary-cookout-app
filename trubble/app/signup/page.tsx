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
  const [birthDate, setBirthDate] = useState('');
  const [confirmBirthDate, setConfirmBirthDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    setter(value);
  };

  const calculateAge = (dob: string): number | null => {
    if (dob.length !== 8) return null;
    const month = parseInt(dob.slice(0, 2));
    const day = parseInt(dob.slice(3, 5));
    const year = 2000 + parseInt(dob.slice(6, 8));
    const today = new Date();
    const birth = new Date(year, month - 1, day);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setStep(2);
  };

  const handleBirthDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (birthDate.length !== 8 || !birthDate.includes('/')) {
      setError('Please enter a valid birth date (MM/DD/YY)');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (birthDate !== confirmBirthDate) {
      setError('Birth dates do not match.');
      setLoading(false);
      return;
    }

    const age = calculateAge(birthDate);
    if (age === null || age < 21) {
      setError('Come back when you are 21.');
      setLoading(false);
      return;
    }

    const password = birthDate.replace(/\//g, '');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw new Error(signUpError.message);

      if (data.user) {
        // STORE THE BIRTHDATE IN THE DATABASE (WITH CONFLICT HANDLING)
        const { error: dbError } = await supabase
          .from('profiles')
          .upsert(
            { 
              id: data.user.id, 
              birth_date: birthDate 
            },
            { onConflict: 'id' } // <--- THIS LINE IS NOW INCLUDED
          );

        if (dbError) throw new Error('Failed to save profile data');

        await trubbleLogin(email, password);
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

  // Step 1 View (Email)
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ SNEAK IN... ☠️</h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">Enter your email to begin...</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleContinue} className="space-y-4">
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
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500">
            <p>Already have access?</p>
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

  // Step 2 View (Enter Birth Date)
  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ SNEAK IN... ☠️</h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">Enter your birth date</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleBirthDateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Birth Date (MM/DD/YY)</label>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={8}
                value={birthDate}
                onChange={(e) => handleBirthDateChange(e, setBirthDate)}
                placeholder="MM/DD/YY"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setStep(1); setError(''); setBirthDate(''); }} className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all">Back</button>
              <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all">Continue</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 3 View (Confirm Birth Date)
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2 tracking-wider">☠️ WELCOME ☠️</h1>
        <p className="text-zinc-400 text-center mb-6 text-sm">Confirm your birth date</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Re-enter Birth Date (MM/DD/YY)</label>
            <input
              type="text"
              inputMode="numeric"
              required
              maxLength={8}
              value={confirmBirthDate}
              onChange={(e) => handleBirthDateChange(e, setConfirmBirthDate)}
              placeholder="MM/DD/YY"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none text-center text-2xl tracking-widest"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => { setStep(2); setError(''); setConfirmBirthDate(''); }} className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all">Back</button>
            <button type="submit" disabled={loading || trubbleLoading} className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${loading || trubbleLoading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'}`}>
              {loading || trubbleLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}