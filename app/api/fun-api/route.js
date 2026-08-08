import { NextResponse } from 'next/server';

export async function GET() {
  // Let's see what keys Next.js actually registered in process.env
  console.log('🔍 ALL NOTION KEYS LOADED BY NEXT.JS:', Object.keys(process.env).filter(k => k.includes('NOTION')));

  const apiKey = process.env.NOTION_ACCESS_TOKEN;
  const databaseId = process.env.NOTION_FUN_DATABASE_ID;

  console.log('🔍 DIRECT CHECK - databaseId:', databaseId);

  if (!databaseId || !apiKey) {
    console.error('❌ Missing Fun Notion credentials in route.js!');
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

    const data = await response.json();

    if (!response.ok) {
      console.error('🚨 NOTION API REJECTED IT:', data);
      return NextResponse.json({ error: data.message || 'Notion API error' }, { status: response.status });
    }

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
        'Item Name': getTitle(props['Poison']) || '',
        'Quantity': getSelect(props['Quantity']) || '',
        'Time': getSelect(props['Time']) || getRichText(props['Time']) || '',
        'Price': getNumber(props['Price']),
        'DESCRIPTION': getRichText(props['Description']) || '',
        'Image URL': getImageUrl(props['Image URL']) || '',
      };
    });

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Error fetching fun menu:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}