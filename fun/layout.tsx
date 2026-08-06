import '../app/globals.css';
import { CartProvider } from '../context/CartContext';
import { FunAuthProvider } from './FunAuthContext';
import FunNavigation from './FunNavigation'; // ✅ Import the isolated navbar

export default function FunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <FunAuthProvider>
          <CartProvider>
            {/* ✅ Only the FunNavigation lives here, not the main nav */}
            <FunNavigation />
            <main className="md:ml-24">
              {children}
            </main>
          </CartProvider>
        </FunAuthProvider>
      </body>
    </html>
  );
}