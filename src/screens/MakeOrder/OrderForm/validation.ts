import * as yup from 'yup';

const scheme = yup.object().shape({
  address: yup.string().required('Address can not be empty'),
  delivery_phone: yup.string().required('Phone can not be empty'),
  descriptionCustomer: yup.string(),
});

export default scheme;
