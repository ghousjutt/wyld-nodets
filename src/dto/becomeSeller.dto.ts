import * as yup from "yup";

export const createDto = yup.object().shape({
  companyName: yup.string(),
  country: yup.string().required(),
  contactPerson: yup.string().required(),
  phoneNumber: yup.string().required(),
  email: yup.string().required(),
  websiteAddress: yup.string().required(),
  aboutYourBrand: yup.string().required(),
  otherInfo: yup.string().required(),
});
