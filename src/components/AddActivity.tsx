'use client';

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import swal from 'sweetalert';

/**
 * Formats a given time string (in 24-hour format) to 12-hour format with AM/PM.
 */
const formatTime = (time: string) => {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  const formattedHour = hourInt % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

/**
 * Formats a given date string (in YYYY-MM-DD format) to MM-DD-YYYY format.
 */
const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${month}-${day}-${year}`;
};

const AddActivity = ({ activity, currentUserEmail, currentUserRole }: {
  activity: Activity,
  currentUserEmail: string | null | undefined,
  currentUserRole: string,
}) => {
  const [isRegistered, setIsRegistered] = useState(activity.registered.includes(currentUserEmail ?? ''));

  const handleSignUp = async () => {
    if (!currentUserEmail) {
      swal('Error', 'You need to sign in to register for an activity', 'error', { timer: 2000 });
    } else if (isRegistered) {
      swal('Error', 'You are already registered for this activity', 'error', { timer: 2000 });
    } else {
      const updatedRegistered = [...activity.registered, currentUserEmail];
      setIsRegistered(true);
      await fetch('/api/registerUpdate', {
        method: 'POST',
        body: JSON.stringify({ id: activity.id, registered: updatedRegistered }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      swal('Success', 'You have registered for this activity', 'success', { timer: 2000 });
    }
  };

  const handleUnregister = async () => {
    if (!currentUserEmail) {
      swal('Error', 'You need to sign in to unregister for an activity', 'error', { timer: 2000 });
    } else if (isRegistered) {
      const updatedRegistered = activity.registered.filter(email => email !== currentUserEmail);
      setIsRegistered(false);
      await fetch('/api/registerUpdate', {
        method: 'POST',
        body: JSON.stringify({ id: activity.id, registered: updatedRegistered }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      swal('Success', 'You have unregistered for this activity', 'success', { timer: 2000 });
    }
  };

  const handleEdit = (id: number) => {
    window.location.href = `/edit/${id}`;
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
          {formatDate(activity.date)}
          &nbsp;@&nbsp;
          {formatTime(activity.time)}
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
        {isRegistered ? (
          <Button type="button" variant="danger" onClick={handleUnregister}>
            Unregister
          </Button>
        ) : (
          <Button type="button" variant="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        )}
        {((activity.author_email === currentUserEmail) || (currentUserRole === 'ADMIN')) && (
          <Button type="button" variant="danger" className="ms-auto" onClick={() => handleEdit(activity.id)}>
            Edit
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default AddActivity;
