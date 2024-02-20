export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(request: Request, response: Response) {
  try {
    //get id.token
    // Main logic
    // if (id_token) {
    //   const endsessionURL = `${process.env.IDENTITY_ISSUER}/connect/endsession`;
    //   const endsessionParams = new URLSearchParams("");
    //   endsessionParams.set("id_token_hint", id_token as string);
    //   endsessionParams.set(
    //     "post_logout_redirect_uri",
    //     `${process.env.NEXTAUTH_URL}/signed-out`
    //   );
  } catch (error) {
    console.log('[Server Side API ERROR]', error);
  }
}
