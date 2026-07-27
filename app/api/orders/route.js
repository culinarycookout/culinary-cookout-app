import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      whatsappNumber,
      instagramHandle,
      deliveryLocation,
      deliveryLocation2,
      specialInstructions,
      userEmail,
      items,
      subtotal,
    } = body;

    // Validate required fields
    if (!customerName || !whatsappNumber || !deliveryLocation || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: name, WhatsApp, delivery location, or items' },
        { status: 400 }
      );
    }

    // Calculate totals
    let totalQuantity = 0;
    let basePrice = 0;
    let addOnCost = 0;

    items.forEach((item) => {
      const qty = item.quantity || 1;
      totalQuantity += qty;
      const itemBase = (item.price || 0) * qty;
      basePrice += itemBase;

      if (item.addOns && item.addOns.length > 0) {
        item.addOns.forEach((addon) => {
          addOnCost += (addon.Cost || 0) * (addon.Quantity || 0) * qty;
        });
      }
    });

    // Format fields for Notion
    const itemNames = items.map((item) => `${item.name} x${item.quantity || 1}`).join(', ');

    const allAddOns = [];
    items.forEach((item) => {
      if (item.addOns && item.addOns.length > 0) {
        item.addOns.forEach((addon) => {
          allAddOns.push(`${addon.Name} x${addon.Quantity}`);
        });
      }
    });
    const addOnsText = allAddOns.length ? allAddOns.join(', ') : 'None';

    let deliveryDetails = `📍 ${deliveryLocation}`;
    if (deliveryLocation2) deliveryDetails += `\n📍 Secondary: ${deliveryLocation2}`;
    if (instagramHandle) deliveryDetails += `\n📸 Instagram: ${instagramHandle}`;
    if (whatsappNumber) deliveryDetails += `\n📱 WhatsApp: ${whatsappNumber}`;

    const orderDate = new Date().toISOString();

    // Create order in Notion
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
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
                  content: `Order: ${customerName} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                },
              },
            ],
          },
          'Client Name': {
            rich_text: [{ text: { content: customerName } }],
          },
          'User Email': {
            rich_text: [{ text: { content: userEmail || '' } }],
          },
          'Item Name': {
            rich_text: [{ text: { content: itemNames } }],
          },
          'Quantity': {
            number: totalQuantity,
          },
          'Base Price': {
            number: basePrice,
          },
          'Add-on Cost': {
            number: addOnCost,
          },
          'Grand Total': {
            number: Number(subtotal),
          },
          'Instructions': {
            rich_text: [{ text: { content: specialInstructions || '' } }],
          },
          'Order Notes': {
            rich_text: [
              {
                text: {
                  content: `WhatsApp: ${whatsappNumber}${instagramHandle ? ` | Instagram: ${instagramHandle}` : ''}`,
                },
              },
            ],
          },
          'Condiments & Add-Ons': {
            rich_text: [{ text: { content: addOnsText } }],
          },
          'Delivery Details': {
            rich_text: [{ text: { content: deliveryDetails } }],
          },
          'Order Date': {
            date: { start: orderDate },
          },
          'Cart Status': {
            select: { name: 'Placed' },
          },
          'Order Size': {
            select: {
              name: totalQuantity <= 2 ? 'Small' : totalQuantity <= 5 ? 'Medium' : 'Large',
            },
          },
        },
      }),
    });

    if (!notionResponse.ok) {
      const errorData = await notionResponse.json();
      console.error('Notion API error:', errorData);
      throw new Error(`Notion returned ${notionResponse.status}`);
    }

    const responseData = await notionResponse.json();

    return NextResponse.json({
      success: true,
      orderId: responseData.id,
      message: 'Order placed successfully!',
    });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit order. Please try again.' },
      { status: 500 }
    );
  }
}