import * as Yup from 'yup';

export const EditActivitySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  date: Yup.string().required(),
  time: Yup.string().required(),
  author: Yup.string().required(),
  author_email: Yup.string().required(),
  duration: Yup.number().positive().required(),
  registered: Yup.array().of(Yup.string()).required(), // Ensure this is validated as an array of strings
});

export const CreateActivitySchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  date: Yup.string().required(),
  time: Yup.string().required(),
  author: Yup.string().required(),
  author_email: Yup.string().required(),
  duration: Yup.number().positive().required(),
});

export const test = Yup.object({
  name: Yup.string().required(),
});
