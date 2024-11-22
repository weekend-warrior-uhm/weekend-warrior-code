import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { Activity } from '@prisma/client';
import AdminActivity from '@/components/AdminActivity';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  // Restrict access to admin user
  if (!currentUser || currentUser.email !== 'admin@foo.com') {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  try {
    const activities: Activity[] = await prisma.activity.findMany({});
    const users = await prisma.user.findMany({});

    return (
      <main>
        <Container id="list" fluid className="py-3">
          <Row>
            <Col>
              <h2 className="text-center">Activities Admin</h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {activities.map((activity) => (
                  <Col key={activity.id}>
                    <AdminActivity activity={activity} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-center">Users Admin</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </main>
    );
  } catch (error) {
    console.error('Error loading data:', error);

    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h1>Error</h1>
            <p>There was an error loading the data. Please try again later.</p>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default AdminPage;
