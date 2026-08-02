'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // ✅ Lazy initialization — reads localStorage on first render, no extra write
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return [];
    const savedCart = localStorage.getItem('culinary_cart');
    if (!savedCart) return [];
    try {
      const parsed = JSON.parse(savedCart);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  // ✅ Save cart to localStorage whenever it changes (only one useEffect now)
  useEffect(() => {
    localStorage.setItem('culinary_cart', JSON.stringify(cart));
  }, [cart]);

  // Add item – groups identical items
  const addToCart = (item, selectedAddOns = [], quantity = 1) => {
    if (!item || !item.id) {
      console.warn('Invalid item passed to addToCart');
      return;
    }

    const safeQuantity = Math.max(1, Number(quantity) || 1);
    const safeAddOns = Array.isArray(selectedAddOns) ? selectedAddOns : [];

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(cartItem =>
        cartItem.id === item.id &&
        cartItem['SIZE'] === item['SIZE'] &&
        JSON.stringify(cartItem.selectedAddOns) === JSON.stringify(safeAddOns)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Number(updated[existingIndex].quantity) + safeQuantity,
        };
        return updated;
      } else {
        const cartInstanceId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const cartItem = {
          ...item,
          quantity: safeQuantity,
          selectedAddOns: safeAddOns,
          cartInstanceId: cartInstanceId,
          notes: '',
        };
        return [...prevCart, cartItem];
      }
    });
  };

  const duplicateItem = (cartInstanceId) => {
    setCart(prevCart => {
      const itemToDuplicate = prevCart.find(item => item.cartInstanceId === cartInstanceId);
      if (!itemToDuplicate) return prevCart;

      const newInstanceId = `${itemToDuplicate.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const duplicatedItem = {
        ...itemToDuplicate,
        cartInstanceId: newInstanceId,
        quantity: 1,
      };
      const index = prevCart.findIndex(item => item.cartInstanceId === cartInstanceId);
      const updated = [...prevCart];
      updated.splice(index + 1, 0, duplicatedItem);
      return updated;
    });
  };

  const removeFromCart = (cartInstanceId) => {
    setCart(prev => prev.filter(item => item.cartInstanceId !== cartInstanceId));
  };

  const updateQuantity = (cartInstanceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartInstanceId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartInstanceId === cartInstanceId
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const updateItemCustomizations = (cartInstanceId, selectedAddOns, notes) => {
    setCart(prev =>
      prev.map(item =>
        item.cartInstanceId === cartInstanceId
          ? {
              ...item,
              selectedAddOns: Array.isArray(selectedAddOns) ? selectedAddOns : [],
              notes: notes || '',
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ✅ Force numbers for totalItems and subtotal – fixes the badge issue
  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = Number(item['Price']) || 0;
    const addOnsList = Array.isArray(item.selectedAddOns) ? item.selectedAddOns : [];
    const addOnsPrice = addOnsList.reduce((acc, ao) => acc + (Number(ao.price) || 0), 0);
    return sum + (itemPrice + addOnsPrice) * (Number(item.quantity) || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        duplicateItem,
        removeFromCart,
        updateQuantity,
        updateItemCustomizations,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
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