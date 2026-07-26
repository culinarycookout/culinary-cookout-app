import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Fetch ALL items from Notion (no sorting in the query)
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_MENU_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Empty query — fetch everything
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();

    // 2. Map items to clean objects
    let menuItems = data.results.map((item) => ({
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
    }));

    // 3. Sort in JavaScript: CATEGORY → Item Type → SERVES: → Item Name
    menuItems.sort((a, b) => {
      // Category (primary sort)
      const catA = (a.category || '').trim();
      const catB = (b.category || '').trim();
      if (catA !== catB) return catA.localeCompare(catB);

      // Item Type (secondary sort)
      const typeA = (a.itemType || '').trim();
      const typeB = (b.itemType || '').trim();
      if (typeA !== typeB) return typeA.localeCompare(typeB);

      // Serves (tertiary sort)
      const servesA = (a.serves || '').trim();
      const servesB = (b.serves || '').trim();
      if (servesA !== servesB) return servesA.localeCompare(servesB);

      // Item Name (final sort)
      const nameA = (a.name || '').trim();
      const nameB = (b.name || '').trim();
      return nameA.localeCompare(nameB);
    });

    // 4. Return sorted data
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
// FORCE REDEPLOY - SORTING FIX