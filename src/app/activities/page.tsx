// import { getServerSession } from 'next-auth';
// import authOptions from '@/lib/authOptions';
// import { loggedInProtectedPage } from '@/lib/page-protection';
import ShowActivities from '@/components/ShowActivities';

const AddStuff = async () => (
  /* This is for protecting the page so that only signed in users can access:

  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  */
  <main>
    <ShowActivities />
  </main>
);

export default AddStuff;
