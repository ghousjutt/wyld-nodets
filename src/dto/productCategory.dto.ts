import * as yup from "yup";

export const createDto = yup.object().shape({
  businessId: yup.string(),
  title: yup.string().required(),
  image: yup.string().required(),
  type: yup.string().required(),
});

export const updateDto = yup.object().shape({
  productCategoryId: yup.string().required(),
  title: yup.string(),
  image: yup.string(),
});
