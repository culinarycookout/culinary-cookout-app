import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_MENU_DATABASE_ID,
    });

    const menuItems = await Promise.all(
      response.results.map(async (page) => {
        const props = page.properties;

        // ✅ Pulls the relations directly from your 'Sizes Menu' column
        const sizeRelations = props['Sizes Menu']?.relation || [];
        
        const sizes = await Promise.all(
          sizeRelations.map(async (rel) => {
            const sizePage = await notion.pages.retrieve({ page_id: rel.id });
            const sProps = sizePage.properties;
            return {
              id: sizePage.id,
              size: sProps['Size']?.select?.name || sProps['Name']?.title?.[0]?.plain_text || 'Standard',
              price: sProps['Number']?.number ?? sProps['Price']?.number ?? 0,
              serves: sProps['Serves']?.select?.name || '',
              amount: sProps['Amount']?.rich_text?.[0]?.plain_text || '',
              description: sProps['Description']?.rich_text?.[0]?.plain_text || '',
            };
          })
        );

        // Sort sizes by price
        sizes.sort((a, b) => a.price - b.price);

        // Base price from 'Number' or 'Price'
        let basePrice = props['Number']?.number ?? props['Price']?.number ?? 0;

        // Fallback to first size price if base is 0
        if ((!basePrice || basePrice === 0) && sizes.length > 0) {
          basePrice = sizes[0].price;
        }

        return {
          id: page.id,
          'Item Name': props['Item Name']?.title?.[0]?.plain_text || '',
          'CATEGORY': props['CATEGORY']?.select?.name || '',
          'DESCRIPTION': props['DESCRIPTION']?.rich_text?.[0]?.plain_text || '',
          'Price': basePrice,
          'Image URL': props['Image URL']?.url || '',
          'Item Type': props['Item Type']?.select?.name || '',
          'ADD-ONS': props['ADD-ONS']?.relation || [],
          Sizes: sizes,
        };
      })
    );

    // ✅ TACO TUESDAY DISCOUNT (your existing logic)
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

    return Response.json(responseItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return Response.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}