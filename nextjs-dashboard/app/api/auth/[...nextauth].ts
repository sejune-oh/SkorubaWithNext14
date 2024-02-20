import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import DuendeIdentityServer6 from 'next-auth/providers/duende-identity-server6';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const issuer = process.env.ISUER;
const secret = process.env.CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    DuendeIdentityServer6({
      id: 'cloudhospital',
      name: 'Cloudhospitals',
      clientId: process.env.CLIENT_ID!,
      clientSecret: secret!,
      authorization: {
        params: {
          scope: process.env.SCOPES,
          redirect_uri: process.env.REDIRECT_URL,
        },
      },
      wellKnown: `${issuer}/.well-known/openid-configuration`,
      userinfo: {
        url: `${issuer}/connect/userinfo`,
      },
      profileUrl: `${issuer}/connect/userinfo`,
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
        async request({ client, provider, params, checks }) {
          const tokens = await client.callback(
            provider.callbackUrl,
            params,
            checks,
          );

          return { tokens };
        },
      },
      idToken: false,
      issuer: issuer,
    }),
  ],
  secret: secret!,
  theme: {
    colorScheme: 'light',
  },
  pages: {},
  callbacks: {
    async signIn({ user }: { user: User }) {
      return user ? true : false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        if (account.id_token) token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      const clientSession: Session = {
        ...session,
      };

      if (token.idToken) {
        // clientSession.id_token = token.idToken as string;
      }

      return clientSession;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  events: {
    async signOut(message: { session: Session; token: JWT }) {
      console.log('signOut: ', message);
    },
  },
};

export default NextAuth(authOptions);
