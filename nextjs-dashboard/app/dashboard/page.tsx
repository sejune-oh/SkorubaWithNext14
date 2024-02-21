import { auth } from '@/auth';

async function Page() {
  const data = await auth();

  console.log(data?.user);

  return <div>Dashboard page</div>;
}

export default Page;
