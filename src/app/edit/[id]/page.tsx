import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Activity, User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditActivityForm from '@/components/EditActivityForm';

export default async function EditActivityPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const currentUser = session?.user?.email;

  // Find the right user
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: currentUser ?? '',
    },
  });

  console.log(user?.role);

  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  let activity: Activity | null = null;

  if (user?.role === 'ADMIN') {
    activity = await prisma.activity.findUnique({
      where: {
        id,
      },
    });
  } else {
    activity = await prisma.activity.findUnique({
      where: {
        id,
        author_email: currentUser ?? '',
      },
    });
  }

  // console.log(activity);
  if (!activity) {
    return notFound();
  }

  return (
    <main>
      <EditActivityForm activity={activity} />
    </main>
  );
}
