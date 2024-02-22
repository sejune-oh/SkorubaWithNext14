import NextAuth from 'next-auth';
import DuendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';
import authConfig from './app/auth.config';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    DuendeIdentityServer6({
      id: 'cloudhospital',
      name: 'CloudHospital',
      clientId: 'CloudHospitalAdminClient',
      clientSecret: 'CloudHospitalAdminClientSecret',
      issuer: `${process.env.auth_duendeidentityserver6_issuer}`,
      wellKnown: `${process.env.auth_duendeidentityserver6_issuer}/.well-known/openid-configuration`,
      userinfo: {
        url: `${process.env.auth_duendeidentityserver6_issuer}/connect/userinfo`,
      },
      token: {
        url: `${process.env.auth_duendeidentityserver6_issuer}/connect/token`,
      },
      authorization: {
        params: process.env.AUTH_DUENDEIDENTITYSERVER6_SCOPE,
        redirect_uri: 'http://localhost:3000/api/auth/callback/CloudHospital',
      },
      async profile(profile, token) {
        return {
          id: profile.sub,
          role: profile.role,
          preferred_username: profile.preferred_username,
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
        };
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
