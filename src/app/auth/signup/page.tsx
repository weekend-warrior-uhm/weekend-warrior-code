'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
} from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  firstName: string;
  lastName: string;
  username: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: string;
};

/** The sign up page */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .matches(/^[A-Za-z]+$/, 'First Name must contain only letters'),
    lastName: Yup.string()
      .required('Last Name is required')
      .matches(/^[A-Za-z]+$/, 'Last Name must contain only letters'),
    username: Yup.string()
      .required('Username is required')
      .matches(/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'),
    contactNumber: Yup.string()
      .required('Contact Number is required')
      .matches(/^[0-9]+$/, 'Contact Number must be a valid number'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    gender: Yup.string().oneOf(
      ['Male', 'Female', 'Other', 'Prefer not to say'],
      'Invalid Gender',
    ),
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
    await createUser(data);
    await signIn('credentials', {
      callbackUrl: '/',
      ...data,
    });
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
                    <Form.Label>First Name</Form.Label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className={`form-control ${
                        errors.firstName ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.firstName?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Last Name</Form.Label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={`form-control ${
                        errors.lastName ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.lastName?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      {...register('username')}
                      className={`form-control ${
                        errors.username ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.username?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Contact Number</Form.Label>
                    <input
                      type="text"
                      {...register('contactNumber')}
                      className={`form-control ${
                        errors.contactNumber ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.contactNumber?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${
                        errors.confirmPassword ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPassword?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Gender</Form.Label>
                    <select
                      {...register('gender')}
                      className={`form-control ${
                        errors.gender ? 'is-invalid' : ''
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                    <div className="invalid-feedback">
                      {errors.gender?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Register
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type="button"
                          onClick={() => reset()}
                          className="btn btn-warning float-right"
                        >
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                Already have an account?
                <a href="/auth/signin"> Sign in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
