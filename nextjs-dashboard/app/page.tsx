'use client';

import style from '@/app/ui/home.module.css';
import Image from 'next/image';
import AcmeLogo from './ui/acme-logo';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, router, status]);

  if (status === 'loading') {
    return <div>Loading....</div>;
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          {/* CSS module import */}
          <div className={style.shape}></div>
          <button
            className='md:text-base" flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400'
            // onClick={signInBtnHandler}
            onClick={async (e) => {
              e.preventDefault();
              await signIn('cloudhospital');
            }}
          >
            Log in
          </button>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src={'/hero-desktop.png'}
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Images"
          />
        </div>
      </div>
    </main>
  );
}
