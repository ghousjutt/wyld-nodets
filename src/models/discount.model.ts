import mongoose, { Schema, Document } from "mongoose";

export interface IDiscount extends Document {
  amountinPercent: number;
  discountCode: string;
  isExpired: boolean;
}

const DiscountSchema: Schema = new Schema(
  {
    amountinPercent: { type: Number, default: 0 },
    discountCode: { type: String, default: "" },
    isExpired: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDiscount>("discounts", DiscountSchema);
