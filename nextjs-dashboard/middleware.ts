import NextAuth from 'next-auth';
import authConfig from './auth.config';

// 페이지 렌더링 이전의 실행되는 미들웨어
console.log('[Middleware Called]');

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // NextAuth를 사용해서, Authentication이 필요한 페이지를 설정할 수 있다.
  matcher: [
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
