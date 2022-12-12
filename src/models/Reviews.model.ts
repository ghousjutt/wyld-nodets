import mongoose, { Schema, Document } from "mongoose";

export interface IRewiev extends Document {
  userId: string;
  productId: string;
  description: string;
  starts: number;
}

const ReviewSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "customers" },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    description: { type: String, default: "" },
    starts: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRewiev>("reviews", ReviewSchema);
