'use client';

import { Stuff } from '@prisma/client';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

/* Renders a single contact. See list/page.tsx. */
const ContactCard = ({ contact }: { contact : Contact }) => (
  <Card>
    <td>{name}</td>
    <td>{quantity}</td>
    <td>{condition}</td>
    <td>
      <Link href={`/edit/${id}`}>Edit</Link>
    </td>
  </Card>
);

export default ContactCard;
