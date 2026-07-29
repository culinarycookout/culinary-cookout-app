import { NextResponse } from 'next/server';

function getSizesRelation(item) {
  const possibleNames = ['Sizes', 'Size Options', 'Sizes Menu', 'Linked Sizes', 'Size Variants'];
  for (const name of possibleNames) {
    if (item.properties[name] && item.properties[name].relation) {
      return item.properties[name].relation;
    }
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

      if (!response.ok) {
        throw new Error(`Notion API error: ${response.status}`);
      }

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    let menuItems = await Promise.all(allResults.map(async (item) => {
      const name = item.properties['Item Name']?.title?.[0]?.plain_text || 'Untitled';
      const rawItemType = item.properties['Item Type']?.select?.name || '';

      const cleanName = name
        .replace(/\b(SMALL|MEDIUM|LARGE|GROUP|JR\.?)\b/gi, '')
        .replace(/\s*[\(\[].*?[\)\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      // ✅ FIXED: Look for 'Number' first, then 'Price'
      let basePrice = item.properties['Number']?.number ?? item.properties['Price']?.number ?? 0;

      const sizesRelation = getSizesRelation(item);
      const sizes = [];

      for (const relation of sizesRelation) {
        try {
          const sizeResponse = await fetch(`https://api.notion.com/v1/pages/${relation.id}`, {
            headers: {
              'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
              'Notion-Version': '2022-06-28',
              'Content-Type': 'application/json',
            },
          });

          if (sizeResponse.ok) {
            const sizeData = await sizeResponse.json();
            
            const sizeName = 
              sizeData.properties['Size']?.select?.name ||
              sizeData.properties['Name']?.select?.name ||
              'Standard';
              
            const price = sizeData.properties['Number']?.number ?? sizeData.properties['Price']?.number ?? 0;
            const serves = sizeData.properties['Serves']?.select?.name || '';
            const amount = sizeData.properties['Amount']?.rich_text?.[0]?.plain_text || '';
            const description = sizeData.properties['Description']?.rich_text?.[0]?.plain_text || '';
            const category = sizeData.properties['Category']?.select?.name || '';

            sizes.push({
              id: sizeData.id,
              size: sizeName,
              price: price,
              serves: serves,
              amount: amount,
              description: description,
              category: category,
            });
          }
        } catch (err) {
          console.error('Error fetching size:', err);
        }
      }

      sizes.sort((a, b) => a.price - b.price);

      if ((!basePrice || basePrice === 0) && sizes.length > 0) {
        basePrice = sizes[0].price;
      }

      const description = 
        item.properties['Description']?.rich_text?.[0]?.plain_text ||
        item.properties['DESCRIPTION']?.rich_text?.[0]?.plain_text ||
        '';

      return {
        id: item.id,
        'Item Name': name,
        'CATEGORY': item.properties['CATEGORY']?.select?.name || '',
        'DESCRIPTION': description,
        'Image URL': item.properties['Image URL']?.url || '',
        'Item Type': rawItemType || cleanName,
        'ADD-ONS': item.properties['ADD-ONS']?.relation || [],
        'Price': basePrice,
        'Sizes': sizes,
      };
    }));

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