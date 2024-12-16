'use client';

import { Button, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Prisma, Activity } from '@prisma/client';
import { ReportActivitySchema } from '@/lib/validationSchemas';
import { submitReport } from '@/lib/dbActions';

type ReportInput = Prisma.ReportCreateInput;

const ReportActivityForm = ({ activity, show, handleClose }:
{ activity: Activity, show: boolean, handleClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportInput>({
    resolver: yupResolver(ReportActivitySchema),
  });

  const onSubmit = async (data: ReportInput) => {
    await submitReport({
      ...data,
    });
    swal('Success', 'The activity has been reported', 'success', {
      timer: 2000,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Report Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formActivityName">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={activity.name}
              {...register('activityName')}
              className={`form-control ${errors.activityName ? 'is-invalid' : ''}`}
            />
          </Form.Group>
          <Form.Group controlId="formActivityName">
            <Form.Label>Activity ID</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={activity.id}
              {...register('activityId')}
              className={`form-control ${errors.activityId ? 'is-invalid' : ''}`}
            />
          </Form.Group>
          <Form.Group controlId="formActivityAuthor" className="mt-3">
            <Form.Label>Activity Creator</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={activity.author}
              {...register('activityAuthor')}
              className={`form-control ${errors.activityAuthor ? 'is-invalid' : ''}`}
            />
          </Form.Group>
          <Form.Group controlId="formReportText" className="mt-3">
            <Form.Label>Report</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={500}
              placeholder="Enter your report here (max 500 characters)"
              {...register('reportText')}
              className={`form-control ${errors.reportText ? 'is-invalid' : ''}`}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit Report
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportActivityForm;
