import Image from 'next/image';
import Menu from '../components/Menu';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <Menu />
    </main>
  );
}