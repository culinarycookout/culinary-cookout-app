// ✅ ADD-ONS DATA — Full data structure for cart customization
export const addonsData = {
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

// ✅ CATEGORY-BASED ADD-ONS — For the detail page
export const categoryAddOns = {
  "BURGERS": [
    { id: "bacon", name: "Bacon", price: 1.75, description: "2 turkey strips.", heatLevel: "" },
    { id: "cheddar", name: "Cheddar", price: 0.50, description: "Melted cheese.", heatLevel: "" },
    { id: "sharp-cheddar", name: "Sharp Cheddar", price: 0.50, description: "Melted cheese.", heatLevel: "" },
    { id: "swiss", name: "Swiss", price: 0.50, description: "Melted cheese.", heatLevel: "" },
    { id: "provologne", name: "Provologne", price: 0.50, description: "Melted cheese.", heatLevel: "" },
    { id: "mushroom-patty", name: "Mushroom Patty", price: 3.00, description: "A portabella patty.", heatLevel: "" },
    { id: "egg-patty", name: "Egg Patty", price: 1.00, description: "A scrambled egg.", heatLevel: "" },
    { id: "1000-sauce", name: "1000 Sauce", price: 1.00, description: "A tangy dressing.", heatLevel: "" },
    { id: "habanero-mayo", name: "Habanero Mayo", price: 1.00, description: "A kick in the buns.", heatLevel: "Hot" },
    { id: "spicy", name: "Spicy", price: 0.25, description: "Hot sauce.", heatLevel: "Medium" },
    { id: "xtreme-sauce", name: "Xtreme Sauce", price: 0.25, description: "Xtreme hot sauce - for the brave.", heatLevel: "Xtreme" },
    { id: "avocado", name: "Avocado", price: 1.00, description: "4 slices.", heatLevel: "" },
    { id: "pickles", name: "Pickles", price: 0.50, description: "4 slices", heatLevel: "" },
    { id: "spicy-pickles", name: "Spicy Pickles", price: 0.50, description: "4 slices", heatLevel: "Mild" },
    { id: "tomato", name: "Tomato", price: 0.75, description: "1 beefsteak slice.", heatLevel: "" },
    { id: "jalapenos", name: "Jalapenos", price: 0.50, description: "4 slices", heatLevel: "Mild" },
    { id: "lettuce", name: "Lettuce", price: 0.50, description: "Living/Butter.", heatLevel: "" },
    { id: "onions", name: "Onions", price: 0.25, description: "Fresh red rings.", heatLevel: "" },
    { id: "onions-sauteed", name: "Onions (Sauteed)", price: 0.75, description: "Sauteed slices.", heatLevel: "" },
  ],
  "LATIN AMERICA": [
    { id: "guac", name: "Guacamole", price: 1.75, description: "Made fresh daily.", heatLevel: "" },
    { id: "crema", name: "Spicy Crema", price: 0.50, description: "House chipotle crema.", heatLevel: "Mild" },
    { id: "cotija", name: "Cotija Cheese", price: 0.75, description: "Aged Mexican crumbling cheese.", heatLevel: "" },
    { id: "pico", name: "Pico de Gallo", price: 0.50, description: "Fresh tomato, onion, cilantro.", heatLevel: "" },
  ],
  "BUNS": [
    { id: "cheddar", name: "Cheddar", price: 0.50, description: "Melted cheese.", heatLevel: "" },
    { id: "swiss", name: "Swiss", price: 0.50, description: "Melted cheese.", heatLevel: "" },
    { id: "onions-sauteed", name: "Onions (Sauteed)", price: 0.75, description: "Sauteed slices.", heatLevel: "" },
    { id: "bacon", name: "Bacon", price: 1.75, description: "2 turkey strips.", heatLevel: "" },
  ],
  "HOT DOG": [
    { id: "ketchup", name: "Ketchup", price: 0.25, description: "A tomato classic.", heatLevel: "" },
    { id: "mustard", name: "Mustard", price: 0.25, description: "A tangy condiment compliment.", heatLevel: "" },
    { id: "relish", name: "Relish", price: 0.50, description: "Sweet pickle relish.", heatLevel: "" },
    { id: "onions-sauteed", name: "Onions (Sauteed)", price: 0.75, description: "Sauteed slices.", heatLevel: "" },
    { id: "bacon", name: "Bacon", price: 1.75, description: "2 turkey strips.", heatLevel: "" },
    { id: "cheddar", name: "Cheddar", price: 0.50, description: "Melted cheese.", heatLevel: "" },
  ],
  "SAUSAGE": [
    { id: "ketchup", name: "Ketchup", price: 0.35, description: "A tomato classic.", heatLevel: "" },
    { id: "mustard", name: "Mustard", price: 0.35, description: "A tangy condiment compliment.", heatLevel: "" },
    { id: "relish", name: "Relish", price: 0.75, description: "Sweet pickle relish.", heatLevel: "" },
    { id: "onions-sauteed", name: "Onions (Sauteed)", price: 0.75, description: "Sauteed slices.", heatLevel: "" },
    { id: "bacon", name: "Bacon", price: 1.75, description: "2 turkey strips.", heatLevel: "" },
    { id: "cheddar", name: "Cheddar", price: 0.50, description: "Melted cheese.", heatLevel: "" },
  ],
  "SUBMARINE": [
    { id: "ketchup", name: "Ketchup", price: 0.50, description: "A tomato classic.", heatLevel: "" },
    { id: "mustard", name: "Mustard", price: 0.50, description: "A tangy condiment compliment.", heatLevel: "" },
    { id: "relish", name: "Relish", price: 1.00, description: "Sweet pickle relish.", heatLevel: "" },
    { id: "onions-sauteed", name: "Onions (Sauteed)", price: 1.00, description: "Sauteed slices.", heatLevel: "" },
    { id: "bacon", name: "Bacon", price: 2.25, description: "2 turkey strips.", heatLevel: "" },
    { id: "cheddar", name: "Cheddar", price: 1.00, description: "Melted cheese.", heatLevel: "" },
  ],
};

// Helper function to get add-ons by category
export const getAddOnsByCategory = (category) => {
  const normalized = (category || '').toUpperCase().trim();
  if (categoryAddOns[normalized]) return categoryAddOns[normalized];
  for (const [key, value] of Object.entries(categoryAddOns)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  return categoryAddOns['BURGERS'] || [];
};