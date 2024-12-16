import React from 'react';
import { Container } from 'react-bootstrap';
import '../home.css'; // Import the CSS file

const SafetyReminders = () => (
  <main>
    <Container className="py-5 info-box">
      <h1>Safety Reminders</h1>

      <section>
        <h3>General Safety Tips</h3>
        <li>
          <strong>Meet in Public Places: </strong>
          Always arrange to meet in well-lit, public places such as cafes, parks, or shopping centers.
        </li>
        <li>
          <strong>Inform Someone: </strong>
          Let a friend or family member know where you are going, who you are meeting, and when you expect to return.
        </li>
        <li>
          <strong>Trust Your Instincts: </strong>
          If something feels off or uncomfortable, do not hesitate to leave or cancel the meetup.
        </li>
      </section>

      <br />

      <section>
        <h3>Activity-Specific Tips</h3>
        <li>
          <strong>Hiking: </strong>
          Stay on marked trails, carry plenty of water, and be aware of your surroundings.
        </li>
        <li>
          <strong>Water Activities: </strong>
          Always wear a life jacket, even if you are a strong swimmer, and be mindful of weather conditions.
        </li>
        <li>
          <strong>Cycling: </strong>
          Wear a helmet, use bike lanes where available, and obey traffic signals.
        </li>
      </section>

      <br />

      <section>
        <h3>Emergency Preparedness</h3>
        <li>
          <strong>Have a Plan: </strong>
          Know the location of the nearest emergency services and have an emergency contact saved in your phone.
        </li>
        <li>
          <strong>Carry Essentials: </strong>
          Always bring a first aid kit, a charged phone, and any necessary medications.
        </li>
        <li>
          <strong>Stay Informed: </strong>
          Keep an eye on weather updates and any local advisories related to your planned activity.
        </li>
      </section>

      <br />

      <section>
        <h3>Additional Resources</h3>
        <li>
          For more detailed safety guidelines, visit our
          {' '}
          <a href="/community-guidelines">Community Guidelines</a>
          {' '}
          page.
        </li>
        <li>
          Learn about our data protection practices in our
          {' '}
          <a href="/privacy-policy">Privacy Policy</a>
          .
        </li>
        <li>
          Review the terms and conditions for using our service in our
          {' '}
          <a href="/terms-of-service">Terms of Service</a>
          .
        </li>
      </section>
    </Container>
  </main>
);

export default SafetyReminders;
