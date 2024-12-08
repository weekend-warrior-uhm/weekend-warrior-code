import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark">
    <Container>
      <Row className="text-center" style={{ color: 'white' }}>
        <Col>
          <h5>Weekend Warrior</h5>
          <p>ICS 314 Final Project</p>
          <a style={{ color: 'white' }} href="https://weekend-warrior-uhm.github.io">
            https://weekend-warrior-uhm.github.io
          </a>
        </Col>
        <Col>
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a style={{ color: 'white' }} href="/contact-support">Contact & Support</a></li>
            <li><a style={{ color: 'white' }} href="/safety">Safety Reminders</a></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
