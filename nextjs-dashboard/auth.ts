import NextAuth, { User } from 'next-auth';
import DuendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';
import authConfig from './auth.config';

//! active when test on local environment
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const issuer = process.env.STS_ISSUER;
const clientId = process.env.STS_CLIENT_ID;
const clientSecret = process.env.STS_CLIENT_SECRET;
const scope = process.env.STS_SCOPE;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    DuendeIdentityServer6({
      id: 'cloudhospital',
      name: 'CloudHospital',
      clientId,
      clientSecret,
      issuer: `${issuer}`,
      wellKnown: `${issuer}/.well-known/openid-configuration`,
      userinfo: {
        url: `${issuer}/connect/userinfo`,
      },
      token: {
        url: `${issuer}/connect/token`,
      },
      authorization: {
        params: {
          scope,
        },
        redirect_uri: 'http://localhost:3000/api/auth/callback/CloudHospital',
      },
      async profile(profile, token) {
        const user: User = {
          id: profile.sub,
          role: profile.role,
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
        };

        return user;
      },

      //#region the other options
      // account: () => {},
      // checks: ['pkce'],
      // allowDangerousEmailAccountLinking: false,
      // redirectProxyUrl: undefined,
      //#endregion the other options
    }),
  ],
});
