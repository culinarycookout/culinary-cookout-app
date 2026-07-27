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

    // 2. Process each menu item
    let menuItems = await Promise.all(
      data.results.map(async (item) => {
        // Base properties
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
          addOns: [],
        };

        // 3. Fetch ALL add-ons from the add-ons database
        try {
          const addOnsResponse = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_ADDONS_DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
              'Notion-Version': '2022-06-28',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });

          if (addOnsResponse.ok) {
            const addOnsData = await addOnsResponse.json();
            
            // Filter add-ons that are linked to this item via "Linked Dishes" relation
            const linkedAddOns = addOnsData.results.filter((addOn) => {
              const linkedDishes = addOn.properties['Linked Dishes'];
              if (linkedDishes && linkedDishes.type === 'relation') {
                return linkedDishes.relation.some((rel) => rel.id === item.id);
              }
              return false;
            });

            // Map the linked add-ons using EXACT column names from your screenshots
            baseItem.addOns = linkedAddOns.map((addOn) => ({
              id: addOn.id,
              name: addOn.properties['Add-On']?.title?.[0]?.plain_text || 'Unnamed Add-on',
              price: addOn.properties['Price']?.number || 0,
              description: addOn.properties['Description']?.rich_text?.[0]?.plain_text || '',
              heatLevel: addOn.properties['Heat Level']?.select?.name || '',
            }));
          }
        } catch (error) {
          console.error('Error fetching add-ons:', error);
        }

        return baseItem;
      })
    );

    // 4. Apply sorting
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