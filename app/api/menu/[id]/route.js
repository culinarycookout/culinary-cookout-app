import { NextResponse } from 'next/server';

// Helper to add hyphens to raw 32-character Notion IDs if they are missing
function formatNotionId(id) {
  const cleanId = id.replace(/-/g, '');
  if (cleanId.length !== 32) return id;
  return `${cleanId.slice(0, 8)}-${cleanId.slice(8, 12)}-${cleanId.slice(12, 16)}-${cleanId.slice(16, 20)}-${cleanId.slice(20)}`;
}

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const rawId = resolvedParams.id;
    const id = formatNotionId(rawId);

    // 1. Fetch the specific menu item
    const itemResponse = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });

    if (!itemResponse.ok) {
      throw new Error(`Notion API error: ${itemResponse.status}`);
    }

    const itemData = await itemResponse.json();

    // 2. Extract the add-on relation IDs
    const addOnsRelation = itemData.properties['ADD-ONS']?.relation || [];
    const addOnIds = addOnsRelation.map((rel) => rel.id);

    // 3. Fetch each add-on's details
    const addOns = [];
    for (const addOnId of addOnIds) {
      const formattedAddOnId = formatNotionId(addOnId);
      const addOnResponse = await fetch(`https://api.notion.com/v1/pages/${formattedAddOnId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      });

      if (addOnResponse.ok) {
        const addOnData = await addOnResponse.json();
        addOns.push({
          id: addOnData.id,
          name: addOnData.properties['Add-On']?.title?.[0]?.plain_text || 'Add-on',
          price: addOnData.properties['Price']?.number || 0,
          description: addOnData.properties['Description']?.rich_text?.[0]?.plain_text || '',
          category: addOnData.properties['Type']?.select?.name || '',
        });
      }
    }

    // 4. Build the response
    const menuItem = {
      id: itemData.id,
      name: itemData.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled',
      price: itemData.properties['Price']?.number || 0,
      category: itemData.properties['CATEGORY']?.select?.name || '',
      size: itemData.properties['SIZE']?.select?.name || '',
      serves: itemData.properties['SERVES:']?.select?.name || '',
      description: itemData.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
      imageUrl: itemData.properties['Image URL']?.url || '',
      addOns: addOns,
    };

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}