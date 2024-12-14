import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
// import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import { Activity, User } from '@prisma/client';
import AddActivity from '@/components/AddActivity';
import { loggedInProtectedPage } from '@/lib/page-protection';

const OwnedActivitiesPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const currentUser = session?.user?.email;
  const user: User | null = await prisma.user.findUnique({
    where: { email: currentUser ?? '' },
  });

  const activities: Activity[] = await prisma.activity.findMany({
    where: {
      author_email: user?.email,
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">Owned Activities</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {activities
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((activity) => (
                  <Col key={activity.id}>
                    <AddActivity
                      activity={activity}
                      owner={activity.author_email}
                      currentUserEmail={user?.email}
                      isRegistered={activity.registered.includes(user?.email ?? '')}
                      currentUserRole={user?.role ?? ''}
                      kind="my"
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

export default OwnedActivitiesPage;
