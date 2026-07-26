import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_MENU_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();

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

    // Sort: beverages last, everything else alphabetical by category
    menuItems.sort((a, b) => {
      const catA = (a.category || '').trim();
      const catB = (b.category || '').trim();

      // If one is BEVERAGES, push it to the bottom
      if (catA === 'BEVERAGES' && catB !== 'BEVERAGES') return 1;
      if (catA !== 'BEVERAGES' && catB === 'BEVERAGES') return -1;

      // Otherwise sort alphabetically by category
      if (catA !== catB) return catA.localeCompare(catB);

      // Then by item type
      const typeA = (a.itemType || '').trim();
      const typeB = (b.itemType || '').trim();
      if (typeA !== typeB) return typeA.localeCompare(typeB);

      // Then by serves
      const servesA = (a.serves || '').trim();
      const servesB = (b.serves || '').trim();
      if (servesA !== servesB) return servesA.localeCompare(servesB);

      // Finally by item name
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