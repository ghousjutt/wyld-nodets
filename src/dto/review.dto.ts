import * as yup from "yup";

export const createDto = yup.object().shape({
  productId: yup.string().required(),
  description: yup.string().required(),
  starts: yup.number().required(),
});

export const updateDto = yup.object().shape({
  reviewId: yup.string().required(),
  starts: yup.number(),
  description: yup.string(),
});
