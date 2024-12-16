/* eslint-disable max-len */
import React from 'react';
import { Container } from 'react-bootstrap';
import '../home.css'; // Import the CSS file

const ContactSupport = () => (
  <main>
    <Container className="py-5 info-box">
      <h1>Contact & Support</h1>

      <section>
        <h3>Contact Us</h3>
        <p>If you have any questions or need support, please feel free to reach out to us.</p>
        <p>Email: support@weekendwarrior.com</p>
        <p>Phone: +1-800-123-4567</p>
      </section>

      <section>
        <h3>FAQs</h3>
        <li>
          How do I create an account?
          <br />
          Click on the &quot;Sign Up&quot; button on the homepage and fill in your details.
        </li>
        <br />
        <li>
          How do I join an activity?
          <br />
          Navigate to the &quot;Activities&quot; page and click on &quot;Join&quot; for the desired activity.
        </li>
        <br />
        <li>
          How do I create an activity?
          <br />
          Go to the &quot;Activities&quot; page and click on &quot;Create Activity.&quot; Fill out the form and submit.
        </li>
        <br />
        <li>
          How do I manage my account?
          <br />
          Click on your profile icon, select &quot;Account Settings,&quot; and update your information.
        </li>
        <br />
        <li>
          How do I report an issue?
          <br />
          Go to the &quot;Contact&quot; page and fill out the form, or email us directly at support@weekendwarrior.com.
        </li>
      </section>

      <br />

      <section>
        <h3>Additional Resources</h3>
        <li>Community Guidelines: Ensure a safe and respectful experience for all users.</li>
        <li>Privacy Policy: Learn more about how we protect your data.</li>
        <li>Terms of Service: Review the terms and conditions that govern the use of our service.</li>
      </section>
    </Container>
  </main>
);

export default ContactSupport;
