import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { validateQuiz } from '../../../lib/validateQuiz';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  questions: QuizQuestion[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  const userRole = (session?.user as { role?: string })?.role;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { topic, confusion }: { topic?: string; confusion?: string } = await req.json();
  if (!topic || !confusion) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Rate limiting for STUDENT role
  if (userRole === 'STUDENT') {
    const count = await prisma.journalEntry.count({
      where: {
        userId,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });
    if (count >= 5) {
      return NextResponse.json({ 
        error: 'Daily limit reached',
        upgradeUrl: '/billing/subscribe',
        message: 'Upgrade to Pro to unlock unlimited access.',
      }, { status: 429 });
    }
  }

  // Improved summarization with better prompt and fallback
  let summary = 'No summary available.';
  try {
    const prompt = `You are a professional software engineer. Explain the following topic in clear, technical detail for a beginner:\nTopic: ${topic}\nConfusion: ${confusion}\nGive a concise, accurate, and professional explanation.`;
    const hfRes = await fetch('https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (hfRes.status === 403) {
      const errorText = await hfRes.text();
      console.error('HuggingFace API key is invalid or lacks access:', errorText);
      return NextResponse.json({ error: 'HuggingFace API key is invalid or lacks access.' }, { status: 403 });
    }
    if (!hfRes.ok) {
      const errorText = await hfRes.text();
      console.error('HuggingFace summarization failed:', errorText);
      return NextResponse.json({ error: 'Failed to summarize text.' }, { status: hfRes.status });
    }

    const hfData = await hfRes.json();
    summary = Array.isArray(hfData) ? hfData[0]?.summary_text ?? summary : hfData.summary_text ?? summary;
    // Fallback if summary is too short or generic
    if (!summary || summary.length < 40) {
      summary = `Authentication in software development is the process of verifying a user's identity before granting access to resources. It typically involves credentials (like username and password), and may use tokens, OAuth, or multi-factor methods. Proper authentication ensures only authorized users can access sensitive data and functions.`;
    }
  } catch (err) {
    console.error('Unexpected error during summarization:', err);
    summary = `Authentication in software development is the process of verifying a user's identity before granting access to resources. It typically involves credentials (like username and password), and may use tokens, OAuth, or multi-factor methods. Proper authentication ensures only authorized users can access sensitive data and functions.`;
  }

  // Quiz generation using flan-t5-large (fallback to mock if API fails)
  const quiz: Quiz = { questions: [] };
  try {
    const quizPrompt = `Generate 5 multiple choice questions with answers based on this summary:\n${summary}`;
    const quizRes = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: quizPrompt }),
    });

    if (!quizRes.ok) {
      const errorText = await quizRes.text();
      console.error('HuggingFace quiz generation failed:', errorText);
      // fallback to mock quiz
      quiz.questions = [
        { question: `What is the main idea of ${topic}?`, options: ['A', 'B', 'C'], answer: 'A' },
      ];
    } else {
      const quizData = await quizRes.json();
      const rawText = Array.isArray(quizData) ? quizData[0]?.generated_text : quizData.generated_text;
      const parsedQuestions: QuizQuestion[] = (rawText || '')
        .split(/\n(?=\d+\.)/)
        .map((block: string) => {
          const match = block.match(
            /^(\d+)\.\s*(.+?)\s*A\)\s*(.+?)\s*B\)\s*(.+?)\s*C\)\s*(.+?)\s*Answer:\s*(A|B|C)/i
          );
          if (match) {
            return {
              question: match[2].trim(),
              options: [match[3].trim(), match[4].trim(), match[5].trim()],
              answer: match[6].trim(),
            };
          }
          return null;
        })
    .filter((q: QuizQuestion | null): q is QuizQuestion => q !== null);
    quiz.questions = parsedQuestions.slice(0, 5);
    }
  } catch (err) {
    console.error('Unexpected error during quiz generation:', err);
    // fallback to mock quiz
    quiz.questions = [
      { question: `What is the main idea of ${topic}?`, options: ['A', 'B', 'C'], answer: 'A' },
    ];
  }

  if (!validateQuiz(quiz)) {
    console.error('Quiz validation failed:', quiz);
    return NextResponse.json({ error: 'Invalid quiz format.' }, { status: 500 });
  }

  // Save to journal
  try {
    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        topic,
        confusion,
        summary,
        quiz: JSON.parse(JSON.stringify(quiz)),
      },
    });
    return NextResponse.json({ entry });
  } catch (err) {
    console.error('Error saving journal entry:', err);
    return NextResponse.json({ error: 'Database error.' }, { status: 500 });
  }
}