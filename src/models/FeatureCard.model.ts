import mongoose, { Schema, Document } from "mongoose";

export interface FeatureCard extends Document {
  image: string;
  description: string;
  price: number;
  type: string;
}

const FeatureCardSchema: Schema = new Schema(
  {
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    type: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<FeatureCard>("feature_cards", FeatureCardSchema);
