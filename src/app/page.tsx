import { Container } from 'react-bootstrap';
import Image from 'next/image';
import './Home.css'; // Make sure to import the CSS file

/** The Home page. */
const Home = () => (
  <main>
    <div id="landing-page">
      <Container className="info-box">
        <Image
          src="/images/WWLogo.png"
          alt="Weekend Warrior Logo"
          className="logo"
          width={500}
          height={500}
          priority // Ensures the image loads quickly
        />
        <h1>Welcome to Weekend Warrior!</h1>
        <p>
          Weekend Warrior is a Web App designed
          {' '}
          <br />
          to connect UH Manoa students and locals
          {' '}
          <br />
          interested in weekend outdoor activities.
        </p>
        <p>
          Our platform will help people find activity partners
          {' '}
          <br />
          with similar interests and schedules.
        </p>
      </Container>
    </div>
  </main>
);

export default Home;
