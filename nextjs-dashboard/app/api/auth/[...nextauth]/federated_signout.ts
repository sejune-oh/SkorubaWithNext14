import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

//! please active when connect local identity server
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(request: NextApiRequest, response: NextApiResponse) {}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const session = await getSession();
    console.log('🚀 ~ POST ~ session:', session);
  } catch (error) {}
}

//   try {
//     const { id_token } = body;
//     if (!id_token) {
//       console.warn(
//         'No JWT token found when calling /federated-logout endpoint',
//       );
//       return response.redirect(process.env.NEXTAUTH_URL!);
//     }
//     if (id_token) {
//       const endsessionURL = `${process.env.IDENTITY_ISSUER}/connect/endsession`;
//       const endsessionParams = new URLSearchParams('');
//       endsessionParams.set('id_token_hint', id_token as string);
//       endsessionParams.set(
//         'post_logout_redirect_uri',
//         `${process.env.NEXTAUTH_URL}/signed-out`,
//       );
//       console.log('url', `${endsessionURL}?${endsessionParams}`);
//       // return res.redirect(`${endsessionURL}?${endsessionParams}`);
//       return res
//         .status(200)
//         .json({ logoutUrl: `${endsessionURL}?${endsessionParams}` });
//     } else {
//       console.warn(
//         "Without an id_token the user won't be redirected back from the IdP after logout.",
//       );
//     }
//   } catch (error) {
//     console.error(error);
//     res.redirect(process.env.NEXTAUTH_URL!);
//   }
