import NextAuth from 'next-auth';
import authConfig from './app/auth.config';

// 페이지 렌더링 이전의 실행되는 미들웨어
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
