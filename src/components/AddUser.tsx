'use client';

import { Card } from 'react-bootstrap';
import { User } from '@prisma/client';

/* Renders a single row in the List table. See list/page.tsx. */
const AddActivity = ({ user }: { user: User }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>
        User Name
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{user.email}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Card.Text>{user.role}</Card.Text>
    </Card.Footer>
  </Card>
);

export default AddActivity;
