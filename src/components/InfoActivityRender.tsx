'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { Activity } from '@prisma/client';
import '../app/home.css'; // Import the CSS file

const InfoActivityRender = ({ activity }: { activity: Activity }) => (
  <Container>
    <Container className="py-3 activity-info-box">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center">
            <h1>{activity.name}</h1>
            <hr />
            <p>Welcome to the activity info page!</p>
            <p>Here, the owner of the activity can post important information to those attending the event</p>
            <p>Additionally, they can follow up with the registered users by posting here</p>
            <p>Only those who registered to the activity can see this information</p>
            <p>Please contact the owner of this activity for inquiries:</p>
            <h4>
              {activity.author}
              &nbsp;-&nbsp;
              {activity.author_email}
            </h4>
          </Col>
        </Col>
      </Row>
    </Container>
    <Container className="py-3 activity-info-box">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center">
            <h3>Message from Activity Owner</h3>
            <hr />
            <p>{activity.message}</p>
          </Col>
        </Col>
      </Row>
    </Container>
    <Container className="py-3 activity-info-box">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center">
            <h3>Follow up from Activity Owner</h3>
            <hr />
            <p>No follow up has been posted yet</p>
          </Col>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default InfoActivityRender;
