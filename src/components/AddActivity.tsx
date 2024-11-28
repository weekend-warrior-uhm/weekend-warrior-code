'use client';

import { Card } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import Link from 'next/link';

/* Renders a single row in the List table. See list/page.tsx. */
const AddActivity = ({ activity }: { activity: Activity }) => (
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
    <Card.Footer>
      <Link href={`edit/${activity.id}`}>Sign up!</Link>
    </Card.Footer>
  </Card>
);

export default AddActivity;
