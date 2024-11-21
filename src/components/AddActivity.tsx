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
        @&ensp;
        {activity.time}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${activity.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default AddActivity;
