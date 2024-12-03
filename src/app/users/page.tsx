'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { User } from '@prisma/client';
import AddUser from '@/components/AddUser';
import axios from 'axios';

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    const intervalId = setInterval(fetchUsers, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
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
};

export default ListUsers;
