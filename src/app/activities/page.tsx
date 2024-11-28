import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
// import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Activity, User } from '@prisma/client';
import AddActivity from '@/components/AddActivity';

const ActivitiesPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.email;

  // Find the right user
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: currentUser ?? '',
    },
  });

  console.log(user?.role);

  // console.log(currentUser);
  /* This is for protecting the page so that only signed in users can access:

  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  */
  const activities: Activity[] = await prisma.activity.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">Activities</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {activities.map((activity) => (
                <Col key={activity.name}>
                  <AddActivity
                    activity={activity}
                    owner={activity.author_email}
                    currentUserEmail={user?.email}
                    isRegistered={activity.registered.includes(user?.email ?? '')}
                    currentUserRole={user?.role ?? ''}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ActivitiesPage;
