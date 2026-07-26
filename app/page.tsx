import Image from 'next/image';
import Menu from './components/Menu';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/Culinary Cookout Logo.PNG"
            alt="Culinary Cookout Logo"
            width={200}
            height={80}
            className="h-24 md:h-32 w-auto object-contain"
            priority
          />
        </div>
        <Menu />
      </div>
    </div>
  );
}