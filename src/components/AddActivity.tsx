'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import swal from 'sweetalert';

const formatTime = (time: string) => {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  const formattedHour = hourInt % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${month}-${day}-${year}`;
};

const AddActivity = ({ activity, owner, currentUserEmail, currentUserRole, isRegistered }:
{
  activity: Activity,
  owner: string,
  currentUserEmail: string | null | undefined,
  currentUserRole: string,
  isRegistered: boolean
}) => {
  const [registeredUsers, setRegisteredUsers] = useState(activity.registered);

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(`/api/activity/${activity.id}`);
      const updatedActivity = await response.json();
      setRegisteredUsers(updatedActivity.registered);
    };

    fetchActivity();
  }, [activity.id]); // Ensure activity.id is included in the dependency array

  const handleSignUp = async () => {
    if (!currentUserEmail) {
      swal('Error', 'You need to sign in to register for an activity', 'error', { timer: 2000 });
    } else if (registeredUsers.includes(currentUserEmail)) {
      swal('Error', 'You are already registered for this activity', 'error', { timer: 2000 });
    } else {
      setRegisteredUsers([...registeredUsers, currentUserEmail]);

      const response = await fetch(`/api/activity/${activity.id}/register`, {
        method: 'POST',
        body: JSON.stringify({ email: currentUserEmail }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        setRegisteredUsers(registeredUsers);
        swal('Error', 'Failed to register for the activity', 'error', { timer: 2000 });
      } else {
        swal('Success', 'You have registered for this activity', 'success', { timer: 2000 });
      }
    }
  };

  const handleUnregister = async () => {
    if (!currentUserEmail) {
      swal('Error', 'You need to sign in to unregister for an activity', 'error', { timer: 2000 });
    } else {
      setRegisteredUsers(registeredUsers.filter(user => user !== currentUserEmail));

      const response = await fetch(`/api/activity/${activity.id}/unregister`, {
        method: 'POST',
        body: JSON.stringify({ email: currentUserEmail }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        setRegisteredUsers([...registeredUsers, currentUserEmail]);
        swal('Error', 'Failed to unregister for the activity', 'error', { timer: 2000 });
      } else {
        swal('Success', 'You have unregistered for this activity', 'success', { timer: 2000 });
      }
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
          {registeredUsers.length}
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
        {((owner === currentUserEmail) || (currentUserRole === 'ADMIN')) && (
          <Button type="button" variant="danger" className="ms-auto" onClick={() => handleEdit(activity.id)}>
            Edit
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default AddActivity;
