import * as yup from "yup";

export const createDto = yup.object().shape({
  bannerImage: yup.string().required(),
  bannerText: yup.string().required(),
});

export const updateDto = yup.object().shape({
  bannerId: yup.string().required(),
  bannerImage: yup.string(),
  bannerText: yup.string(),
});
