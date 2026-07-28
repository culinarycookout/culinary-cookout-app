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
  // ... (your full addonsData, same as before)
};

export async function GET() {
  try {
    let allResults = [];
    let hasMore = true;
    let startCursor = undefined;

    // 1. Fetch ALL menu items with pagination
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

    // 2. Process menu items with EXACT Notion field names
    let menuItems = allResults.map((item) => {
      const name = item.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled';
      const rawItemType = item.properties['Item Type']?.select?.name || '';

      const cleanName = name
        .replace(/\b(SMALL|MEDIUM|LARGE|GROUP|JR\.?)\b/gi, '')
        .replace(/\s*[\(\[].*?[\)\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        id: item.id,
        'Item Name': name,
        'Price': item.properties['Price']?.number || 0,
        'CATEGORY': item.properties['CATEGORY']?.select?.name || '',
        'SIZE': item.properties['SIZE']?.select?.name || '',
        'SERVES:': item.properties['SERVES:']?.select?.name || '',
        'DESCRIPTION': item.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
        'Image URL': item.properties['Image URL']?.url || '',
        'QUANTITY': item.properties['QUANTITY']?.number || 0, // ✅ Exact field name
        'Item Type': rawItemType || cleanName,
        'ADD-ONS': item.properties['ADD-ONS']?.relation || [],
      };
    });

    // 3. Attach add-ons (if needed)
    // ... (same as before)

    // 4. TACO TUESDAY
    // ... (same as before)

    // 5. SORTING
    // ... (same as before)

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}