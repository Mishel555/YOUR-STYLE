import * as yup from 'yup';

const scheme = yup.object().shape({
  firstName: yup.string().required('requiredFirstName'),
  lastName: yup.string().required('requiredLastName'),
  address: yup.string().required('requiredAddress'),
  phone_number: yup.string().required('requiredPhone'),
  dateOfBirth: yup.string().required('invalidDate').min(1, 'invalidDate'),
  gender: yup.string().required('requiredGender'),
});

export default scheme;
