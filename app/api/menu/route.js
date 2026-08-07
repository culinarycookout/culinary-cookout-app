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

    // Look for 'LINKED TYPES'
    const allSizeIds = new Set();
    allResults.forEach(item => {
      const relation = item.properties['LINKED TYPES']?.relation || [];
      relation.forEach(rel => {
        if (rel?.id) allSizeIds.add(rel.id);
      });
    });

    // 2. Fetch the actual details for every single related size ID in parallel
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
          size: sizeName,
          sizeName: sizeName, // ✅ Added for the cart to read the Type
          price: priceVal,
          Price: priceVal,
          amount: amountVal,
          serves: servesVal,
          description: descVal,
        };
      });
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

      const category = getSelect(props['CATEGORY']) || getRichText(props['CATEGORY']) || '';
      const itemName = getTitle(props['ITEM NAME']) || getRichText(props['ITEM NAME']) || '';
      const description = getRichText(props['DESCRIPTION']) || '';

      const categoryNumber = getNumber(props['CATEGORY NUMBER']) || getRichText(props['CATEGORY NUMBER']) || getSelect(props['CATEGORY NUMBER']) || '';
      const sortValue = getNumber(props['SORT']) || getRichText(props['SORT']) || getSelect(props['SORT']) || '';

      const relation = props['LINKED TYPES']?.relation || [];
      const sizes = relation.map(rel => sizeMap[rel.id]).filter(Boolean);

      return {
        id: page.id,
        'Item Name': itemName,
        'DESCRIPTION': description,
        'CATEGORY': category,
        'CATEGORY NUMBER': categoryNumber,
        'SORT': sortValue,
        'Price': getNumber(props['PRICE']),
        'Image URL': getImageUrl(props['Image URL']) || getImageUrl(props['IMAGE URL']),
        'Item Type': getSelect(props['ITEM TYPE']),
        isDiscounted: props['isDiscounted']?.checkbox || false,
        Sizes: sizes,
      };
    });

    // ✅ RESTORED SORTING: Maintains your exact sort order
    formattedItems.sort((a, b) => {
      const numA = (a['CATEGORY NUMBER'] || '').toString();
      const numB = (b['CATEGORY NUMBER'] || '').toString();
      const compareNum = numA.localeCompare(numB, undefined, { numeric: true, sensitivity: 'base' });
      if (compareNum !== 0) return compareNum;

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