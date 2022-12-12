import * as yup from "yup";

export const createDto = yup.object().shape({
  amountinPercent: yup.number().required(),
  discountCode: yup.string().required(),
});

export const updateDto = yup.object().shape({
  discountId: yup.string().required(),
});
