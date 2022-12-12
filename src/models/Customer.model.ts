import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  email: string;
  password: string;
  profileImagePath: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBarth: string;
  streetAddress: string;
  city: string;
  code: Number;
}

const CustomerSchema: Schema = new Schema(
  {
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    profileImagePath: { type: String, default: "" },
    role: { type: String, default: "customer" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    gender: { type: String, default: "" },
    dateOfBarth: { type: String, default: "" },
    streetAddress: { type: String, default: "" },
    city: { type: String, default: "" },
    code: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>("customers", CustomerSchema);
