import { auth } from '@/auth';
import { NextResponse } from 'next/server';

//! event signOut에서  federated signOut 처리할 수 있을것 같음 확인해보자
export async function GET(request: Request) {
  const session = await auth();

  // Can't find session or token
  if (!session || !session.access_token) {
    console.warn("Token or Session doesn't exist");
    NextResponse.redirect('/');
  }

  if (session?.id_token) {
    const endsessionURL = `${process.env.IDENTITY_ISSUER}/connect/endsession`;
    const endsessionParams = new URLSearchParams('');
    endsessionParams.set('id_token_hint', session.id_token as string);
    endsessionParams.set(
      'post_logout_redirect_uri',
      `http://localhost:3000/signed-out`,
    );

    NextResponse.redirect(`${endsessionURL}/${endsessionParams}`);
  }

  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
