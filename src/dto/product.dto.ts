import * as yup from "yup";

export const createDto = yup.object().shape({
  productCategoryId: yup.string().required(),
  productSubCategoryId: yup.string().required(),
  productCategoryName: yup.string().required(),
  numberOfVariants: yup.number().required(),
  variantsText: yup.array().required(),
  images: yup.array().required(),
  sizes: yup
    .array()
    .required()
    .of(
      yup.object().shape({
        size: yup.string(),
        quantity: yup.number(),
      })
    ),
  description: yup.string().required(),
  price: yup.number().required(),
  mainImage: yup.string().required(),
  colorVariantImages: yup.array().required(),
  totalProducts: yup.number().required(),
  featuredImage: yup.string(),
});

export const updateDto = yup.object().shape({
  productId: yup.string().required(),
  numberOfVariants: yup.number(),
  variantsText: yup.array(),
  images: yup.array(),
  description: yup.string(),
  price: yup.number(),
  mainImage: yup.string(),
  colorVariantImages: yup.array(),
  totalProducts: yup.number(),
  featuredImage: yup.string(),
});

export const updateReviewDto = yup.object().shape({
  productId: yup.string().required(),
  name: yup.string().required(),
  image: yup.string().required(),
  text: yup.string().required(),
  rating: yup.number().required(),
});

export const updateSizeDto = yup.object().shape({
  productId: yup.string().required(),
  size: yup.string().required(),
  quantity: yup.number().required(),
});
