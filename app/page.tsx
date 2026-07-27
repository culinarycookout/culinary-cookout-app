'use client';

import Menu from '../components/Menu';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-4 pt-0">
      <div className="container max-w-2xl mx-auto">
        {/* ✅ Logo container – relative so we can overlay the wine glass */}
        <div className="relative flex flex-col items-center justify-center w-full mb-0 pt-0">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Culinary Cookout"
            className="h-[200px] sm:h-[240px] md:h-[280px] w-auto object-contain"
          />

          {/* ✅ Red Wine Glass Button – positioned on the table inside the logo */}
          <Link
            href="/secret-menu"
            className="absolute text-red-600 hover:text-red-400 transition-colors hover:scale-110"
            style={{
              // Adjust these values until the wine glass sits on the table
              bottom: '22%',      // vertical position from bottom of the image
              right: '14%',       // horizontal position from right edge
              fontSize: '2.2rem',
              lineHeight: 1,
              transform: 'translate(10%, 10%)', // fine‑tune offset
            }}
            aria-label="Secret Menu"
          >
            🍷
          </Link>
        </div>

        {/* Menu – pulled up close */}
        <div className="-mt-4">
          <Menu />
        </div>
      </div>
    </div>
  );
}