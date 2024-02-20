import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate() {
  try {
    await signIn('cloudHospital');
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
