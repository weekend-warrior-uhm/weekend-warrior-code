'use client';

import { Card, Button } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import { registerUpdate } from '@/lib/dbActions';
import swal from 'sweetalert';

/* Renders a single row in the List table. See list/page.tsx. */
const AddActivity = ({ activity, owner, currentUserEmail, currentUserRole, isRegistered }:
{
  activity: Activity,
  owner: string,
  currentUserEmail: string | null | undefined,
  currentUserRole: string,
  isRegistered: boolean
}) => {
  const handleSignUp = () => {
    console.log('Signing up for activity:', activity.name);
    if ((currentUserEmail !== null) // checks
      && (currentUserEmail !== undefined)
      && (!activity.registered.includes(currentUserEmail))) {
      activity.registered.push(currentUserEmail);
      registerUpdate(activity.id, activity.registered);

      swal('Success', 'You have registered for this activity', 'success', {
        timer: 2000,
      });
    }
  };

  const handleUnregister = () => {
    console.log('Unregistering from activity:', activity.name);
    if ((currentUserEmail !== null) // checks
      && (currentUserEmail !== undefined)
      && (activity.registered.includes(currentUserEmail))) {
      activity.registered.splice(activity.registered.indexOf(currentUserEmail), 1);
      registerUpdate(activity.id, activity.registered);

      swal('Success', 'You have unregistered for this activity', 'success', {
        timer: 2000,
      });
    }
  };

  return (
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
        {isRegistered ? ( // Ternary operator to show either Unregister or Sign Up
          <Button type="button" variant="danger" onClick={handleUnregister}>
            Unregister
          </Button>
        ) : (
          <Button type="button" variant="primary" onClick={handleSignUp}>
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
};

export default AddActivity;
