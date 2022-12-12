import * as yup from "yup";

export const createDto = yup.object().shape({
  categoryId: yup.string().required(),
  title: yup.string().required(),
  image: yup.string().required(),
});

export const updateDto = yup.object().shape({
  productSubCategoryId: yup.string().required(),
  title: yup.string(),
  image: yup.string(),
});
