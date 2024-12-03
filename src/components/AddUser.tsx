'use client';

import { Card } from 'react-bootstrap';
import { User } from '@prisma/client';

const AddUser = ({ user }: { user: User }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{user.username}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <strong>Email:</strong>
        {' '}
        {user.email}
        <br />
        <strong>Full Name:</strong>
        {' '}
        {user.fullName}
        <br />
        <strong>Phone:</strong>
        {' '}
        {user.phone}
        <br />
        <strong>Gender:</strong>
        {' '}
        {user.gender}
        <br />
        <strong>Interests:</strong>
        {' '}
        {user.interests.join(', ')}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Card.Text>
        <strong>Role:</strong>
        {' '}
        {user.role}
      </Card.Text>
    </Card.Footer>
  </Card>
);

export default AddUser;
