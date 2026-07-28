import { NextResponse } from 'next/server';

// ✅ CATEGORY ORDER
const categoryOrder = {
  'BREAKFAST': 0,
  'SANDWICHES': 1,
  'BURGERS': 2,
  'FRIED SIDES': 3,
  'BIRDS': 4,
  'BEEF': 5,
  'SEAFOOD': 6,
  'LATIN AMERICA': 7,
  'ASIAN': 8,
  'GRILLED': 9,
  'SOUPS & STEWS': 10,
  'SMOKED (24-Hour Notice)': 11,
  'BEVERAGES': 12,
};

// ✅ SERVES RANK
const getServesRank = (serves) => {
  const s = (serves || '').trim();
  if (s.includes('1 Person')) return 1;
  if (s.includes('1-2')) return 2;
  if (s.includes('2 People')) return 3;
  if (s.includes('2-3')) return 4;
  if (s.includes('3-4')) return 5;
  if (s.includes('4 People')) return 6;
  if (s.includes('4-6')) return 7;
  if (s.includes('6-8')) return 8;
  if (s.includes('8-10')) return 9;
  return 99;
};

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

export async function GET() {
  try {
    let allResults = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const requestBody = {};
      if (startCursor) requestBody.start_cursor = startCursor;

      const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_MENU_DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Notion API error: ${response.status}`);
      }

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    // Process menu items with fallback mapping for AMOUNT
    let menuItems = allResults.map((item) => {
      const name = item.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled';
      const rawItemType = item.properties['Item Type']?.select?.name || '';

      const cleanName = name
        .replace(/\b(SMALL|MEDIUM|LARGE|GROUP|JR\.?)\b/gi, '')
        .replace(/\s*[\(\[].*?[\)\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const amountValue = 
        item.properties['# AMOUNT']?.number ?? 
        item.properties['AMOUNT']?.number ?? 
        item.properties['Amount']?.number ?? 
        item.properties['QUANTITY']?.number ?? 
        item.properties['Quantity']?.number ?? 0;

      return {
        id: item.id,
        'Item Name': name,
        'Price': item.properties['Price']?.number || 0,
        'CATEGORY': item.properties['CATEGORY']?.select?.name || '',
        'SIZE': item.properties['SIZE']?.select?.name || '',
        'SERVES:': item.properties['SERVES:']?.select?.name || '',
        'DESCRIPTION': item.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
        'Image URL': item.properties['Image URL']?.url || '',
        'AMOUNT': amountValue,
        'Item Type': rawItemType || cleanName,
        'ADD-ONS': item.properties['ADD-ONS']?.relation || [],
      };
    });

    // Attach add-ons
    menuItems = menuItems.map((item) => {
      const itemAddOns = [];
      const category = (item['CATEGORY'] || '').toUpperCase().trim();
      for (const [name, data] of Object.entries(addonsData)) {
        if (data.categories && data.categories.includes(category)) {
          itemAddOns.push({
            id: `addon-${name.replace(/\s/g, '-')}`,
            name: name,
            price: data.cost,
            description: data.description,
            heatLevel: data.heatLevel,
            countable: data.countable,
          });
        }
      }
      return { ...item, addOns: itemAddOns };
    });

    // TACO TUESDAY
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const dayOfWeek = pacificTime.getDay();
    const hours = pacificTime.getHours();
    const isTacoTuesday = (dayOfWeek === 2 && hours >= 0) || (dayOfWeek === 3 && hours < 1);

    let responseItems = menuItems;
    if (isTacoTuesday) {
      responseItems = menuItems.map(item => {
        const itemType = item['Item Type'] || '';
        if (itemType.toLowerCase().includes('taco') && item['Price'] > 0) {
          return {
            ...item,
            'Price': Number((item['Price'] * 0.5).toFixed(2)),
            isDiscounted: true,
            originalPrice: item['Price'],
          };
        }
        return item;
      });
    }

    // ✅ SORTING – Category → Item Type → SERVES: → Item Name
    responseItems.sort((a, b) => {
      const catA = (a['CATEGORY'] || '').trim();
      const catB = (b['CATEGORY'] || '').trim();
      const orderA = categoryOrder[catA] ?? 99;
      const orderB = categoryOrder[catB] ?? 99;
      if (orderA !== orderB) return orderA - orderB;

      const typeA = (a['Item Type'] || '').trim();
      const typeB = (b['Item Type'] || '').trim();
      if (typeA !== typeB) return typeA.localeCompare(typeB);

      const rankA = getServesRank(a['SERVES:']);
      const rankB = getServesRank(b['SERVES:']);
      if (rankA !== rankB) return rankA - rankB;

      const nameA = (a['Item Name'] || '').trim();
      const nameB = (b['Item Name'] || '').trim();
      return nameA.localeCompare(nameB);
    });

    return NextResponse.json(responseItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}