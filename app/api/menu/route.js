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
      if (startCursor) bodyPayload.start_cursor = startCursor;

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
        return NextResponse.json({ error: 'Notion API error' }, { status: response.status });
      }

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    // 1. Gather all Size IDs from the relation
    const allSizeIds = new Set();
    allResults.forEach(item => {
      const relation = item.properties['Sizes']?.relation || [];
      relation.forEach(rel => {
        if (rel?.id) allSizeIds.add(rel.id);
      });
    });

    // 2. Fetch the exact data for those sizes
    const sizeMap = {};
    if (allSizeIds.size > 0) {
      const sizePromises = Array.from(allSizeIds).map(async (id) => {
        try {
          const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Notion-Version': '2022-06-28',
            },
          });
          if (!res.ok) return null;
          return await res.json();
        } catch {
          return null;
        }
      });

      const sizePages = await Promise.all(sizePromises);
      sizePages.forEach(page => {
        if (!page || !page.properties) return;
        const p = page.properties;

        const getTitle = (prop) => prop?.title?.[0]?.plain_text || '';
        const getRichText = (prop) => prop?.rich_text?.[0]?.plain_text || '';
        const getSelect = (prop) => prop?.select?.name || '';
        const getNumber = (prop) => prop?.number ?? 0;

        const sizeName = getSelect(p['Size']) || getTitle(p['Size']) || getRichText(p['Size']) || getTitle(p['Name']) || getRichText(p['Name']) || 'Standard';
        const priceVal = getNumber(p['PRICE']) || getNumber(p['Price']) || 0;
        const amountVal = getNumber(p['Amount']) || getRichText(p['Amount']) || getSelect(p['Amount']) || '';
        const servesVal = getRichText(p['Serves']) || getSelect(p['Serves']) || '';
        const descVal = getRichText(p['Description']) || '';

        sizeMap[page.id] = {
          id: page.id,
          size: sizeName, // ✅ Grabbing the 'Size' column
          Price: priceVal,
          amount: amountVal,
          serves: servesVal,
          description: descVal,
        };
      });
    }

    // 3. Build the final payload
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

      const relation = props['Sizes']?.relation || [];
      const sizes = relation.map(rel => sizeMap[rel.id]).filter(Boolean);

      return {
        id: page.id,
        'Item Name': getTitle(props['ITEM NAME']) || getRichText(props['ITEM NAME']) || '',
        'DESCRIPTION': getRichText(props['DESCRIPTION']) || '',
        'CATEGORY': getSelect(props['CATEGORY']) || getRichText(props['CATEGORY']) || '',
        'Image URL': getImageUrl(props['Image URL']) || getImageUrl(props['IMAGE URL']),
        Sizes: sizes,
        Price: getNumber(props['PRICE']) // Safety fallback
      };
    });

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}