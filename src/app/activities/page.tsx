import { getServerSession } from 'next-auth';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import { Activity, User } from '@prisma/client';
import ActivityCard from '@/components/ActivityCard';
import swal from 'sweetalert';

const ActivitiesPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.email;
  const today = new Date().toISOString().split('T')[0];

  // Find the right user
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: currentUser ?? '',
    },
  });

  const activities: Activity[] = await prisma.activity.findMany({
    where: {
      date: {
        gt: today,
      },
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
                    <ActivityCard
                      activity={activity}
                      handleEdit={(id: number) => (window.location.href = `/edit/${id}`)}
                      isRegistered={activity.registered.includes(user?.email ?? '')}
                      handleSignUp={() => {
                        if (!currentUser) {
                          swal('Error', 'You need to sign in to register for an activity', 'error', { timer: 2000 });
                        } else if (activity.registered.includes(currentUser)) {
                          swal('Error', 'You are already registered for this activity', 'error', { timer: 2000 });
                        } else {
                          activity.registered.push(currentUser);
                          // Call a function to update the registration in the backend
                          swal('Success', 'You have registered for this activity', 'success', { timer: 2000 });
                        }
                      }}
                      handleUnregister={() => {
                        if (!currentUser) {
                          swal('Error', 'You need to sign in to unregister for an activity', 'error', { timer: 2000 });
                        } else if (activity.registered.includes(currentUser)) {
                          activity.registered.splice(activity.registered.indexOf(currentUser), 1);
                          // Call a function to update the registration in the backend
                          swal('Success', 'You have unregistered for this activity', 'success', { timer: 2000 });
                        }
                      }}
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
