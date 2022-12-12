import mongoose, { Schema, Document } from "mongoose";

export interface ISubProductCategory extends Document {
  categoryId: string;
  title: string;
  image: string;
}

const ProductSubCategorySchema: Schema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "product_categories" },
    title: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubProductCategory>(
  "product_sub_categories",
  ProductSubCategorySchema
);
