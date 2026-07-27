'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';

// ✅ ADD-ONS DATA (complete – include your full list here)
const addonsData = {
  "Beef Patty": { cost: 4.00, description: "A juicy all-beef patty.", heatLevel: "", categories: ["BURGER"], countable: true },
  "Flamed Beef Patty": { cost: 6.00, description: "A grilled all-beef patty.", heatLevel: "", categories: ["BURGER"], countable: true },
  "Fried Shrimp": { cost: 7.50, description: "4 colossal deep-fried shrimp slices.", heatLevel: "", categories: ["BURGER"], countable: true },
  "Fried Snapper": { cost: 5.00, description: "A deep-fried fish fillet.", heatLevel: "", categories: ["BURGER"], countable: true },
  "Turkey Patty": { cost: 2.50, description: "A turkey patty.", heatLevel: "", categories: ["BURGER"], countable: true },
  "Jr. Beef Patty": { cost: 2.25, description: "An all-beef patty.", heatLevel: "", categories: ["JR.BURGER"], countable: true },
  "Jr. Bird Patty": { cost: 1.50, description: "A turkey patty.", heatLevel: "", categories: ["JR.BURGER"], countable: true },
  "Mushroom Patty": { cost: 3.00, description: "A portabella patty.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Egg Patty": { cost: 1.00, description: "A scrambled egg.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Bacon": { cost: 1.75, description: "2 turkey strips.", heatLevel: "", categories: ["BURGER"], countable: true },
  "1000 Sauce": { cost: 1.00, description: "A tangy dressing.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "1000 Sauce (Extra)": { cost: 1.50, description: "A creamy flavor burst.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Habanero Mayo": { cost: 1.00, description: "A kick in the buns.", heatLevel: "Hot", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Habanero Mayo (Extra)": { cost: 1.50, description: "A double kick in the buns.", heatLevel: "Hot", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Ketchup": { cost: 0.25, description: "A tomato classic.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Ketchup (Extra)": { cost: 0.50, description: "Twice the fun in a bun.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Mayo": { cost: 0.25, description: "Creamy mayonnaise.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Mayo (Extra)": { cost: 0.50, description: "Both sides of the bun.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Mustard": { cost: 0.25, description: "A tangy condiment compliment.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Mustard (Extra)": { cost: 0.50, description: "2-sided tanginess.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Spicy": { cost: 0.25, description: "Hot sauce.", heatLevel: "Medium", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Xtreme Sauce": { cost: 0.25, description: "Xtreme hot sauce - for the brave.", heatLevel: "Xtreme", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Xtreme Sauce (Extra)": { cost: 0.50, description: "Xtreme hot sauce - for the insane.", heatLevel: "Xtreme", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Avocado": { cost: 1.00, description: "4 slices.", heatLevel: "", categories: ["BURGER"], countable: false },
  "Pickles": { cost: 0.50, description: "4 slices", heatLevel: "", categories: ["BURGER"], countable: false },
  "Spicy Pickles": { cost: 0.50, description: "4 slices", heatLevel: "Mild", categories: ["BURGER"], countable: false },
  "Tomato": { cost: 0.75, description: "1 beefsteak slice.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Avocado Jr.": { cost: 1.00, description: "2 slices.", heatLevel: "", categories: ["JR.BURGER"], countable: false },
  "Bacon Jr.": { cost: 1.00, description: "1 turkey strip.", heatLevel: "", categories: ["JR.BURGER"], countable: true },
  "Pickles Jr.": { cost: 0.25, description: "2 slices", heatLevel: "", categories: ["JR.BURGER"], countable: false },
  "Spicy Pickles Jr.": { cost: 0.25, description: "2 slices", heatLevel: "Mild", categories: ["JR.BURGER"], countable: false },
  "Garlic": { cost: 0.50, description: "Diced & sauteed.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Jalapenos": { cost: 0.50, description: "4 slices", heatLevel: "Mild", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Lettuce": { cost: 0.50, description: "Living/Butter.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: false },
  "Onions": { cost: 0.25, description: "Fresh red rings.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Onions (Sauteed)": { cost: 0.75, description: "Sauteed slices.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Cheddar": { cost: 0.50, description: "Melted cheese.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Sharp Cheddar": { cost: 0.50, description: "Melted cheese.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Provologne": { cost: 0.50, description: "Melted cheese.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true },
  "Swiss": { cost: 0.50, description: "Melted cheese.", heatLevel: "", categories: ["JR.BURGER", "BURGER"], countable: true }
};

const isTacoTuesday = () => {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const day = pacificTime.getDay();
  const hours = pacificTime.getHours();
  if (day === 2) return true;
  if (day === 3 && hours < 1) return true;
  return false;
};

const getItemPrice = (item) => item?.['Price'] ?? item?.price ?? 0;
const getItemQty = (item) => Number(item?.quantity ?? item?.qty ?? 1);

function CartContent() {
  const {
    cart,
    duplicateItem,
    updateQuantity,
    updateItemCustomizations,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [localAddOns, setLocalAddOns] = useState({});
  const [localNotes, setLocalNotes] = useState('');

  const isTacoActive = isTacoTuesday();

  const getAddonData = (name) => addonsData[name] || {};

  const getSafeAddOns = (item) => {
    return Array.isArray(item?.selectedAddOns) ? item.selectedAddOns : [];
  };

  const calculateItemTotal = (item) => {
    const price = getItemPrice(item);
    const qty = getItemQty(item);
    const baseTotal = price * qty;
    const addOnsList = getSafeAddOns(item);

    const addOnTotal = addOnsList.reduce((acc, addon) => {
      const addonPrice = addon?.price ?? addon?.cost ?? 0;
      const addonQty = Number(addon?.quantity ?? addon?.qty ?? 1);
      return acc + (addonPrice * addonQty * qty);
    }, 0);

    let total = baseTotal + addOnTotal;
    if (isTacoActive && item?.name && item.name.toUpperCase().includes("TACO")) {
      total = total * 0.5;
    }
    return total;
  };

  const openCustomize = (cartInstanceId) => {
    const item = cart.find(i => i.cartInstanceId === cartInstanceId);
    if (!item) return;
    setSelectedItemId(cartInstanceId);
    const addOns = getSafeAddOns(item);
    const addOnsObj = {};
    addOns.forEach(addon => {
      addOnsObj[addon.name] = Number(addon?.quantity ?? addon?.qty ?? 1);
    });
    setLocalAddOns(addOnsObj);
    setLocalNotes(item?.notes || '');
    setShowCustomize(true);
  };

  const closeCustomize = () => {
    setShowCustomize(false);
    setSelectedItemId(null);
    setLocalAddOns({});
    setLocalNotes('');
  };

  const saveCustomizations = () => {
    if (!selectedItemId) return;
    const selectedAddOns = Object.entries(localAddOns)
      .filter(([name, qty]) => qty > 0)
      .map(([name, quantity]) => {
        const data = getAddonData(name);
        return {
          id: `addon-${name.replace(/\s/g, '-')}`,
          name: name,
          price: data.cost || 0,
          quantity: Number(quantity),
          description: data.description || '',
          heatLevel: data.heatLevel || '',
        };
      });
    updateItemCustomizations(selectedItemId, selectedAddOns, localNotes);
    closeCustomize();
  };

  const toggleAddOn = (name) => {
    setLocalAddOns(prev => {
      const newState = { ...prev };
      if (newState[name] && newState[name] > 0) {
        delete newState[name];
      } else {
        newState[name] = 1;
      }
      return newState;
    });
  };

  const changeAddOnQty = (name, delta) => {
    setLocalAddOns(prev => {
      const current = prev[name] || 0;
      const newQty = Math.max(0, current + delta);
      const newState = { ...prev };
      if (newQty === 0) {
        delete newState[name];
      } else {
        newState[name] = newQty;
      }
      return newState;
    });
  };

  const getAddonQuantity = (name) => localAddOns[name] || 0;

  const getAvailableAddOns = (itemName) => {
    const upper = (itemName || '').toUpperCase();
    let category = '';
    if (upper.includes("JR.") || upper.includes("JUNIOR")) category = "JR.BURGER";
    else if (upper.includes("BURGER")) category = "BURGER";
    if (!category) return [];
    return Object.keys(addonsData).filter(name => {
      const cats = addonsData[name].categories || [];
      return cats.includes(category);
    });
  };

  const selectedItem = cart.find(i => i.cartInstanceId === selectedItemId);

  const handleConfirmOrder = () => {
    const orderData = cart.map(item => {
      const addOns = getSafeAddOns(item);
      const formattedAddons = addOns.map(addon => ({
        Name: addon.name,
        Quantity: Number(addon?.quantity ?? addon?.qty ?? 1),
        Cost: addon?.price ?? addon?.cost ?? 0,
        Description: getAddonData(addon.name).description || "",
        HeatLevel: getAddonData(addon.name).heatLevel || ""
      }));
      return {
        id: item.id,
        name: item['Item Name'] || item.name || 'Item',
        price: getItemPrice(item),
        quantity: Number(getItemQty(item)),
        addOns: formattedAddons,
        notes: item?.notes || '',
      };
    });
    const total = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    window.location.href = `/delivery-details?items=${encodeURIComponent(JSON.stringify(orderData))}&total=${total.toFixed(2)}`;
  };

  const totalItems = cart.reduce((sum, item) => sum + getItemQty(item), 0);

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 pb-24">
      <div className="container max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Cook For Hire"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between w-full mb-6 px-2">
          <button
            onClick={() => window.location.href = "/"}
            className="text-red-400 hover:text-red-300 text-sm md:text-base font-medium whitespace-nowrap pt-1"
          >
            ← Back to Menu
          </button>

          <div className="flex flex-col items-end text-right">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🛒</span>
              <h1 className="text-2xl md:text-3xl font-bold text-red-600 leading-tight">Your Cart</h1>
            </div>
            <span className="text-xs md:text-sm text-zinc-400 mt-1 block">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </div>
        </div>

        {isTacoActive && (
          <div className="bg-yellow-600 text-black p-3 rounded-xl text-center font-bold mb-4">
            🎉 TACO TUESDAY – 50% OFF ALL TACOS!
          </div>
        )}

        {cart.length === 0 ? (
          <p className="text-center text-zinc-400 py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item) => {
                const total = calculateItemTotal(item);
                const qty = getItemQty(item);
                const price = getItemPrice(item);
                const isTaco = item?.name && item.name.toUpperCase().includes("TACO");
                const addOns = getSafeAddOns(item);
                const addonNames = addOns.map(a => `${a.name} x${Number(a?.quantity ?? a?.qty ?? 1)}`).join(', ');

                return (
                  <div key={item.cartInstanceId} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-white">{item['Item Name'] || item.name}</h3>
                        {addonNames && (
                          <p className="text-sm text-zinc-400">Add-ons: {addonNames}</p>
                        )}
                        {item?.notes && (
                          <p className="text-sm text-zinc-400 mt-1">Notes: {item.notes}</p>
                        )}
                        {isTacoActive && isTaco && (
                          <p className="text-xs text-zinc-500 mt-1">
                            <span className="line-through">${(price * qty).toFixed(2)}</span>
                            {' '}→ 50% OFF!
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-red-400">${total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {/* Quantity controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.cartInstanceId, qty - 1)}
                          className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold flex items-center justify-center text-lg"
                        >
                          −
                        </button>
                        <span className="text-lg font-bold text-white w-6 text-center">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.cartInstanceId, qty + 1)}
                          className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center text-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* Duplicate Button – "Build Another" with white text and black chef emoji */}
                      <button
                        onClick={() => duplicateItem(item.cartInstanceId)}
                        className="flex flex-col items-center leading-tight text-white hover:text-zinc-300 text-sm font-medium px-2 transition-colors"
                      >
                        <span>Build</span>
                        <span>Another</span>
                        <span className="text-lg">👨🏾‍🍳</span>
                      </button>

                      {/* Customize – green, moved left */}
                      <button
                        onClick={() => openCustomize(item.cartInstanceId)}
                        className="text-green-400 hover:text-green-300 text-sm font-medium ml-1"
                      >
                        ✏️ Customize
                      </button>

                      {/* Remove – red */}
                      <button
                        onClick={() => removeFromCart(item.cartInstanceId)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Subtotal</span>
                <span className="text-red-400">${cart.reduce((sum, item) => sum + calculateItemTotal(item), 0).toFixed(2)}</span>
              </div>
              {isTacoActive && (
                <p className="text-xs text-green-400 text-center mb-2">🎉 Taco Tuesday discount applied</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition"
                >
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Customize Overlay */}
      {showCustomize && selectedItem && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-4 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <button
                onClick={closeCustomize}
                className="text-red-400 hover:text-red-300 font-medium text-sm"
              >
                ← Back to Cart
              </button>
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Customization</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{selectedItem['Item Name'] || selectedItem.name}</h2>
            <p className="text-zinc-400 text-sm mb-6">Tailor your ingredients, add-ons, and instructions.</p>

            <div className="mb-6">
              <p className="text-sm font-bold text-white mb-3 tracking-wide">AVAILABLE ADD-ONS:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getAvailableAddOns(selectedItem['Item Name'] || selectedItem.name).map((name) => {
                  const addon = addonsData[name];
                  const qty = getAddonQuantity(name);
                  const isSelected = qty > 0;
                  const cost = addon.cost || 0;
                  const desc = addon.description || "";
                  const heat = addon.heatLevel || "";
                  const countable = addon.countable || false;

                  if (countable) {
                    return (
                      <div key={name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-white font-bold text-sm block">{name}</span>
                            {desc && <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>}
                            {heat && <span className="text-xs text-orange-400 mt-1 inline-block">🔥 {heat}</span>}
                          </div>
                          <span className="text-xs text-red-400 font-semibold">+${cost.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                          <span className="text-xs text-zinc-400">Quantity</span>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => changeAddOnQty(name, -1)}
                              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-base"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-white font-bold text-base">{qty}</span>
                            <button
                              onClick={() => changeAddOnQty(name, 1)}
                              className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-base"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <button
                        key={name}
                        onClick={() => toggleAddOn(name)}
                        className={`p-3 rounded-xl text-left transition-all border ${
                          isSelected
                            ? 'bg-red-600/20 border-red-600 text-white'
                            : 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-sm">{name}</span>
                          <span className="text-xs text-red-400 font-semibold">+${cost.toFixed(2)}</span>
                        </div>
                        {desc && <p className="text-xs text-zinc-400 mt-1">{desc}</p>}
                        {heat && <p className="text-xs text-orange-400 mt-1">🔥 {heat}</p>}
                      </button>
                    );
                  }
                })}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-white mb-2">Special Instructions:</label>
              <textarea
                rows="3"
                value={localNotes}
                placeholder="Add any special requests or notes here..."
                className="w-full p-3 text-sm text-white bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-red-500 resize-none"
                onChange={(e) => setLocalNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-black pt-4 pb-6 border-t border-zinc-800 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-400">Customized Item Total</span>
              <span className="text-2xl font-bold text-red-400">
                ${(() => {
                  const price = getItemPrice(selectedItem);
                  const qty = getItemQty(selectedItem);
                  let baseTotal = price * qty;
                  let addOnTotal = 0;
                  Object.entries(localAddOns).forEach(([name, addonQty]) => {
                    const cost = getAddonData(name).cost || 0;
                    addOnTotal += cost * Number(addonQty) * qty;
                  });
                  let total = baseTotal + addOnTotal;
                  if (isTacoActive && selectedItem.name && selectedItem.name.toUpperCase().includes("TACO")) {
                    total = total * 0.5;
                  }
                  return total.toFixed(2);
                })()}
              </span>
            </div>
            <button
              onClick={saveCustomizations}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-base transition-colors shadow-lg"
            >
              Save Customizations & Return to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading cart...</div>}>
      <CartContent />
    </Suspense>
  );
}