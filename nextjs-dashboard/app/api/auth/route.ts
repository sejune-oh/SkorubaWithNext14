import { NextResponse } from 'next/server';

export function GET(resquest: Request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
