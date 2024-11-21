'use client';

import { useSession } from 'next-auth/react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
// import { redirect } from 'next/navigation';
import { addStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStuffSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: { name: string; quantity: number; owner: string; condition: string }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addStuff(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const ShowUsers: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStuffSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  /* This makes it so that you don't have to be signed in to access
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  */

  console.log(currentUser, register, handleSubmit, reset, errors, onSubmit);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Users</h2>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowUsers;
