import NextAuth from 'next-auth';
import duendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';
import authConfig from './app/auth.config';
import { ISSUER, REDIRECT_URL, SCOPE } from './app/lib/constants';

// settup env values
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    duendeIdentityServer6({
      id: 'cloudhospital',
      name: 'Cloudhospital',
      authorization: {
        params: {
          scope: SCOPE,
          redirect_uri: REDIRECT_URL,
        },
      },
      wellKnown: `${ISSUER}/.well-known/openid-configuration`,
      userinfo: {
        url: `${ISSUER}/connect/userinfo`,
      },
      issuer: ISSUER,
      async profile(profile, tokens) {
        return {
          id: profile.sub,
          role: profile.role,
          preferred_username: profile.preferred_username,
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
        };
      },
      token: {
        async request({ client, provider, params, checks }: any) {
          const tokens = await client.callback(
            provider.callbackUrl,
            params,
            checks,
          );

          return { tokens };
        },
      },
    }),
  ],
});
