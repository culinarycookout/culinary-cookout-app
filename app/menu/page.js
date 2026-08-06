'use client';

import Menu from '../../components/Menu';

export default function MenuPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-4 pt-0">
      <div className="container max-w-2xl mx-auto">
        {/* ✅ The Logo Container */}
        <div className="flex flex-col items-center justify-center w-full mb-6 pt-2 flex-shrink-0 min-h-[200px]">
          <img
            src="/logo.png"
            alt="Culinary Cookout"
            className="h-[180px] sm:h-[220px] md:h-[280px] w-auto max-w-full object-contain"
          />
        </div>

        {/* ✅ The Menu Grid (Imported from components) */}
        <div className="mt-0">
          <Menu />
        </div>
      </div>
    </div>
  );
}