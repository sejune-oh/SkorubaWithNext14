'use client';
import { auth } from '@/auth';

interface Params {}

async function Page({}: Params) {
  const data = await auth();

  console.log('Data', data);

  return <div>Customer Page</div>;
}

export default Page;
