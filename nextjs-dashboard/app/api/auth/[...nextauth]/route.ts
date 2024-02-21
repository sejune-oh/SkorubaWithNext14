import { handlers } from '@/auth';
import { NextRequest } from 'next/server';

const { GET: AuthGET, POST: AuthPOST } = handlers;

// export { POST };

export async function GET(request: NextRequest) {
  // console.log('[GET] REQ', request);
  const response = await AuthGET(request);

  return response;
}

export async function POST(request: NextRequest) {
  // console.log('[POST] REQ', request);
  const response = await AuthPOST(request);

  return response;
}
