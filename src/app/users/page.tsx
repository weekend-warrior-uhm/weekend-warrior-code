// import { getServerSession } from 'next-auth';
// import authOptions from '@/lib/authOptions';
// import { loggedInProtectedPage } from '@/lib/page-protection';
import ShowUsers from '@/components/ShowUsers';

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
    <ShowUsers />
  </main>
);

export default AddStuff;
