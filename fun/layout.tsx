import { FunAuthProvider } from './context/FunAuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FunAuthProvider>
          {children}
        </FunAuthProvider>
      </body>
    </html>
  );
}