import type { NextAuthConfig, Session } from 'next-auth';

const authConfig: NextAuthConfig = {
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashBoard = request.nextUrl.pathname.startsWith('/dashboard');
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
          return Response.redirect(new URL('/dashboard', request.nextUrl));
        }
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      return user ? true : false;
    },
    async jwt(params) {
      const { token, account, user, profile, session, trigger } = params;

      if (account) {
        const setToken = {
          ...token,
          access_token: account.access_token,
          id_token: account.id_token,
          token_type: account.token_type,
          providerAccountId: account.providerAccountId,
        };

        return setToken;
      }

      return token;
      // Next step to session callback
    },
    async session(params) {
      const { session, token, user, trigger } = params;

      if (token) {
        const initSession: Session = {
          ...session,
          access_token: token.access_token,
          id_token: token.id_token,
        };

        return initSession;
      }

      return params.session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
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
      if (code === 'user') console.log(`[DEBUG LOGGER] ${code}`, message);
    },
  },
  pages: {
    signIn: '/',
    signOut: '/signedOut',
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [],
};

export default authConfig;

//#region The Other Options
// cookies: {}, // override cookie name and option
//experimental: {}, // 실험적인 기능을 확용해보는 데 사용한다
//redirectProxyUrl: "", // 자신의 홈페이지가 아닌 다른 proxy 홈페이지로 리다이렉트가 필요할 때 사용한다.
//basePath: '/account/login',
//generateSessionToken: () => "", // Generate custom session for database- based session
// session: {strategy: 'jwt'},
//#endregion The Other Options
