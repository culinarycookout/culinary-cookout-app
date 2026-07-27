import { NextResponse } from 'next/server';

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

    // 2. Process each menu item (includes itemType for sorting and discount)
    let menuItems = allResults.map((item) => ({
      id: item.id,
      name: item.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled',
      price: item.properties['Price']?.number || 0,
      category: item.properties['CATEGORY']?.select?.name || '',
      size: item.properties['SIZE']?.select?.name || '',
      serves: item.properties['SERVES:']?.select?.name || '',
      description: item.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
      imageUrl: item.properties['Image URL']?.url || '',
      quantity: item.properties['QUANTITY']?.number || 0,
      itemType: item.properties['Item Type']?.select?.name || '',
      addOns: [],
    }));

    // 3. SORTING: Category → Item Type → SERVES → Name
    menuItems.sort((a, b) => {
      const catA = (a.category || '').trim();
      const catB = (b.category || '').trim();

      // BEVERAGES last
      if (catA === 'BEVERAGES' && catB !== 'BEVERAGES') return 1;
      if (catA !== 'BEVERAGES' && catB === 'BEVERAGES') return -1;

      // 1. Sort by CATEGORY
      if (catA !== catB) return catA.localeCompare(catB);

      // 2. Sort by ITEM TYPE (groups like items together)
      const typeA = (a.itemType || '').trim();
      const typeB = (b.itemType || '').trim();
      if (typeA !== typeB) return typeA.localeCompare(typeB);

      // 3. Sort by SERVES:
      const servesA = (a.serves || '').trim();
      const servesB = (b.serves || '').trim();
      if (servesA !== servesB) return servesA.localeCompare(servesB);

      // 4. Sort by NAME (within same Item Type and SERVES)
      const nameA = (a.name || '').trim();
      const nameB = (b.name || '').trim();
      return nameA.localeCompare(nameB);
    });

    // 4. TACO TUESDAY - Automatic 50% off (Tuesday 12:00 AM → Wednesday 1:00 AM)
    const now = new Date();
    // Convert to EST
    const estOffset = -5 * 60;
    const estTime = new Date(now.getTime() + (estOffset - now.getTimezoneOffset()) * 60000);
    const dayOfWeek = estTime.getDay(); // 0=Sunday, 1=Monday, 2=Tuesday
    const hours = estTime.getHours();

    // Tuesday 12:00 AM (hour 0) through Wednesday 1:00 AM (hour 1)
    // Tuesday: dayOfWeek === 2, hours >= 0
    // Wednesday: dayOfWeek === 3, hours < 1 (0:00 - 0:59)
    const isTuesday = dayOfWeek === 2 && hours >= 0;
    const isWednesdayEarly = dayOfWeek === 3 && hours < 1;
    const isTacoTuesday = isTuesday || isWednesdayEarly;

    let responseItems = menuItems;

    if (isTacoTuesday) {
      responseItems = menuItems.map(item => {
        // Apply 50% off to all items with Item Type "Taco" AND price > 0
        if (item.itemType === 'Taco' && item.price > 0) {
          return {
            ...item,
            price: Number((item.price * 0.5).toFixed(2)), // 50% off, rounded to 2 decimals
            isDiscounted: true,
            originalPrice: item.price
          };
        }
        return item;
      });
    }

    // 5. Remove itemType from response (hidden from app)
    const cleanedMenuItems = responseItems.map(({ itemType, ...rest }) => rest);

    return NextResponse.json(cleanedMenuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}