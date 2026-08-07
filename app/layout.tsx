import './globals.css';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import RouteGuard from '../components/RouteGuard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <main className="md:ml-24">
              <RouteGuard>
                {children}
              </RouteGuard>
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}