import { authOptions } from '@/app/src/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <main className="flex w-full items-center justify-center bg-white px-6 py-10 sm:items-start dark:bg-black">
      <div className="w-full max-w-360 px-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>Bienvenido {session.user.name}</p>
      </div>
    </main>
  );
}
