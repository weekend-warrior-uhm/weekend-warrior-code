import { getServerSession } from 'next-auth';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import { Activity, User } from '@prisma/client';
import AddActivity from '@/components/AddActivity';

const ActivitiesPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.email;
  const today = new Date().toISOString().split('T')[0];

  const user: User | null = await prisma.user.findUnique({
    where: { email: currentUser ?? '' },
  });

  const activities: Activity[] = await prisma.activity.findMany({
    where: {
      date: { gt: today },
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">Activities</h2>
            <div className="text-center my-3">
              <Link href="/create">
                <Button variant="primary">Create Activity</Button>
              </Link>
            </div>
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
