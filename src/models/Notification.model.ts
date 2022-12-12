import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  notificationText: string;
  isSeen: boolean;
  userId: string;
  productId: string;
  orderId: string;
  AddToCardId: string;
  notificationType: string;
}

const NotificationSchema: Schema = new Schema(
  {
    notificationText: { type: String, default: "" },
    isSeen: { type: Boolean, default: false },
    userId: { type: String, default: "" },
    productId: { type: String, default: "" },
    orderId: { type: String, default: "" },
    AddToCardId: { type: String, default: "" },
    notificationType: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INotification>(
  "notification",
  NotificationSchema
);
