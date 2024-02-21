import type { NextAuthConfig } from 'next-auth';
import { CLIENT_SECRET } from './lib/constants';

const authConfig: NextAuthConfig = {
  callbacks: {
    // async authorized({ auth, request: { nextUrl } }) {
    // console.log('[DEBUG] auth', auth);
    // console.log('[DEBUG] auth', nextUrl);

    // const isLoggedIn = !!auth?.user;
    // const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard');

    // if (isOnDashBoard) {
    //   return isLoggedIn ? true : false;
    // } else if (isLoggedIn) {
    //   return Response.redirect(new URL('/dashboard', nextUrl));
    // }
    // console.log('[Authorized Call]');
    // console.log('[DEBUG] auth', auth);
    // console.log('[DEBUG] auth', nextUrl);

    // return true;
    // },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('[Callback Sign-IN]', user);
      return user ? true : false;
    },
    async session({ session, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async jwt(params) {
      const { token, account } = params;
      return token;
    },
  },
  cookies: {}, // override cookie name and option
  events: {
    signOut(message) {
      console.log('Sign Out', message);
    },
  },
  logger: {
    error(code, ...message) {
      console.log(`[ERROR] CODE`, {
        cause: code.cause,
        name: code.name,
        stack: code.stack,
        ...message,
      });
    },
    warn(code, ...message) {
      console.log(`[WARN] ${code}`, message);
    },
    debug(code, ...message) {
      // console.log(`[DEBUG] ${code}`, message);
    },
  },
  pages: {}, //override specifict custom page
  secret: CLIENT_SECRET,
  session: {
    //generateSessionToken: () => "", // Generate custom session for database- based session
    strategy: 'jwt',
  },
  trustHost: true,
  //experimental: {}, // 실험적인 기능을 확용해보는 데 사용한다
  // jwt: {},  //setting jwt option
  //redirectProxyUrl: "", // 자신의 홈페이지가 아닌 다른 proxy 홈페이지로 리다이렉트가 필요할 때 사용한다.
  // basePath: '/account/login',
  providers: [],
};

export default authConfig;
