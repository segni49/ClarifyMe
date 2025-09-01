import axios from 'axios';

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;

export async function initiatePayment(userId: string, email: string, amount: number = 10, currency: string = 'ETB') {
  if (!CHAPA_SECRET_KEY || !CHAPA_CALLBACK_URL) {
    throw new Error('Chapa API keys missing. Please set CHAPA_SECRET_KEY and CHAPA_CALLBACK_URL in .env.local');
  }
  // Chapa API integration
  const res = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
    amount,
    currency,
    email,
    first_name: 'User', // You can pass real user data
    last_name: userId,
    tx_ref: `${userId}-${Date.now()}`,
    callback_url: CHAPA_CALLBACK_URL,
    return_url: CHAPA_CALLBACK_URL,
    customization: {
      title: 'ClarifyMe PRO Subscription',
      description: 'Unlock unlimited clarifications and premium features.'
    }
  }, {
    headers: {
      Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}
