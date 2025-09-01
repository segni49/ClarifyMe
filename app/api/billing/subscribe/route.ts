import { NextResponse } from 'next/server';
import { initiatePayment } from '../../../../lib/payment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && 'id' in session.user) ? (session.user as { id: string }).id : undefined;
  const userEmail = (session?.user && 'email' in session.user) ? (session.user as { email: string }).email : undefined;
  if (!userId || !userEmail) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const checkoutUrl = await initiatePayment(userId, userEmail);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error('Payment error:', err);
    return NextResponse.json({ error: 'Payment initiation failed.' }, { status: 500 });
  }
}
