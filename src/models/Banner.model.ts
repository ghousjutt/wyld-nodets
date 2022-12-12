import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  bannerImage: string;
  bannerText: string;
}

const BannerSchema: Schema = new Schema(
  {
    bannerImage: { type: String, default: "" },
    bannerText: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBanner>("banners", BannerSchema);
