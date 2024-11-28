'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Activity } from '@prisma/client';
import { EditActivitySchema } from '@/lib/validationSchemas';
import { editActivity } from '@/lib/dbActions';

const onSubmit = async (data: Activity) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editActivity(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditActivityForm = ({ activity }: { activity: Activity }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Activity>({
    resolver: yupResolver(EditActivitySchema),
  });
  // console.log(activity);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Activity</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={activity.id} />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    defaultValue={activity.name}
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
                    defaultValue={activity.description}
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    defaultValue={activity.location}
                    required
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <input
                    type="text"
                    {...register('date')}
                    defaultValue={activity.date}
                    required
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.date?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <input
                    type="text"
                    {...register('time')}
                    defaultValue={activity.time}
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
                    defaultValue={activity.duration}
                    required
                    className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.duration?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('author')} value={activity.author} />
                <input type="hidden" {...register('author_email')} value={activity.author_email} />
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

export default EditActivityForm;
