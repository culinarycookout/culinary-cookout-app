'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  cartInstanceId?: string;
  quantity: number;
  'Price'?: number;
  price?: number;
  'Item Name'?: string;
  name?: string;
}

interface FunCartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (cartInstanceId: string, newQuantity: number) => void;
  removeFromCart: (cartInstanceId: string) => void;
  clearCart: () => void;
  subtotal: number;
}

const FunCartContext = createContext<FunCartContextType | undefined>(undefined);

export function FunCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartInstanceId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          quantity: item.quantity || 1,
        },
      ];
    });
  };

  const updateQuantity = (cartInstanceId: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartInstanceId === cartInstanceId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (cartInstanceId: string) => {
    setCart((prev) => prev.filter((item) => item.cartInstanceId !== cartInstanceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item['Price'] || item.price || 0);
    return sum + (price * (Number(item.quantity) || 0));
  }, 0);

  return (
    <FunCartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, subtotal }}>
      {children}
    </FunCartContext.Provider>
  );
}

export function useFunCart() {
  const context = useContext(FunCartContext);
  if (!context) {
    throw new Error('useFunCart must be used within a FunCartProvider');
  }
  return context;
}