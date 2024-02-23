import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      user_id?: string;
      user_email?: string;
    };
    access_token?: string | unknown;
    id_token?: string | unknown;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    phone?: string;
    role?: Array<string> | string;
    preferred_username?: string;
    email_verified?: boolean;
  }
}
