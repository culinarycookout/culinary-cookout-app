'use client';

import Menu from '../components/Menu';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <div className="container max-w-2xl mx-auto">
        {/* ✅ Logo – 200% BIGGER */}
        <div className="flex flex-col items-center justify-center w-full mb-6 pt-2">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Culinary Cookout"
            className="h-48 sm:h-56 md:h-72 w-auto object-contain"
          />
        </div>

        <Menu />
      </div>
    </div>
  );
}