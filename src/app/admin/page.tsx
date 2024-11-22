import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import StuffItemAdmin from '@/components/StuffItemAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
<<<<<<< HEAD
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
=======
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const stuff = await prisma.stuff.findMany({});
  const users = await prisma.user.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Stuff Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItemAdmin key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>List Users Admin</h1>
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
>>>>>>> parent of 8c51b5c (changes to the admin page)
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
