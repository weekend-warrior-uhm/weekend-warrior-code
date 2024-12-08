'use client';

import { Card, Button } from 'react-bootstrap';
import { Activity } from '@prisma/client';

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

const ActivityCard = ({ activity, handleEdit, isRegistered, handleSignUp, handleUnregister }:
{
  activity: Activity,
  handleEdit: (id: number) => void,
  isRegistered: boolean,
  handleSignUp: () => void,
  handleUnregister: () => void,
}) => (
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
      <Button type="button" variant="danger" className="ms-auto" onClick={() => handleEdit(activity.id)}>
        Edit
      </Button>
    </Card.Footer>
  </Card>
);

export default ActivityCard;
