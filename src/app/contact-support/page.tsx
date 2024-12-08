/* eslint-disable max-len */
import React from 'react';
import { Container } from 'react-bootstrap';

const ContactSupport = () => (
  <main>
    <Container className="py-5">
      <h2>Contact & Support</h2>

      <section>
        <h3>Contact Us</h3>
        <p>If you have any questions or need support, please feel free to reach out to us.</p>
        <p>Email: support@weekendwarrior.com</p>
        <p>Phone: +1-800-123-4567</p>
      </section>

      <section>
        <h3>FAQs</h3>
        <ul>
          <li>
            How do I create an account? Click on the &quot;Sign Up&quot; button on the homepage and fill in your details.
          </li>
          <li>
            How do I join an activity? Navigate to the &quot;Activities&quot; page and click on &quot;Join&quot; for the desired activity.
          </li>
          <li>
            How do I create an activity? Go to the &quot;Activities&quot; page and click on &quot;Create Activity.&quot; Fill out the form and submit.
          </li>
          <li>
            How do I manage my account? Click on your profile icon, select &quot;Account Settings,&quot; and update your information.
          </li>
          <li>
            How do I report an issue? Go to the &quot;Contact&quot; page and fill out the form, or email us directly at support@weekendwarrior.com.
          </li>
        </ul>
      </section>

      <section>
        <h3>Additional Resources</h3>
        <p>Community Guidelines: Ensure a safe and respectful experience for all users.</p>
        <p>Privacy Policy: Learn more about how we protect your data.</p>
        <p>Terms of Service: Review the terms and conditions that govern the use of our service.</p>
      </section>
    </Container>
  </main>
);

export default ContactSupport;
