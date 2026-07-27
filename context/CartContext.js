'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('culinary_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('culinary_cart', JSON.stringify(cart));
  }, [cart]);

  // Add item – now using exact Notion field names
  const addToCart = (item, selectedAddOns = [], quantity = 1) => {
    if (!item || !item.id) {
      console.warn('Invalid item passed to addToCart');
      return;
    }
    const cartInstanceId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const safeAddOns = Array.isArray(selectedAddOns) ? selectedAddOns : [];
    // Preserve the exact Notion field names
    const cartItem = {
      ...item, // includes 'Item Name', 'Price', 'CATEGORY', 'SIZE', 'SERVES:', etc.
      quantity: quantity,
      selectedAddOns: safeAddOns,
      cartInstanceId: cartInstanceId,
      notes: '',
    };
    setCart(prevCart => [...prevCart, cartItem]);
  };

  const duplicateItem = (cartInstanceId) => {
    setCart(prevCart => {
      const itemToDuplicate = prevCart.find(item => item.cartInstanceId === cartInstanceId);
      if (!itemToDuplicate) return prevCart;
      const newInstanceId = `${itemToDuplicate.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const duplicatedItem = {
        ...itemToDuplicate,
        cartInstanceId: newInstanceId,
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
    setCart(prev => prev.map(item => item.cartInstanceId === cartInstanceId ? { ...item, quantity } : item));
  };

  const updateItemCustomizations = (cartInstanceId, selectedAddOns, notes) => {
    setCart(prev => prev.map(item =>
      item.cartInstanceId === cartInstanceId
        ? { ...item, selectedAddOns: Array.isArray(selectedAddOns) ? selectedAddOns : [], notes: notes || '' }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item['Price'] || 0;
    const addOnsList = Array.isArray(item.selectedAddOns) ? item.selectedAddOns : [];
    const addOnsPrice = addOnsList.reduce((acc, ao) => acc + (ao.price || 0), 0);
    return sum + (itemPrice + addOnsPrice) * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      duplicateItem,
      removeFromCart,
      updateQuantity,
      updateItemCustomizations,
      clearCart,
      totalItems,
      subtotal
    }}>
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