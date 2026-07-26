'use client';

import { useState } from 'react';

export default function QuantityAddToCart({ item, disabled, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center space-x-3 mt-4">
      <div className={`flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <button
          onClick={handleDecrement}
          disabled={disabled}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition disabled:cursor-not-allowed"
          type="button"
        >
          -
        </button>
        <span className="px-4 py-1 text-gray-900 font-semibold">{quantity}</span>
        <button
          onClick={handleIncrement}
          disabled={disabled}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition disabled:cursor-not-allowed"
          type="button"
        >
          +
        </button>
      </div>

      <button
        onClick={() => !disabled && onAddToCart(item, quantity)}
        disabled={disabled}
        className={`flex-1 font-medium px-4 py-2 rounded-lg transition shadow-sm ${
          disabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-orange-600 hover:bg-orange-700 text-white'
        }`}
        type="button"
      >
        {disabled ? 'Coming Soon' : 'Add to Cart'}
      </button>
    </div>
  );
}