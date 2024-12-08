import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center" style={{ color: 'white' }}>
        Weekend Warrior
        <br />
        ICS 314 Final Project
        <br />
        <a style={{ color: 'white' }} href="https://bowfolios.github.io">
          https://weekend-warrior-uhm.github.io
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
