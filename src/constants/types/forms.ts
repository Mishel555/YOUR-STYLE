interface ILoginForm {
  email: string;
  password: string;
}

interface IRegisterForm {
  email: string;
  password: string;
  confirm: string;
}

interface IFillDetails {
  firstName: string;
  lastName: string;
  address: string;
  phone_number: string;
  gender: string;
  dateOfBirth: string;
}

interface IOrderForm {
  address: string;
  delivery_phone: string;
  descriptionCustomer: string;
}

interface IAccountDetailsForm {
  address: string;
  phone_number: string;
}

export type {
  ILoginForm,
  IOrderForm,
  IRegisterForm,
  IFillDetails,
  IAccountDetailsForm,
};
