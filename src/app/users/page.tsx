// import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
// import { loggedInProtectedPage } from '@/lib/page-protection';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@prisma/client';
import AddUser from '@/components/AddUser';

export const getServerSideProps = async () => {
  const users: User[] = await prisma.user.findMany({});
  return {
    props: {
      users,
    },
  };
};

const ListUsers = ({ users }: { users: User[] }) => (
  <main>
    <Container id="list" fluid className="py-3">
      <Row>
        <Col>
          <h2 className="text-center">Users</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {users.map((user) => (
              <Col key={user.id}>
                <AddUser user={user} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ListUsers;
