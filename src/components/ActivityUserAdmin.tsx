import { User } from '@prisma/client';

/* Renders a single row in the List Activities table. See list/page.tsx. */
const ActivityUserAdmin = ({ email, username, fullName, phone, gender, interests, role,
}: User) => (
  <tr>
    <td>{email}</td>
    <td>{username}</td>
    <td>{fullName}</td>
    <td>{phone}</td>
    <td>{gender}</td>
    <td>{interests.join(', ')}</td>
    <td>{role}</td>
  </tr>
);

export default ActivityUserAdmin;
