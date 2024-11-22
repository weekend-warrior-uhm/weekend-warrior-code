'use client';

import { Activity } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const AdminActivity = ({ activity }: { activity: Activity }) => {
  const handleDelete = async () => {
    await fetch(`/api/activities/${activity.id}`, {
      method: 'DELETE',
    });
    window.location.reload(); // Use window.location.reload() instead of useRouter for now
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{activity.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{activity.description}</Card.Text>
        <Card.Text>{activity.location}</Card.Text>
        <Card.Text>
          {activity.date}
          &ensp;@&ensp;
          {activity.time}
        </Card.Text>
        <Card.Text>
          Activity by:&ensp;
          {activity.author}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link href={`edit/${activity.id}`} className="btn btn-primary me-2">
          Edit
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default AdminActivity;
