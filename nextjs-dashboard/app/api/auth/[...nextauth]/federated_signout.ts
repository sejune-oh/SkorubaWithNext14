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
