'use client';

import { Col, Container, Row, Button } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import '../app/home.css'; // Import the CSS
import { deleteActivity } from '@/lib/dbActions';

const cancelDelete = () => {
  window.location.href = '/activities/';
};

const DeleteActivityConfirm = ({ activity }: { activity: Activity }) => (
  <Container>
    <Container className="py-3 activity-info-box">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center">
            <h4>
              Are you sure you would like to delete the activity
              <br />
            </h4>
            <h2>
              {activity.name}
              ?
            </h2>
          </Col>
        </Col>
      </Row>
    </Container>
    <Container className="py-3 delete-button-box">
      <Row>
        <Col>
          <Button type="submit" onClick={() => deleteActivity(activity.id)} variant="danger">
            Delete
          </Button>
        </Col>
        <Col>
          <Button type="button" onClick={() => cancelDelete()} variant="secondary">
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default DeleteActivityConfirm;
