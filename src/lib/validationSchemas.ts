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
  duration: Yup.number().required(),
  registered: Yup.array().of(Yup.string()).required(),
});

export const test = Yup.object({
  name: Yup.string().required(),
});
