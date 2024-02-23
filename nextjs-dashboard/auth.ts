import NextAuth, { User } from 'next-auth';
import DuendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';
import authConfig from './app/auth.config';
import axios from 'axios';

//! active when test on local environment
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const issuer = process.env.AUTH_DUENDEIDENTIYSERVER6_ISSUER;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    DuendeIdentityServer6({
      id: 'cloudhospital',
      name: 'CloudHospital',
      clientId: process.env.AUTH_DUENDEIDENTIYSERVER6_CLIENT_ID,
      clientSecret: process.env.AUTH_DUENDEIDENTIYSERVER6_CLIENT_SECRET,
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
          scope: process.env.AUTH_DUENDEIDENTITYSERVER6_SCOPE,
        },
        redirect_uri: 'http://localhost:3000/api/auth/callback/CloudHospital',
      },
      async profile(profile, token) {
        const { access_token } = token;

        try {
          // get user info
          const res = await axios({
            method: 'GET',
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${access_token}`,
            },
            url: `${issuer}/connect/userinfo`,
          });
          const userInfo = res.data;

          const user: User = {
            id: profile.sub,
            role: userInfo.role,
            name: userInfo.name,
            email: userInfo.email,
            preferred_username: userInfo.preferred_username,
            email_verified: userInfo.email_verified,
          };

          return user;
        } catch (error) {
          console.log(error);
        }

        return profile;
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
