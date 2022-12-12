import * as yup from "yup";

export const createDto = yup.object().shape({
  notificationText: yup.string().required(),
  userId: yup.string().required(),
  productId: yup.string(),
  orderId: yup.string(),
  AddToCardId: yup.string(),
  notificationType: yup.string(),
});

export const updateDto = yup.object().shape({
  notificationId: yup.string().required(),
  notificationText: yup.string().required(),
});

export const updateSeenDto = yup.object().shape({
  notificationId: yup.string().required(),
  isSeen: yup.boolean().required(),
});
