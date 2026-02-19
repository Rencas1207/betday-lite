import matchesData from '@/app/src/data/matches.json';
import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json({ ok: true, data: matchesData });
}
