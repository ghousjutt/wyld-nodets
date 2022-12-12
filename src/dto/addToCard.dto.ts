import * as yup from "yup";

export const createDto = yup.object().shape({
  productColor: yup.string().required(),
  productSize: yup.string().required(),
  productQuantity: yup.number().required(),
  totalPrice: yup.number().required(),
  productId: yup.string().required(),
});

export const updateDto = yup.object().shape({
  addTocardId: yup.string().required(),
  productColor: yup.string(),
  productSize: yup.string(),
  productQuantity: yup.number(),
  totalPrice: yup.number(),
});
