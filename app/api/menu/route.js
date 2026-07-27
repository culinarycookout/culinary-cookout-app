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

    // 2. Process each menu item
    let menuItems = allResults.map((item) => ({
      id: item.id,
      name: item.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled',
      price: item.properties['Price']?.number || 0,
      category: item.properties['CATEGORY']?.select?.name || '',
      size: item.properties['SIZE']?.select?.name || '',
      serves: item.properties['SERVES:']?.select?.name || '',
      description: item.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
      imageUrl: item.properties['Image URL']?.url || '',
      itemType: item.properties['Item Type']?.select?.name || '',
      quantity: item.properties['QUANTITY']?.number || 0,
      addOns: [],
    }));

    // 3. Apply sorting
    menuItems.sort((a, b) => {
      const catA = (a.category || '').trim();
      const catB = (b.category || '').trim();

      if (catA === 'BEVERAGES' && catB !== 'BEVERAGES') return 1;
      if (catA !== 'BEVERAGES' && catB === 'BEVERAGES') return -1;

      if (catA !== catB) return catA.localeCompare(catB);

      const typeA = (a.itemType || '').trim();
      const typeB = (b.itemType || '').trim();
      if (typeA !== typeB) return typeA.localeCompare(typeB);

      const servesA = (a.serves || '').trim();
      const servesB = (b.serves || '').trim();
      if (servesA !== servesB) return servesA.localeCompare(servesB);

      const nameA = (a.name || '').trim();
      const nameB = (b.name || '').trim();
      return nameA.localeCompare(nameB);
    });

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}