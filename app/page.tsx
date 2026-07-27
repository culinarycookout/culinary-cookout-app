'use client';

import Menu from '../components/Menu';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <div className="container max-w-2xl mx-auto">
        {/* ✅ Logo – 100% BIGGER, RAISED UP, MINIMAL PADDING */}
        <div className="flex flex-col items-center justify-center w-full mb-1 pt-0">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Culinary Cookout"
            className="h-40 sm:h-48 md:h-56 w-auto object-contain"
          />
        </div>

        {/* ✅ Menu – Pulled up closer to logo */}
        <div className="-mt-2">
          <Menu />
        </div>
      </div>
    </div>
  );
}