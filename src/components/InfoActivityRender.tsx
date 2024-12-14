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
            <span>Here, the owner of the activity can post important information to those attending the event</span>
            <br />
            <span>Additionally, they can follow up with the registered users by posting here</span>
            <br />
            <span>Only those who registered to the activity can see this information</span>
            <p>
              Please contact the activity organizer&nbsp;
              <u>
                {activity.author}
                &nbsp;(
                {activity.author_email}
                )
              </u>
              &nbsp;if you have any questions
            </p>
            <br />
            <h4>Registered Users:</h4>
            {activity.registered.length > 0 ? (
              activity.registered.map((user) => (
                <p>
                  -&nbsp;
                  {user}
                </p>
              ))
            ) : (
              <p>No registered users.</p>
            )}
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
