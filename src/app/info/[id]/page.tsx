import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Activity, User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import InfoActivityRender from '@/components/InfoActivityRender';

export default async function InfoActivityPage({ params }: { params: { id: string | string[] } }) {
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
    activity = await prisma.activity.findFirst({
      where: {
        id, // Match the activity by its ID
        OR: [
          {
            registered: {
              has: currentUser, // Check if currentUser is in the registered array
            },
          },
          {
            author_email: user?.email, // Check if the user is the author
          },
        ],
      },
    });
  }

  console.log(activity?.name);

  // console.log(activity);
  if (!activity) {
    return notFound();
  }

  return (
    <main>
      <InfoActivityRender activity={activity} />
    </main>
  );
}
