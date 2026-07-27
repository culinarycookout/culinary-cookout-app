import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      customerName, 
      whatsappNumber, 
      instagramHandle, 
      deliveryLocation1, 
      deliveryLocation2, 
      specialInstructions, 
      items, 
      subtotal 
    } = body;

    if (!customerName || !whatsappNumber || !deliveryLocation1 || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 });
    }

    // Format items summary
    const itemsSummary = items.map(item => {
      const addOnsText = item.selectedAddOns && item.selectedAddOns.length > 0 
        ? ` (Add-ons: ${item.selectedAddOns.map(ao => ao.name).join(', ')})` 
        : '';
      const itemTotal = (item.price + (item.selectedAddOns || []).reduce((s, ao) => s + ao.price, 0)) * item.quantity;
      return `${item.quantity}x ${item.name}${addOnsText} - $${itemTotal.toFixed(2)}`;
    }).join('\n');

    const orderTitle = `Order: ${customerName} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    // Build delivery info
    let deliveryInfo = `📍 Primary: ${deliveryLocation1}`;
    if (deliveryLocation2) {
      deliveryInfo += `\n📍 Secondary: ${deliveryLocation2}`;
    }
    if (instagramHandle) {
      deliveryInfo += `\n📸 Instagram: ${instagramHandle}`;
    }
    if (specialInstructions) {
      deliveryInfo += `\n📝 Notes: ${specialInstructions}`;
    }

    // Create page in Notion Orders Database
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_ORDERS_DATABASE_ID },
        properties: {
          'Order': {
            title: [
              {
                text: {
                  content: orderTitle,
                },
              },
            ],
          },
          'Client Name': {
            rich_text: [
              {
                text: {
                  content: customerName,
                },
              },
            ],
          },
          'WhatsApp Number': {
            rich_text: [
              {
                text: {
                  content: whatsappNumber,
                },
              },
            ],
          },
          'Instagram Handle': {
            rich_text: [
              {
                text: {
                  content: instagramHandle || '',
                },
              },
            ],
          },
          'Delivery Location': {
            rich_text: [
              {
                text: {
                  content: deliveryInfo,
                },
              },
            ],
          },
          'Total': {
            number: Number(subtotal),
          },
          'Items': {
            rich_text: [
              {
                text: {
                  content: itemsSummary,
                },
              },
            ],
          },
        },
      }),
    });

    if (!notionResponse.ok) {
      const errorData = await notionResponse.json();
      console.error('Notion API Error:', errorData);
      throw new Error(`Failed to create order in Notion: ${notionResponse.status}`);
    }

    const responseData = await notionResponse.json();

    return NextResponse.json({ success: true, orderId: responseData.id });
  } catch (error) {
    console.error('Error submitting order:', error);
    return NextResponse.json({ error: 'Failed to submit order' }, { status: 500 });
  }
}