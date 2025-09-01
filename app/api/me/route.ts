import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && 'id' in session.user) ? (session.user as { id: string }).id : undefined;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });
  return NextResponse.json({ user });
}
