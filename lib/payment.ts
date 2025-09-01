import axios from 'axios';

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;

export async function initiatePayment(userId: string, email: string, amount: number = 10, currency: string = 'ETB') {
  if (!CHAPA_SECRET_KEY || !CHAPA_CALLBACK_URL) {
    throw new Error('Chapa API keys missing. Please set CHAPA_SECRET_KEY and CHAPA_CALLBACK_URL in .env.local');
  }
  const payload = {
    amount: amount.toString(),
    currency,
    email,
    first_name: email.split('@')[0] || 'User',
    last_name: userId,
    tx_ref: `${userId}-${Date.now()}`,
    callback_url: CHAPA_CALLBACK_URL,
    return_url: CHAPA_CALLBACK_URL,
    customization: {
      title: 'ClarifyMe PRO', // ≤ 16 chars
  description: 'Unlimited clarifications and premium features.', // Only allowed chars
    },
  };
  try {
    const res = await axios.post('https://api.chapa.co/v1/transaction/initialize', payload, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data.data.checkout_url;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'response' in err) {
      // @ts-expect-error: dynamic error shape from axios
      console.error('Chapa error:', err.response?.data || (err as Error).message);
    } else {
      console.error('Chapa error:', (err as Error).message);
    }
    throw new Error('Payment initialization failed');
  }
}
