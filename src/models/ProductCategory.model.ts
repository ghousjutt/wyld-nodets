import mongoose, { Schema, Document } from "mongoose";

export interface IProductCategory extends Document {
  businessId: string;
  title: string;
  image: string;
  subCategories: [string];
}

const ProductCategorySchema: Schema = new Schema(
  {
    businessId: { type: String, default: "" },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "product_sub_categories",
      },
    ],
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    type: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProductCategory>(
  "product_categories",
  ProductCategorySchema
);
