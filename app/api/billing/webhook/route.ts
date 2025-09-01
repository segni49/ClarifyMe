import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate webhook signature if needed
    if (body.status === 'PAID' && body.reference) {
      await prisma.user.update({
        where: { id: body.reference },
        data: { role: 'PRO' },
      });
      await prisma.subscription.upsert({
        where: { userId: body.reference },
        update: { status: 'active', invoiceId: body.invoiceId },
        create: {
          userId: body.reference,
          status: 'active',
          invoiceId: body.invoiceId,
        },
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ success: false, error: 'Webhook failed.' });
  }
// ...existing code...
}
