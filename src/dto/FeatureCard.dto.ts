import * as yup from "yup";

export const createDto = yup.object().shape({
  image: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  type: yup.string().required(),
});

export const updateDto = yup.object().shape({
  featureCardId: yup.string().required(),
  image: yup.string(),
  description: yup.string(),
  price: yup.number(),
  type: yup.string(),
});
