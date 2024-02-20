import type { NextAuthConfig, Session, User } from 'next-auth';

const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashBoard) {
        return isLoggedIn ? true : false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
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
  providers: [],
};

export default authConfig;
