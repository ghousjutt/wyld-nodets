import mongoose, { Schema, Document } from "mongoose";

export interface IContactUs extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactUSSchema: Schema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    message: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContactUs>("contactus", ContactUSSchema);
