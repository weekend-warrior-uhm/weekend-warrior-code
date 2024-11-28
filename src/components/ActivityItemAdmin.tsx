import { Activity } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ActivityItemAdmin = ({ name, description, location, date, time, author, author_email, id }: Activity) => (
  <tr>
    <td>{name}</td>
    <td>{description}</td>
    <td>{location}</td>
    <td>{date}</td>
    <td>{time}</td>
    <td>{author}</td>
    <td>{author_email}</td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default ActivityItemAdmin;
