'use client';

import Menu from '../components/Menu';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <div className="container max-w-2xl mx-auto">
        {/* ✅ Logo ONLY – Perfectly Centered, No Cart Button */}
        <div className="flex flex-col items-center justify-center w-full mb-6 pt-2">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Culinary Cookout"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </div>

        <Menu />
      </div>
    </div>
  );
}