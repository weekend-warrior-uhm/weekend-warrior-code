'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  gender: string;
  interests: string;
};

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    username: Yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
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
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    const userData = {
      ...data,
      interests: data.interests.split(',').map(interest => interest.trim()),
    };
    await createUser(userData);
    await signIn('credentials', { callbackUrl: '/', ...data });
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign Up</h1>
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
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
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
                    <Form.Label>Interests</Form.Label>
                    <input
                      type="text"
                      {...register('interests')}
                      className={`form-control ${errors.interests ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.interests?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Register
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
              <Card.Footer>
                Already have an account?
                {' '}
                <a href="/auth/signin">Sign in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
