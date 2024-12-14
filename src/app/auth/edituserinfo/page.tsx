// src/app/auth/edituserinfo/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { updateUser } from '@/lib/dbActions';

type EditUserForm = {
  email: string;
  username: string;
  fullName: string;
  phone: string;
  gender: string;
  interests: string;
};

const EditUser = () => {
  const { data: session } = useSession();
  const currentUser = session?.user as {
    email: string;
    username?: string;
    fullName?: string;
    phone?: string;
    gender?: string;
    interests?: string[];
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    username: Yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
    fullName: Yup.string().required('Full name is required'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number is invalid'),
    gender: Yup.string().required('Gender is required'),
    interests: Yup.string().required('Interests are required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: currentUser?.email || '',
      username: currentUser?.username || '',
      fullName: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
      gender: currentUser?.gender || '',
      interests: currentUser?.interests?.join(', ') || '',
    },
  });

  const onSubmit = async (data: EditUserForm) => {
    const userData = {
      ...data,
      interests: data.interests.split(',').map(interest => interest.trim()),
    };
    await updateUser(userData);
  };

  return (
    <main>
      <Container style={{ padding: '20px 0' }}>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Edit User Information</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      {...register('username')}
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Full Name</Form.Label>
                    <input
                      type="text"
                      {...register('fullName')}
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.fullName?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Phone Number</Form.Label>
                    <input
                      type="text"
                      {...register('phone')}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.phone?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Gender</Form.Label>
                    <select
                      {...register('gender')}
                      className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="invalid-feedback">{errors.gender?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Interests (separate each with a comma)</Form.Label>
                    <input
                      type="text"
                      {...register('interests')}
                      placeholder="e.g., Hiking, Swimming, Reading"
                      className={`form-control ${errors.interests ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.interests?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Save Changes
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditUser;
