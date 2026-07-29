import { NextResponse } from 'next/server';

function getRelationIds(properties, possibleNames) {
  for (const name of possibleNames) {
    const rel = properties[name]?.relation;
    if (rel && Array.isArray(rel)) return rel.map(r => r.id);
  }
  return [];
}

export async function GET() {
  try {
    let allResults = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const requestBody = {
        sorts: [
          { property: "CATEGORY", direction: "ascending" },
          { property: "Item Name", direction: "ascending" }
        ]
      };
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

      if (!response.ok) throw new Error(`Notion API error: ${response.status}`);

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    // 1. Collect all size and add-on relation IDs
    const sizeIdSet = new Set();
    const addonIdSet = new Set();

    allResults.forEach(item => {
      const props = item.properties;

      // Sizes relation – try 'Sizes Menu', 'Sizes', etc.
      const sizeIds = getRelationIds(props, ['Sizes Menu', 'Sizes', 'Size Options', 'Linked Sizes']);
      sizeIds.forEach(id => sizeIdSet.add(id));

      // Add-ons relation – try 'ADD-ONS', 'Add-ons', etc.
      const addonIds = getRelationIds(props, ['ADD-ONS', 'Add-ons', 'Add Ons']);
      addonIds.forEach(id => addonIdSet.add(id));
    });

    // 2. Fetch all size pages in parallel
    const sizePages = await Promise.all(
      Array.from(sizeIdSet).map(async (id) => {
        try {
          const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
            headers: {
              'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
              'Notion-Version': '2022-06-28',
              'Content-Type': 'application/json',
            },
          });
          if (res.ok) return await res.json();
        } catch (e) { console.error(`Size fetch error for ${id}:`, e); }
        return null;
      })
    );

    const sizesCache = {};
    sizePages.forEach(page => {
      if (!page) return;
      const props = page.properties;
      sizesCache[page.id] = {
        id: page.id,
        size: props['Size']?.select?.name || props['Name']?.title?.[0]?.plain_text || 'Standard',
        price: props['Number']?.number ?? props['Price']?.number ?? 0,
        serves: props['Serves']?.select?.name || '',
        amount: props['Amount']?.rich_text?.[0]?.plain_text || '',
        description: props['Description']?.rich_text?.[0]?.plain_text || '',
        category: props['Category']?.select?.name || '',
      };
    });

    // 3. Map menu items, attaching sizes and add-ons correctly
    const menuItems = allResults.map((item) => {
      const props = item.properties;
      const name = props['Item Name']?.title?.[0]?.plain_text || 'Untitled';
      const rawItemType = props['Item Type']?.select?.name || '';

      // Get size IDs from the relation
      const sizeIds = getRelationIds(props, ['Sizes Menu', 'Sizes', 'Size Options', 'Linked Sizes']);
      const sizes = sizeIds.map(id => sizesCache[id]).filter(Boolean);
      sizes.sort((a, b) => a.price - b.price);

      // Base price
      let basePrice = props['Number']?.number ?? props['Price']?.number ?? 0;
      if ((!basePrice || basePrice === 0) && sizes.length > 0) {
        basePrice = sizes[0].price;
      }

      // Add‑on IDs (we'll keep them as IDs – the frontend can fetch them if needed)
      const addonIds = getRelationIds(props, ['ADD-ONS', 'Add-ons', 'Add Ons']);

      return {
        id: item.id,
        'Item Name': name,
        'CATEGORY': props['CATEGORY']?.select?.name || '',
        'DESCRIPTION': props['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
        'Image URL': props['Image URL']?.url || '',
        'Item Type': rawItemType || '',
        'Price': basePrice,
        'Sizes': sizes,        // ✅ Now correctly populated
        'ADD-ONS': addonIds,   // Separate field
      };
    });

    // Taco Tuesday (unchanged)
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const dayOfWeek = pacificTime.getDay();
    const hours = pacificTime.getHours();
    const isTacoTuesday = (dayOfWeek === 2 && hours >= 0) || (dayOfWeek === 3 && hours < 1);

    let responseItems = menuItems;
    if (isTacoTuesday) {
      responseItems = menuItems.map(item => {
        const itemType = item['Item Type'] || '';
        if (itemType.toLowerCase().includes('taco')) {
          const discountedSizes = (item.Sizes || []).map(size => ({
            ...size,
            price: Number((size.price * 0.5).toFixed(2)),
            originalPrice: size.price,
            isDiscounted: true,
          }));
          return {
            ...item,
            Sizes: discountedSizes,
            Price: Number((item.Price * 0.5).toFixed(2)),
            isDiscounted: true,
            originalPrice: item.Price,
          };
        }
        return item;
      });
    }

    return NextResponse.json(responseItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}