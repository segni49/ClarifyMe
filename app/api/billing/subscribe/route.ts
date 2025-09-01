import { NextResponse } from 'next/server';
import { initiatePayment } from '../../../../lib/payment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && 'id' in session.user) ? (session.user as { id: string }).id : undefined;
  const userEmail = (session?.user && 'email' in session.user) ? (session.user as { email: string }).email : undefined;
  if (!userId || !userEmail) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payment = await initiatePayment(userId, userEmail);
  return NextResponse.json({ payment });
}
