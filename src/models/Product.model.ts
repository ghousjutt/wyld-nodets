import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productCategoryId: string;
  productSubCategoryId: string;
  productCategoryName: string;
  name: string;
  numberOfVariants: number;
  variantsText: Array<String>;
  colors: Array<String>;
  images: Array<String>;
  description: string;
  deliveryAndReturns: string;
  totalProducts: Number;
  price: number;
  gender: string;
  featuredImage: string;
  likeProductUsers: Array<String>;
  isLike: Boolean;
  reviews: Array<{
    name: string;
    image: string;
    text: string;
    rating: number;
    date: Date;
  }>;
  sizes: Array<{
    size: string;
    quantity: number;
  }>;
  mainImage: string;
  colorVariantImages: Array<{
    color: string;
    image: string;
  }>;
}

const ProductSchema: Schema = new Schema(
  {
    productCategoryId: { type: String, default: '' },
    productSubCategoryId: { type: String, default: '' },
    productCategoryName: { type: String, default: '' },
    name: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    gender: { type: String, default: '' },
    numberOfVariants: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    variantsText: { type: [String], default: [] },
    images: { type: [String], default: [] },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    deliveryAndReturns: { type: String, default: '' },
    colors: { type: [String], default: [] },
    likeProductUsers: [{ type: Schema.Types.ObjectId, ref: 'customers' }],
    isLike: { type: Boolean, default: false },
    reviews: {
      type: [
        {
          name: String,
          image: String,
          text: String,
          rating: Number,
          date: Date,
        },
      ],
      default: [],
    },
    sizes: {
      type: [
        {
          size: String,
          quantity: Number,
        },
      ],
      default: [],
    },
    mainImage: { type: String, default: '' },
    colorVariantImages: {
      type: [
        {
          color: String,
          image: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('products', ProductSchema);
