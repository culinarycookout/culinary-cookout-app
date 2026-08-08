import '../app/globals.css';
import { FunCartProvider } from './FunCartContext';
import { FunAuthProvider } from './FunAuthContext';
import FunNavigation from './FunNavigation';

export default function FunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FunAuthProvider>
      <FunCartProvider>
        <FunNavigation />
        <main className="md:ml-24">
          {children}
        </main>
      </FunCartProvider>
    </FunAuthProvider>
  );
}