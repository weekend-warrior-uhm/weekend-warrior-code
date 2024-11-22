import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { Activity } from '@prisma/client';
import AddActivity from '@/components/AddActivity';

const ActivitiesPage = async () => {
  /* This is for protecting the page so that only signed in users can access:

  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  */
  const contacts: Activity[] = await prisma.activity.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">Activities</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
<<<<<<< Updated upstream
              {contacts.map((activity) => (
                <Col key={activity.name}>
                  <AddActivity
                    activity={activity}
                  />
=======
              {activities.map((activity) => (
                <Col key={activity.id}>
                  <AddActivity activity={activity} />
>>>>>>> Stashed changes
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
