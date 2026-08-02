import { NextResponse } from 'next/server';

export async function GET() {
  const databaseId = process.env.NOTION_MENU_DATABASE_ID;
  const apiKey = process.env.NOTION_ACCESS_TOKEN;

  if (!databaseId || !apiKey) {
    return NextResponse.json({ error: 'Missing Notion credentials' }, { status: 500 });
  }

  try {
    let allResults = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const bodyPayload = {};
      if (startCursor) {
        bodyPayload.start_cursor = startCursor;
      }

      const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return NextResponse.json({ 
          error: 'Notion API error', 
          status: response.status,
          details: errorBody 
        }, { status: response.status });
      }

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    const formattedItems = allResults.map((page) => {
      const props = page.properties;
      
      const getTitle = (p) => p?.title?.[0]?.plain_text || '';
      const getRichText = (p) => p?.rich_text?.[0]?.plain_text || '';
      const getSelect = (p) => p?.select?.name || '';
      const getNumber = (p) => p?.number ?? 0;

      const getImageUrl = (p) => {
        if (!p) return '';
        if (p.url) return p.url;
        if (p.rich_text) return p.rich_text?.[0]?.plain_text || '';
        if (p.files) return p.files?.[0]?.file?.url || p.files?.[0]?.external?.url || '';
        return '';
      };

      // ✅ CUSTOMER DISPLAY FIELDS — unchanged
      const category = getSelect(props['CATEGORY']) || getRichText(props['CATEGORY']) || '';
      const itemName = getTitle(props['ITEM NAME']) || getRichText(props['ITEM NAME']) || '';
      const description = getRichText(props['DESCRIPTION']) || '';

      // ✅ SORTING FIELDS — used only for sorting, never displayed
      const categoryNumber = getNumber(props['CATEGORY NUMBER']) || getRichText(props['CATEGORY NUMBER']) || getSelect(props['CATEGORY NUMBER']) || '';
      const sortValue = getNumber(props['SORT']) || getRichText(props['SORT']) || getSelect(props['SORT']) || '';

      return {
        id: page.id,
        'Item Name': itemName,
        'DESCRIPTION': description,
        'CATEGORY': category,              // ✅ Displayed to customer
        'CATEGORY NUMBER': categoryNumber, // ✅ Sorting only — NOT displayed
        'SORT': sortValue,                // ✅ Sorting only — NOT displayed
        'Price': getNumber(props['PRICE']),
        'Image URL': getImageUrl(props['Image URL']) || getImageUrl(props['IMAGE URL']),
        'Item Type': getSelect(props['ITEM TYPE']),
        isDiscounted: props['isDiscounted']?.checkbox || false,
      };
    });

    // ✅ SORTING: Primary by CATEGORY NUMBER, Secondary by SORT
    formattedItems.sort((a, b) => {
      // 1. Primary: CATEGORY NUMBER (numeric-aware)
      const numA = (a['CATEGORY NUMBER'] || '').toString();
      const numB = (b['CATEGORY NUMBER'] || '').toString();
      const compareNum = numA.localeCompare(numB, undefined, { numeric: true, sensitivity: 'base' });
      if (compareNum !== 0) return compareNum;

      // 2. Secondary: SORT (numeric-aware)
      const sortA = (a['SORT'] || '').toString();
      const sortB = (b['SORT'] || '').toString();
      return sortA.localeCompare(sortB, undefined, { numeric: true, sensitivity: 'base' });
    });

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}