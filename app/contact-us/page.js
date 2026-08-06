'use client';

import Link from 'next/link';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-2">📬</div>
          <h1 className="text-3xl md:text-4xl font-bold text-red-600">Contact Us</h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-md mx-auto">
            Scan the QR codes below or click the links to connect with us directly.
          </p>
        </div>

        {/* Instagram Card */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 mb-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">📸</span>
            <a 
              href="https://instagram.com/culinarycookout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-medium underline transition-colors"
            >
              instagram.com/culinarycookout
            </a>
          </div>

          {/* ✅ UPDATED: matches your exact filename 'IG QR.png' */}
          <div className="relative w-full max-w-sm mx-auto aspect-square bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/IG QR.png"
              alt="Instagram QR Code"
              className="w-full h-full object-contain p-4"
            />
          </div>
          
          <p className="text-center text-zinc-300 mt-4 text-sm">
            Follow us on Instagram
          </p>
        </div>

        {/* WhatsApp Card */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl">💬</span>
            <a 
              href="https://wa.me/YOUR_WHATSAPP_NUMBER" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium underline transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* ✅ UPDATED: matches your exact filename 'WhatsApp QR.png' */}
          <div className="relative w-full max-w-sm mx-auto aspect-square bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/WhatsApp QR.png"
              alt="WhatsApp QR Code"
              className="w-full h-full object-contain p-4"
            />
          </div>

          <p className="text-center text-zinc-300 mt-4 text-sm">
            Chat with us on WhatsApp
          </p>
        </div>

        {/* Back Link */}
        <Link href="/" className="mt-6 text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
          ↩️ Back To Log In
        </Link>
      </div>
    </div>
  );
}