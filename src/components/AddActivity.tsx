'use client';

import { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import { registerUpdateMain, registerUpdateMy } from '@/lib/dbActions';
import swal from 'sweetalert';
import ReportActivity from './ReportActivity';
import './component.css'; // Renamed to component.css as needed

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

const AddActivity = ({ activity, owner, currentUserEmail, currentUserRole, isRegistered, kind }: {
  activity: Activity,
  owner: string,
  currentUserEmail: string | null | undefined,
  currentUserRole: string,
  isRegistered: boolean,
  kind: string,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleSignUp = () => {
    console.log('Signing up for activity:', activity.name);
    if ((currentUserEmail == null) || (currentUserEmail === undefined)) {
      swal('Error', 'You need to sign in to register for an activity', 'error', {
        timer: 2000,
      });
    } else if (activity.registered.includes(currentUserEmail)) {
      swal('Error', 'You are already registered for this activity', 'error', {
        timer: 2000,
      });
    } else {
      activity.registered.push(currentUserEmail);
      if (kind === 'main') {
        registerUpdateMain(activity.id, activity.registered);
      } else {
        registerUpdateMy(activity.id, activity.registered);
      }

      swal('Success', 'You have registered for this activity', 'success', {
        timer: 2000,
      });
    }
  };

  const handleUnregister = () => {
    console.log('Unregistering from activity:', activity.name);
    if ((currentUserEmail == null) || (currentUserEmail === undefined)) {
      swal('Error', 'You need to sign in to unregister for an activity', 'error', {
        timer: 2000,
      });
    } else if (activity.registered.includes(currentUserEmail)) {
      activity.registered.splice(activity.registered.indexOf(currentUserEmail), 1);

      if (kind === 'main') {
        registerUpdateMain(activity.id, activity.registered);
      } else {
        registerUpdateMy(activity.id, activity.registered);
      }

      swal('Success', 'You have unregistered for this activity', 'success', {
        timer: 2000,
      });
    }
  };

  const handleEdit = (id: number) => {
    window.location.href = `/edit/${id}`;
  };

  const handleInfoRedirect = (id: number) => {
    window.location.href = `/info/${id}`;
  };

  const handleShowReportModal = () => setShowReportModal(true);
  const handleCloseReportModal = () => setShowReportModal(false);

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
          Activity by:
          {activity.author}
        </Card.Text>
        <Card.Text>
          Total Registered Users:
          {activity.registered.length}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row className="g-2">
          <Col>
            {isRegistered ? (
              <Button
                type="button"
                variant="danger"
                onClick={handleUnregister}
                className="customButton w-100"
              >
                Unregister
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleSignUp}
                className="customButton w-100"
              >
                Sign Up
              </Button>
            )}
          </Col>
          <Col>
            {((owner === currentUserEmail) || (currentUserRole === 'ADMIN')) && (
              <Button
                type="button"
                variant="danger"
                onClick={() => handleEdit(activity.id)}
                className="customButton w-100"
              >
                Edit/Delete
              </Button>
            )}
          </Col>
          <Col>
            {(kind === 'my') && (
              <Button
                type="button"
                variant="dark"
                onClick={() => handleInfoRedirect(activity.id)}
                className="customButton w-100"
              >
                Activity Info
              </Button>
            )}
          </Col>
          <Col>
            {owner !== currentUserEmail && (
              <>
                <Button
                  type="button"
                  variant="warning"
                  onClick={handleShowReportModal}
                  className="customButton w-100"
                >
                  Report
                </Button>
                <ReportActivity activity={activity} show={showReportModal} handleClose={handleCloseReportModal} />
              </>
            )}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default AddActivity;
