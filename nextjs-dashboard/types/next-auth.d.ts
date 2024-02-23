import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'] & User;
    id_token?: string | unknown;
    access_token?: string | unknown;
    token_type?: string | unknown;
    refresh_token?: string | unknown;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    phone?: string;
    role?: Array<string> | string;
    email_verified?: boolean;
  }
}
