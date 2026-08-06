'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  
  // Step 1 State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  
  // Step 2 State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setError('');
    setStep(2); // Move to password screen
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signup(email, password);
      router.push('/login'); // Send them to login after signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-0 px-4 pb-32 md:justify-center md:pt-0">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-8 shadow-2xl md:p-8">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center pt-0 md:pt-0">
          <img
            src="/logo.png"
            alt="Culinary Cookout"
            className="h-60 w-auto object-contain md:h-80"
          />
          <h1 className="text-2xl font-bold text-red-600 mt-1 md:mt-2">
            {step === 1 ? 'WE OUTSIDE COOKIN\'' : 'CREATE ACCOUNT'}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {step === 1 ? 'Join the cookout...' : 'Set your password'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mt-4 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          /* Step 1: Email Only */
          <form onSubmit={handleContinue} className="space-y-4 mt-4 md:mt-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all"
            >
              Continue
            </button>

            <div className="mt-4 text-center text-xs text-zinc-400">
              <p>By signing up, you agree to all Terms & Conditions & our Privacy Policy</p>
            </div>
          </form>
        ) : (
          /* Step 2: Password Setup */
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 md:mt-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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
                placeholder="Re-enter your password"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 rounded-xl font-bold text-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${
                  loading
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
                }`}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        {/* Footer (Same for both steps) */}
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