import * as yup from "yup";

export const authDto = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
});

export const registerDto = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
  profileImagePath: yup.string(),
});

export const changePasswordDto = yup.object().shape({
  userId: yup.string().required(),
  oldPassword: yup.string().trim().required(),
  newPassword: yup.string().trim().required(),
});

export const sendPasswordLinkDto = yup.object().shape({
  email: yup.string().required().email(),
});
