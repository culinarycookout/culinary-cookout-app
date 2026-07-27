'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('culinary_cookout_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('culinary_cookout_cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item, quantity = 1, selectedAddOns = []) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      // Create a unique key based on item ID and selected add-on IDs
      const addOnIdsKey = selectedAddOns.map(ao => ao.id).sort().join('-');
      const cartItemKey = `${item.id}-${addOnIdsKey}`;

      const existingIndex = prevCart.findIndex(
        (cartItem) => cartItem.cartItemKey === cartItemKey
      );

      if (existingIndex > -1) {
        // Update quantity if exact item + add-ons combo exists
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        // Add new line item
        return [
          ...prevCart,
          {
            cartItemKey,
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice || item.price,
            isDiscounted: item.isDiscounted || false,
            size: item.size || '',
            serves: item.serves || '',
            imageUrl: item.imageUrl || '',
            quantity,
            selectedAddOns: selectedAddOns.map(ao => ({
              id: ao.id,
              name: ao.name,
              price: ao.price || 0,
            })),
          },
        ];
      }
    });
  };

  const updateQuantity = (cartItemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemKey === cartItemKey ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (cartItemKey) => {
    setCart((prev) => prev.filter((item) => item.cartItemKey !== cartItemKey));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    const addOnsTotal = (item.selectedAddOns || []).reduce((aoSum, ao) => aoSum + ao.price, 0);
    return sum + (item.price + addOnsTotal) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}