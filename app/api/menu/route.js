import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Fetch all menu items from Notion
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

    // 2. Process each menu item and fetch related add-ons
    let menuItems = await Promise.all(
      data.results.map(async (item) => {
        // Base properties (these match your existing mapping)
        const baseItem = {
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
          addOns: [], // will be filled with related add-on objects
        };

        // --- RELATION HANDLING FOR ADD-ONS ---
        // ⚠️ IMPORTANT: The relation column name in your database is "ADD-ONS"
        // If your column is named differently, change this line accordingly.
        const relationProp = item.properties['ADD-ONS'];

        if (relationProp && relationProp.type === 'relation' && relationProp.relation.length > 0) {
          // Fetch each related add-on page
          const addOnPromises = relationProp.relation.map(async (rel) => {
            try {
              const addOnResponse = await fetch(`https://api.notion.com/v1/pages/${rel.id}`, {
                headers: {
                  'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
                  'Notion-Version': '2022-06-28',
                },
              });
              if (!addOnResponse.ok) return null;
              const addOnData = await addOnResponse.json();

              // ⚠️ Map properties from your add-on database.
              // These field names must match your actual add-on database schema.
              return {
                id: addOnData.id,
                name: addOnData.properties['Name']?.title?.[0]?.plain_text || 'Unnamed Add-on',
                price: addOnData.properties['Price']?.number || 0,
                // If you have a "Size" select field that indicates which size this add-on belongs to:
                size: addOnData.properties['Size']?.select?.name || '',
                // Optional description
                description: addOnData.properties['Description']?.rich_text?.[0]?.plain_text || '',
              };
            } catch (error) {
              console.error(`Error fetching add-on ${rel.id}:`, error);
              return null;
            }
          });

          const addOns = (await Promise.all(addOnPromises)).filter(Boolean);
          baseItem.addOns = addOns;
        }

        return baseItem;
      })
    );

    // 3. Apply your original sorting logic (BEVERAGES last, then alphabetical)
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