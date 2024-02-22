import { handlers } from '@/auth';
import { NextRequest } from 'next/server';

const { GET: AuthGET, POST: AuthPOST } = handlers;

export async function GET(request: NextRequest) {
  const response = await AuthGET(request);

  return response;
}

export async function POST(request: NextRequest) {
  const response = await AuthPOST(request);

  return response;
}
