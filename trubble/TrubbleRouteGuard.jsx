'use client';

import './globals.css';
import { TrubbleAuthProvider } from '../context/TrubbleAuthContext';
import { TrubbleCartProvider } from '../TrubbleCartContext';
import TrubbleNavigation from '../TrubbleNavigation';
import TrubbleRouteGuard from '../TrubbleRouteGuard';
import React from 'react';

export default function TrubbleLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <TrubbleAuthProvider>
          <TrubbleCartProvider>
            <TrubbleNavigation />
            <main className="p-4 pb-32 md:ml-24">
              <TrubbleRouteGuard>
                {children}
              </TrubbleRouteGuard>
            </main>
          </TrubbleCartProvider>
        </TrubbleAuthProvider>
      </body>
    </html>
  );
}