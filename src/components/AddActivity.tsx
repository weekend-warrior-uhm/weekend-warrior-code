'use client';

import { Card, Button } from 'react-bootstrap';
import { Activity } from '@prisma/client';

/* Renders a single row in the List table. See list/page.tsx. */
const AddActivity = ({ activity, owner, currentUserEmail, currentUserRole, isRegistered }:
{ activity: Activity, owner: string, currentUserEmail: string | null | undefined,
  currentUserRole: string, isRegistered: boolean }) => (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>
          {activity.name}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{activity.description}</Card.Text>
        <Card.Text>{activity.location}</Card.Text>
        <Card.Text>
          {activity.date}
          &nbsp;@&nbsp;
          {activity.time}
          &nbsp;(
          {activity.duration}
          &nbsp;hours)
        </Card.Text>
        <Card.Text>
          Activity by:&nbsp;
          {activity.author}
        </Card.Text>
        <Card.Text>
          Total Registered Users:&nbsp;
          {activity.registered.length}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex">
        {isRegistered ? ( // ternary operator to show either or
          <Button type="button" variant="danger">
            Unregister
          </Button>
        ) : (
          <Button type="button" variant="primary">
            Sign Up
          </Button>
        )}
        {((owner === currentUserEmail) || (currentUserRole === 'ADMIN')) && (
        <Button type="button" variant="danger" className="ms-auto">
          Edit
        </Button>
        )}
      </Card.Footer>
    </Card>
);

export default AddActivity;
