import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
// Use native fetch for HuggingFace API
import { validateQuiz } from '../../../lib/validateQuiz';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user && 'id' in session.user) ? (session.user as { id: string }).id : undefined;
  const userRole = (session?.user && 'role' in session.user) ? (session.user as { role: string }).role : undefined;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { topic, confusion } = await req.json();
  if (!topic || !confusion) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  // Rate limiting for STUDENT role
  if (userRole === 'STUDENT') {
    const count = await prisma.journalEntry.count({
      where: { userId, createdAt: { gte: new Date(Date.now() - 24*60*60*1000) } }
    });
    if (count >= 5) return NextResponse.json({ error: 'Daily limit reached' }, { status: 429 });
  }

  // HuggingFace Summarization
  let summary = 'No summary available.';
  try {
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: confusion }),
      }
    );
    if (hfRes.status === 403) {
      console.error('HuggingFace API key is invalid or lacks access.');
      return NextResponse.json({ error: 'HuggingFace API key is invalid or lacks access.' }, { status: 403 });
    }
    if (!hfRes.ok) {
      console.error('Failed to summarize text:', await hfRes.text());
      return NextResponse.json({ error: 'Failed to summarize text.' }, { status: 500 });
    }
    const hfData = await hfRes.json();
    if (Array.isArray(hfData) && hfData[0]?.summary_text) {
      summary = hfData[0].summary_text;
    } else if (typeof hfData === 'object' && hfData.summary_text) {
      summary = hfData.summary_text;
    }
  } catch (err) {
    console.error('Unexpected error in HuggingFace API:', err);
    return NextResponse.json({ error: 'Failed to summarize text.' }, { status: 500 });
  }

  // Generate quiz (simple mock)
  const quiz = {
    questions: [
      { question: `What is the main idea of ${topic}?`, options: ['A', 'B', 'C'], answer: 'A' },
    ],
  };

  if (!validateQuiz(quiz)) {
    console.error('Quiz generation failed:', quiz);
    return NextResponse.json({ error: 'Quiz generation failed' }, { status: 500 });
  }

  // Save to journal
  let entry;
  try {
    entry = await prisma.journalEntry.create({
      data: {
        userId,
        topic,
        confusion,
        summary,
        quiz,
      },
    });
  } catch (err) {
    console.error('Error saving journal entry:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ entry });
}
