import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  businessName: string;
  email: string;
  password: string;
  logoImagePath: string;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    businessName: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    logoImagePath: { type: String, default: "" },
    role: { type: String, default: "businessOwner" },
    //   businessStaff: {  type: mongoose.Schema.Types.ObjectId,
    //     ref: "business_staff",},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("business_owners", UserSchema);
