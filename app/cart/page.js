'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  const searchParams = useSearchParams();

  // ✅ ADD-ONS DATA
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

  // ✅ TACO TUESDAY
  const isTacoTuesday = () => {
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const day = pacificTime.getDay();
    const hours = pacificTime.getHours();
    if (day === 2) return true;
    if (day === 3 && hours < 1) return true;
    return false;
  };
  const isTacoActive = isTacoTuesday();

  // ✅ LOAD CART FROM URL
  useEffect(() => {
    const itemsParam = searchParams.get('items');
    if (itemsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(itemsParam));
        setCartItems(parsed);
        const initialAddOns = {};
        parsed.forEach(item => {
          initialAddOns[item.id] = {};
        });
        setSelectedAddOns(initialAddOns);
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
  }, [searchParams]);

  const getAddonData = (name) => addonsData[name] || {};

  const handleAddOnToggle = (itemId, addonName) => {
    setSelectedAddOns(prev => {
      const current = prev[itemId] || {};
      const addon = addonsData[addonName];
      if (!addon) return prev;
      if (addon.countable) {
        const newQty = (current[addonName] || 0) + 1;
        return { ...prev, [itemId]: { ...current, [addonName]: newQty } };
      } else {
        const isSelected = current[addonName] > 0;
        if (isSelected) {
          const { [addonName]: _, ...rest } = current;
          return { ...prev, [itemId]: rest };
        } else {
          return { ...prev, [itemId]: { ...current, [addonName]: 1 } };
        }
      }
    });
  };

  const handleQuantityChange = (itemId, addonName, delta) => {
    setSelectedAddOns(prev => {
      const current = prev[itemId] || {};
      const currentQty = current[addonName] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [addonName]: _, ...rest } = current;
        return { ...prev, [itemId]: rest };
      } else {
        return { ...prev, [itemId]: { ...current, [addonName]: newQty } };
      }
    });
  };

  const getAddonQuantity = (itemId, addonName) => {
    return selectedAddOns[itemId]?.[addonName] || 0;
  };

  const calculateItemTotal = (item) => {
    let baseTotal = item.price * item.quantity;
    const addons = selectedAddOns[item.id] || {};
    let addOnTotal = 0;
    for (const [name, qty] of Object.entries(addons)) {
      const cost = getAddonData(name).cost || 0;
      addOnTotal += cost * qty * item.quantity;
    }
    let itemTotal = baseTotal + addOnTotal;
    if (isTacoActive && item.name && item.name.toUpperCase().includes("TACO")) {
      itemTotal = itemTotal * 0.5;
    }
    return itemTotal;
  };

  const calculateGrandTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += calculateItemTotal(item);
    });
    return total;
  };

  // ✅ FIXED: Redirects to /delivery-details with cart items
  const handleConfirmOrder = () => {
    const orderData = cartItems.map(item => {
      const addonEntries = Object.entries(selectedAddOns[item.id] || {});
      const addons = addonEntries.map(([name, qty]) => ({
        Name: name,
        Quantity: qty,
        Cost: getAddonData(name).cost || 0,
        Description: getAddonData(name).description || "",
        HeatLevel: getAddonData(name).heatLevel || ""
      }));
      return {
        ...item,
        addOns: addons,
        price: item.price,
        quantity: item.quantity,
      };
    });
    
    // ✅ Redirect to delivery-details page
    window.location.href = `/delivery-details?items=${encodeURIComponent(JSON.stringify(orderData))}&total=${calculateGrandTotal().toFixed(2)}`;
  };

  const getDishCategory = (itemName) => {
    const upper = itemName.toUpperCase();
    if (upper.includes("JR.") || upper.includes("JUNIOR")) return "JR.BURGER";
    if (upper.includes("BURGER")) return "BURGER";
    return "";
  };

  const getAvailableAddOns = (itemName) => {
    const category = getDishCategory(itemName);
    return Object.keys(addonsData).filter(name => {
      const categories = addonsData[name].categories || [];
      if (categories.length === 0) return true;
      return categories.includes(category);
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <div className="container max-w-2xl mx-auto">
        <div className="flex justify-center mb-2">
          <img
            src="https://iili.io/CeCmPWJ.png"
            alt="Cook For Hire"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="text-red-400 hover:text-red-300 mb-2 text-lg"
        >
          ← Back to Menu
        </button>

        <h1 className="text-3xl font-bold text-red-600 text-center mb-4">Your Order</h1>

        {isTacoActive && (
          <div className="bg-yellow-600 text-black p-3 rounded-xl text-center font-bold mb-4">
            🎉 TACO TUESDAY – 50% OFF ALL TACOS!<br />
            <span className="text-sm font-normal">(Tuesday 12:00 AM – Wednesday 1:00 AM Pacific Time)</span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <p className="text-center text-zinc-400">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => {
                const itemAddOns = selectedAddOns[item.id] || {};
                const total = calculateItemTotal(item);
                const isTaco = item.name && item.name.toUpperCase().includes("TACO");
                const addonNames = Object.keys(itemAddOns);

                return (
                  <div key={item.id || index} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-lg">{item.name}</h3>
                        <p className="text-sm text-zinc-400">Quantity: {item.quantity}</p>
                        {addonNames.length > 0 && (
                          <p className="text-sm text-zinc-400">
                            Add-ons: {addonNames.map(name => `${name} x${itemAddOns[name]}`).join(", ")}
                          </p>
                        )}
                        {item.notes && (
                          <p className="text-sm text-zinc-400 mt-1">
                            Notes: {item.notes}
                          </p>
                        )}
                        {isTacoActive && isTaco && (
                          <p className="text-xs text-zinc-500 mt-1">
                            <span className="line-through">${(item.price * item.quantity).toFixed(2)}</span>
                            {' '}→ 50% OFF!
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-red-400">
                          ${total.toFixed(2)}
                        </p>
                        {isTacoActive && isTaco && (
                          <p className="text-xs text-green-400">🎉 Discounted</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowCustomize(true);
                      }}
                      className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      ✏️ Customize
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total</span>
                <span className="text-red-400">${calculateGrandTotal().toFixed(2)}</span>
              </div>
              {isTacoActive && (
                <p className="text-xs text-green-400 text-center mb-2">🎉 Taco Tuesday discount applied</p>
              )}
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>

      {showCustomize && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.name}</h2>
            <p className="text-zinc-400 mb-4">Customize your order</p>

            <div className="mb-4">
              <p className="text-sm font-bold text-white mb-2">Add-ons:</p>
              <div className="flex flex-wrap gap-2">
                {getAvailableAddOns(selectedItem.name).map((name) => {
                  const addon = addonsData[name];
                  const qty = getAddonQuantity(selectedItem.id, name);
                  const isSelected = qty > 0;
                  const cost = addon.cost || 0;
                  const desc = addon.description || "";
                  const heat = addon.heatLevel || "";
                  const countable = addon.countable || false;

                  if (countable) {
                    return (
                      <div key={name} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-white font-bold text-sm">{name}</span>
                            {desc && <p className="text-[10px] text-zinc-400 mt-0.5">{desc}</p>}
                            {heat && <span className="text-[10px] text-orange-400">🔥 {heat}</span>}
                          </div>
                          <span className="text-[10px] text-red-400 whitespace-nowrap ml-2">+${cost.toFixed(2)} each</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <button
                            onClick={() => handleQuantityChange(selectedItem.id, name, -1)}
                            className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-white font-bold">{qty}</span>
                          <button
                            onClick={() => handleQuantityChange(selectedItem.id, name, 1)}
                            className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-sm font-bold"
                          >
                            +
                          </button>
                          {qty > 0 && (
                            <span className="text-[10px] text-green-400 ml-1">(total: ${(cost * qty).toFixed(2)})</span>
                          )}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <button
                        key={name}
                        onClick={() => handleAddOnToggle(selectedItem.id, name)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${isSelected
                            ? 'bg-red-600 text-white'
                            : 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700'
                          }`}
                      >
                        <div>{name}</div>
                        <div className="text-[10px] text-zinc-400">{desc}</div>
                        {heat && <div className="text-[10px] text-orange-400">🔥 {heat}</div>}
                        <div className="text-[10px] text-red-400">+${cost.toFixed(2)}</div>
                      </button>
                    );
                  }
                })}
              </div>
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Special instructions..."
                className="w-full p-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500"
                onChange={(e) => {
                  const updatedItems = cartItems.map(item => {
                    if (item.id === selectedItem.id) {
                      return { ...item, notes: e.target.value };
                    }
                    return item;
                  });
                  setCartItems(updatedItems);
                }}
              />
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
              <p className="text-xl font-bold text-white">
                ${calculateItemTotal(selectedItem).toFixed(2)}
              </p>
              <button
                onClick={() => setShowCustomize(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}