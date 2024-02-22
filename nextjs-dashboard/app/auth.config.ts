import type { NextAuthConfig } from 'next-auth';
import { CLIENT_SECRET } from './lib/constants';

const authConfig: NextAuthConfig = {
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(auth);
      const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard');
      if (!auth) {
        return false;
      } else {
        if (isOnDashBoard) {
          if (isLoggedIn) {
            return true;
          } else {
            return false;
          }
        } else {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      return user ? true : false;
    },
    async session({ session, token, user }) {
      // console.log('[DEBUG] session!!', session);
      // console.log('[DEBUG] token!!', token);
      // console.log('[DEBUG] token!!', user);
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async jwt(params) {
      const { token, account, user, profile, session } = params;
      // console.log('[DEBUG] token', token);
      // console.log('[DEBUG] account', account);
      // console.log('[DEBUG] user', user);
      // console.log('[DEBUG] profile', profile);
      // console.log('[DEBUG] session', session);

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
      console.log(`[ERROR LOGGER] CODE`, {
        cause: code.cause,
        name: code.name,
        stack: code.stack,
        ...message,
      });
    },
    warn(code, ...message) {
      console.log(`[WARN LOGGER] ${code}`, message);
    },
    debug(code, ...message) {
      if (process.env.AUTH_DEBUGGER_LOGGER === 'active') {
        console.log(`[DEBUG LOGGER] ${code}`, message);
      }
    },
  },
  pages: {
    signIn: '/',
    signOut: '/signedOut',
  },
  secret: CLIENT_SECRET,
  session: {
    strategy: 'jwt',
  },
  trustHost: true,

  providers: [],
};

export default authConfig;

//#region The Other Options
//experimental: {}, // 실험적인 기능을 확용해보는 데 사용한다
//jwt: {},  //setting jwt option
//redirectProxyUrl: "", // 자신의 홈페이지가 아닌 다른 proxy 홈페이지로 리다이렉트가 필요할 때 사용한다.
//basePath: '/account/login',
//generateSessionToken: () => "", // Generate custom session for database- based session
//#endregion The Other Options
