import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '../../../lib/recommend';

export async function POST(req: NextRequest) {
  const { topic } = await req.json();
  if (!topic) return NextResponse.json({ error: 'Missing topic' }, { status: 400 });
  const recommendations = await getRecommendations(topic);
  return NextResponse.json({ recommendations });
}
