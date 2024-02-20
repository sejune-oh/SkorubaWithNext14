import NextAuth from 'next-auth';
import duendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';
import authConfig from './app/auth.config';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const issuer = process.env.ISUER;

// setting provider
// settup env values
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    duendeIdentityServer6({
      id: 'cloudhospital',
      name: 'Cloudhospital',
      authorization: {
        params: {
          scope: process.env.IDENTITY_SCOPE,
          redirect_uri: process.env.IDENTITY_REDIRECTURL,
        },
      },
      wellKnown: `${issuer}/.well-known/openid-configuration`,
      userinfo: {
        url: `${issuer}/connect/userinfo`,
      },
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
    }),
  ],
});
