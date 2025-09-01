import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && 'id' in session.user) ? (session.user as { id: string }).id : undefined;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && 'id' in session.user) ? (session.user as { id: string }).id : undefined;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { topic, summary, quiz, confusion } = await req.json();
  if (!topic || !summary || !quiz || !confusion) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const entry = await prisma.journalEntry.create({
    data: {
      userId,
      topic,
      summary,
      quiz,
      confusion,
    },
  });
  return NextResponse.json({ entry });
}
