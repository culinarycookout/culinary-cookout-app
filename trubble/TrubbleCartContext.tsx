'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Hardcoded structure for a Trubble cart item
type TrubbleCartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

interface TrubbleCartContextType {
  trubbleCartItems: TrubbleCartItem[];
  trubbleAddToCart: (item: Omit<TrubbleCartItem, 'quantity'>) => void;
  trubbleRemoveFromCart: (id: string) => void;
  trubbleClearCart: () => void;
  trubbleCartTotal: number;
}

const TrubbleCartContext = createContext<TrubbleCartContextType | undefined>(undefined);

export function TrubbleCartProvider({ children }: { children: ReactNode }) {
  const [trubbleCartItems, setTrubbleCartItems] = useState<TrubbleCartItem[]>([]);

  const trubbleAddToCart = (item: Omit<TrubbleCartItem, 'quantity'>) => {
    setTrubbleCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const trubbleRemoveFromCart = (id: string) => {
    setTrubbleCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const trubbleClearCart = () => {
    setTrubbleCartItems([]);
  };

  const trubbleCartTotal = trubbleCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <TrubbleCartContext.Provider
      value={{
        trubbleCartItems,
        trubbleAddToCart,
        trubbleRemoveFromCart,
        trubbleClearCart,
        trubbleCartTotal,
      }}
    >
      {children}
    </TrubbleCartContext.Provider>
  );
}

export function useTrubbleCart() {
  const context = useContext(TrubbleCartContext);
  if (!context) throw new Error('useTrubbleCart must be used within a TrubbleCartProvider');
  return context;
}