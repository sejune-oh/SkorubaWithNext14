import NextAuth from 'next-auth';
import duendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';
import authConfig from './app/auth.config';

if (process.env.STAGE === 'dev') {
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    duendeIdentityServer6({
      id: 'cloudhospital',
      name: 'CloudHospital',
      authorization: {
        params: {
          scope:
            'openid email profile roles CloudHospital_admin_api CloudHospital_SignalR IdentityServerApi offline_access IdentityServerAdmin_api',
          redirect_uri: 'http://localhost:3000/api/auth/callback/CloudHospital',
        },
      },
      wellKnown: `https://localhost:44310/.well-known/openid-configuration`,
      userinfo: {
        url: `https://localhost:44310/connect/userinfo`,
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
      //issuer: process.env.AUTH_DUENDEIDENTITYSERVER6_ISSUER,
      issuer: 'https://localhost:44310',
      clientId: 'CloudHospitalAdminClient',
      clientSecret: 'CloudHospitalAdminClientSecret',
    }),
  ],
});
