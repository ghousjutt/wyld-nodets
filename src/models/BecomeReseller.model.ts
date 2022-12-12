import mongoose, { Schema, Document } from "mongoose";

export interface IReseller extends Document {
  companyName: string;
  country: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  websiteAddress: string;
  aboutYourBrand: string;
  otherInfo: string;
}

const ResellerSchema: Schema = new Schema(
  {
    name: { type: String, default: "" },
    companyName: { type: String, default: "" },
    country: { type: String, default: "" },
    contactPerson: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    email: { type: String, default: "" },
    websiteAddress: { type: String, default: "" },
    aboutYourBrand: { type: String, default: "" },
    otherInfo: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReseller>("reseller", ResellerSchema);
