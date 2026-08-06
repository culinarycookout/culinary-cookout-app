'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('culinary_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('culinary_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id === item.id && JSON.stringify(i.customization) === JSON.stringify(item.customization)
      );

      if (existingItem) {
        return prevCart.map((i) =>
          i === existingItem ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          cartInstanceId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          quantity: item.quantity || 1,
        },
      ];
    });
  };

  const updateQuantity = (cartInstanceId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartInstanceId === cartInstanceId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (cartInstanceId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartInstanceId !== cartInstanceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}