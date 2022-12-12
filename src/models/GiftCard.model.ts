import mongoose, { Schema, Document } from "mongoose";

export interface IGiftCard extends Document {
  amountinPercent: number;
  discountCode: string;
  isExpired: boolean;
}

const GiftCardSchema: Schema = new Schema(
  {
    cardPrice: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    expiryDate: { type: Date, default: Date.now() },
    isExpired: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGiftCard>("gift_cards", GiftCardSchema);
