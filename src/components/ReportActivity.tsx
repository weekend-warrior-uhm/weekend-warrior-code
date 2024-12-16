'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { Activity } from '@prisma/client';

const ReportActivity = (
  { activity, show, handleClose }:
  { activity: Activity, show: boolean, handleClose: () => void },
) => {
  const [reportText, setReportText] = useState('');

  const handleReportSubmit = async () => {
    if (reportText.length > 500) {
      swal('Error', 'Report text must be 500 characters or less', 'error', {
        timer: 2000,
      });
      return;
    }
    // Call the server-side function to create the report
    await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activity.id,
        activityName: activity.name,
        activityAuthor: activity.author,
        reportText,
      }),
    });
    swal('Success', 'Your report has been submitted', 'success', {
      timer: 2000,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formActivityName">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control type="text" readOnly value={activity.name} />
          </Form.Group>
          <Form.Group controlId="formActivityAuthor" className="mt-3">
            <Form.Label>Activity Creator</Form.Label>
            <Form.Control type="text" readOnly value={activity.author} />
          </Form.Group>
          <Form.Group controlId="formReportText" className="mt-3">
            <Form.Label>Report</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={500}
              placeholder="Enter your report here (max 500 characters)"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleReportSubmit}>
          Submit Report
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportActivity;
