import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  // ⚠️ CHANGE THIS TO THE ID OF YOUR NEW "FUN" DATABASE
  const databaseId = 'YOUR_FUN_DATABASE_ID_HERE'; 

  if (!databaseId || !apiKey) {
    return NextResponse.json({ error: 'Missing Notion credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return NextResponse.json({ error: 'Notion API error' }, { status: response.status });
    const data = await response.json();

    const formattedItems = data.results.map((page) => {
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

      return {
        id: page.id,
        'Item Name': getTitle(props['Poison']) || getRichText(props['Poison']) || '',
        'DESCRIPTION': getRichText(props['Description']) || '',
        'CATEGORY': getSelect(props['Category']) || getRichText(props['Category']) || '',
        'Image URL': getImageUrl(props['Image URL']) || getImageUrl(props['IMAGE URL']),
        'Price': getNumber(props['Price']),
      };
    });

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Error fetching fun menu:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}