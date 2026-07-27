import { NextResponse } from 'next/server';

// ✅ CORRECT CATEGORY ORDER - Sandwiches BEFORE Burgers
const categoryOrder = {
  'BREAKFAST': 0,
  'SANDWICHES': 1,
  'BURGERS': 2,
  'FRIED SIDES': 3,
  'BIRDS': 4,
  'SEAFOOD': 5,
  'BEEF': 6,
  'LATIN AMERICA': 7,
  'ASIAN': 8,
  'GRILLED': 9,
  'SOUPS & STEWS': 10,
  'SMOKED (24-Hour Notice)': 11,
  'BEVERAGES': 12,
};

// ✅ SERVES ORDER - Small to Large
const servesOrder = {
  '1 Person': 0,
  '1-2 People': 1,
  '2 People': 2,
  '2-3 People': 3,
  '3-4 People': 4,
  '4 People': 5,
  '4-6 People': 6,
  '6-8 People': 7,
  '8-10 People': 8,
};

// ✅ Helper to get serves rank with fallback
const getServesRank = (serves) => {
  const key = (serves || '').trim();
  return servesOrder[key] ?? 99;
};

export async function GET() {
  try {
    let allResults = [];
    let hasMore = true;
    let startCursor = undefined;

    // 1. Fetch ALL menu items with pagination
    while (hasMore) {
      const requestBody = {};
      if (startCursor) {
        requestBody.start_cursor = startCursor;
      }

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

    // 2. Process each menu item with smart itemType fallback
    let menuItems = allResults.map((item) => {
      const name = item.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled';
      const rawItemType = item.properties['Item Type']?.select?.name || '';
      
      // SMART FALLBACK: If Notion Item Type is blank, derive from name (strips size descriptors)
      const derivedItemType = rawItemType || name
        .replace(/\b(SMALL|MEDIUM|LARGE|JR\.?)\b/gi, '')
        .replace(/\s*[\(\[].*?[\)\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        id: item.id,
        name: name,
        price: item.properties['Price']?.number || 0,
        category: item.properties['CATEGORY']?.select?.name || '',
        size: item.properties['SIZE']?.select?.name || '',
        serves: item.properties['SERVES:']?.select?.name || '',
        description: item.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
        imageUrl: item.properties['Image URL']?.url || '',
        quantity: item.properties['QUANTITY']?.number || 0,
        itemType: derivedItemType,
        addOns: [],
      };
    });

    // 3. Fetch ALL add-ons from the add-ons database
    try {
      let allAddOns = [];
      let addOnsHasMore = true;
      let addOnsStartCursor = undefined;

      while (addOnsHasMore) {
        const requestBody = {};
        if (addOnsStartCursor) {
          requestBody.start_cursor = addOnsStartCursor;
        }

        const addOnsResponse = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_ADDONS_DATABASE_ID}/query`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (addOnsResponse.ok) {
          const addOnsData = await addOnsResponse.json();
          allAddOns = [...allAddOns, ...addOnsData.results];
          addOnsHasMore = addOnsData.has_more;
          addOnsStartCursor = addOnsData.next_cursor;
        } else {
          break;
        }
      }

      // 4. Map add-ons with their linked dishes
      const parsedAddOns = allAddOns.map((addOn) => {
        const linkedDishes = addOn.properties['Linked Dishes'];
        const linkedDishIds = linkedDishes && linkedDishes.type === 'relation' 
          ? linkedDishes.relation.map(rel => rel.id) 
          : [];

        return {
          id: addOn.id,
          name: addOn.properties['Add-On']?.title?.[0]?.plain_text || 'Unnamed Add-on',
          price: addOn.properties['Price']?.number || 0,
          description: addOn.properties['Description']?.rich_text?.[0]?.plain_text || '',
          heatLevel: addOn.properties['Heat Level']?.select?.name || '',
          linkedDishIds: linkedDishIds,
        };
      });

      // 5. Attach add-ons to each menu item based on Linked Dishes
      menuItems = menuItems.map((item) => {
        const itemAddOns = parsedAddOns.filter((addOn) => 
          addOn.linkedDishIds.includes(item.id)
        );
        
        return {
          ...item,
          addOns: itemAddOns.map(({ linkedDishIds, ...addOn }) => addOn),
        };
      });

    } catch (addOnError) {
      console.error('Error fetching add-ons:', addOnError);
    }

    // 6. TACO TUESDAY - Automatic 50% off (Tuesday 12:00 AM → Wednesday 1:00 AM)
    const now = new Date();
    const estOffset = -5 * 60;
    const estTime = new Date(now.getTime() + (estOffset - now.getTimezoneOffset()) * 60000);
    const dayOfWeek = estTime.getDay();
    const hours = estTime.getHours();

    const isTuesday = dayOfWeek === 2 && hours >= 0;
    const isWednesdayEarly = dayOfWeek === 3 && hours < 1;
    const isTacoTuesday = isTuesday || isWednesdayEarly;

    let responseItems = menuItems;

    if (isTacoTuesday) {
      responseItems = menuItems.map(item => {
        if (item.itemType.toLowerCase().includes('taco') && item.price > 0) {
          return {
            ...item,
            price: Number((item.price * 0.5).toFixed(2)),
            isDiscounted: true,
            originalPrice: item.price
          };
        }
        return item;
      });
    }

    // 7. SORTING: Category → Item Type → SERVES → Name
    responseItems.sort((a, b) => {
      const catA = (a.category || '').trim();
      const catB = (b.category || '').trim();

      // 1. Sort by CATEGORY using custom order
      const orderA = categoryOrder[catA] ?? 99;
      const orderB = categoryOrder[catB] ?? 99;
      if (orderA !== orderB) return orderA - orderB;

      // 2. Sort by ITEM TYPE (groups like items together)
      const typeA = (a.itemType || '').trim();
      const typeB = (b.itemType || '').trim();
      if (typeA !== typeB) return typeA.localeCompare(typeB);

      // 3. Sort by SERVES using custom order (Small → Medium → Large)
      const serveOrderA = getServesRank(a.serves);
      const serveOrderB = getServesRank(b.serves);
      if (serveOrderA !== serveOrderB) return serveOrderA - serveOrderB;

      // 4. Sort by NAME (alphabetical within same SERVES)
      const nameA = (a.name || '').trim();
      const nameB = (b.name || '').trim();
      return nameA.localeCompare(nameB);
    });

    // 8. Remove itemType from response (hidden from app)
    const cleanedMenuItems = responseItems.map(({ itemType, ...rest }) => rest);

    return NextResponse.json(cleanedMenuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}