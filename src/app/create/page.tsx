import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import CreateActivityForm from '@/components/CreateActivityForm';

export default async function CreateActivityPage() {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const currentUser = session?.user?.email;

  // Find the right user
  const user = await prisma.user.findUnique({
    where: {
      email: currentUser ?? '',
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main>
      <CreateActivityForm currentUserName={user.fullName} currentUserEmail={user.email} />
    </main>
  );
}
