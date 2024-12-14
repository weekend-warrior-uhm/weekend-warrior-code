import { Activity } from '@prisma/client';

/* Renders a single row in the List Activities table. See list/page.tsx. */
const ActivityItemAdmin = ({ name, description, location, date, time, author, author_email, duration,
  registered, message, id }: Activity) => (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{location}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{author}</td>
      <td>{author_email}</td>
      <td>{duration}</td>
      <td>{registered.join(', ')}</td>
      <td>{message}</td>
      <td>
        <a href={`/edit/${id}`}>Edit</a>
      </td>
    </tr>
);

export default ActivityItemAdmin;
