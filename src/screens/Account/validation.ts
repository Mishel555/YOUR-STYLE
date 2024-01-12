import * as yup from 'yup';

const scheme = yup.object().shape({
  address: yup.string().required('requiredAddress'),
  phone_number: yup.string().required('requiredPhone'),
});

export default scheme;
