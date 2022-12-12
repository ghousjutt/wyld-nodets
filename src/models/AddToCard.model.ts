import mongoose, { Schema, Document } from "mongoose";

export interface IAddToCard extends Document {
  productColor: string;
  productSize: string;
  productQuantity: number;
  totalPrice: number;
  productId: string;
  userId: string;
  isPaymentDone: boolean;
}

const AddToCardSchema: Schema = new Schema(
  {
    productColor: { type: String, default: "" },
    productSize: { type: String, default: "" },
    productQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    userId: { type: String, default: "" },
    isPaymentDone: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAddToCard>("add_to_card", AddToCardSchema);
