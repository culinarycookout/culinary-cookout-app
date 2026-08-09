'use client';

import './globals.css';
import { TrubbleAuthProvider } from '../context/TrubbleAuthContext';
import { TrubbleCartProvider } from '../TrubbleCartContext';
import TrubbleNavigation from '../TrubbleNavigation';
import React from 'react';

export default function TrubbleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <TrubbleAuthProvider>
          <TrubbleCartProvider>
            <TrubbleNavigation />
            <main className="p-4 pb-32 md:ml-24">
              {children}
            </main>
          </TrubbleCartProvider>
        </TrubbleAuthProvider>
      </body>
    </html>
  );
}