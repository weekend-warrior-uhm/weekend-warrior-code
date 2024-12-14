'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Activity } from '@prisma/client';
import { CreateActivitySchema } from '@/lib/validationSchemas';
import { createActivity } from '@/lib/dbActions';

const onSubmit = async (data: Activity) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  const cleanedData = {
    ...data,
    registered: [],
    followup: '',
  };
  await createActivity(cleanedData);
  swal('Success', 'The activity has been updated', 'success', {
    timer: 2000,
  });
};

const CreateActivityForm = ({ currentUserName, currentUserEmail }:
{ currentUserName: string, currentUserEmail: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Activity>({
    resolver: yupResolver(CreateActivitySchema),
  });

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Create Activity</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    required
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    required
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <input
                    type="date"
                    {...register('date')}
                    required
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.date?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <input
                    type="time"
                    {...register('time')}
                    required
                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.time?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Duration</Form.Label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('duration')}
                    required
                    className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.duration?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <input
                    type="text"
                    {...register('message')}
                    required
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.message?.message}</div>
                  <Form.Text className="text-muted">
                    Only registered users will be able to see this message.
                  </Form.Text>
                </Form.Group>
                <input type="hidden" {...register('author')} value={currentUserName} />
                <input type="hidden" {...register('author_email')} value={currentUserEmail} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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
  );
};

export default CreateActivityForm;
