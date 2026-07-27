'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DeliveryDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderData, setOrderData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    deliveryLocation: '',
    deliveryLocation2: '',
    instagram: '',
    email: '',
    specialInstructions: '',
  });

  useEffect(() => {
    const itemsParam = searchParams.get('items');
    const totalParam = searchParams.get('total');
    if (itemsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(itemsParam));
        setOrderData(parsed);
        setTotal(parseFloat(totalParam) || 0);
      } catch (e) {
        setError('Failed to load order data.');
      }
    } else {
      setError('No order data found.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.deliveryLocation) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        customerName: formData.name,
        whatsappNumber: formData.whatsapp,
        instagramHandle: formData.instagram || '',
        deliveryLocation: formData.deliveryLocation,
        deliveryLocation2: formData.deliveryLocation2 || '',
        specialInstructions: formData.specialInstructions || '',
        userEmail: formData.email || '',
        items: orderData,
        subtotal: total,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');

      const orderSummary = orderData.map((item) => ({
        ...item,
        total: (item.price || 0) * (item.quantity || 1),
      }));
      router.push(
        `/thank-you?items=${encodeURIComponent(JSON.stringify(orderSummary))}&total=${total.toFixed(2)}`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component (the JSX)
}