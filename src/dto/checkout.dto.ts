import * as yup from "yup";

export const createDto = yup.object().shape({
  token: yup.string().required(),
  amount: yup.number().required(),
});
