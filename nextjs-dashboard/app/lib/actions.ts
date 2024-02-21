'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate() {
  try {
    const data: any = await signIn('cloudhospital');
    // console.log('[DEBUG]:', data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
  }
}
