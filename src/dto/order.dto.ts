import * as yup from "yup";

export const createDto = yup.object().shape({});

export const updateDto = yup.object().shape({
  orderId: yup.string().required(),
});
