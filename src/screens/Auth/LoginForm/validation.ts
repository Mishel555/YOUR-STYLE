import * as yup from 'yup';

const scheme = yup.object().shape({
  email: yup.string().required('requiredEmail'),
  password: yup.string().required('requiredPassword'),
});

export default scheme;
