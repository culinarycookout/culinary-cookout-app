'use client';

import Menu from '../components/Menu';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-4 pt-0">
      <div className="container max-w-2xl mx-auto">
        {/* Logo – huge, at the top */}
        <div className="flex flex-col items-center justify-center w-full mb-0 pt-0">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Culinary Cookout"
            className="h-[200px] sm:h-[240px] md:h-[280px] w-auto object-contain"
          />
        </div>

        {/* Menu – pulled up close */}
        <div className="-mt-4">
          <Menu />
        </div>
      </div>
    </div>
  );
}