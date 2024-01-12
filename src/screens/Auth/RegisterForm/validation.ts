import * as yup from 'yup';

const scheme = yup.object().shape({
  email: yup.string().matches(
    /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    'validateEmail',
  ).required('requiredEmail'),
  password: yup.string().min(8, 'validatePassword').required('requiredPassword'),
  confirm: yup.string().required('Confirm can not be empty')
    .oneOf([yup.ref('password'), null], 'confirmedPassword'),
});

export default scheme;
