import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  productIds: Array<String>;
  totalPrice: number;
  totalItems: number;
  taxPercentage: number;
  orderNumber: number;
  trackNumber: number;
  isPaid: boolean;
  description: string;
  provider: string;
  customerId: string;
  status: string;
  addToCartIds: Array<String>;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    deliveryAddress2: string;
    city: string;
    zipCode: string;
    country: string;
  };
  deliveryAddress: {
    address_1: string;
    address_2: string;
    city: string;
    zipCode: string;
  };
  orderData: {
    subtotal: number;
    tax: number;
    discountCode: string;
    discount: number;
    total: number;
  };
  paymentData: {
    paymentMethod: string;
    payment: number;
  };
}

const OrderSchema: Schema = new Schema(
  {
    productIds: { type: [String], default: [] },
    totalPrice: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
    taxPercentage: { type: Number, default: 0 },
    orderNumber: { type: Number, default: 0 },
    trackNumber: { type: Number, default: 0 },
    description: { type: String, default: '' },
    provider: { type: String, default: '' },
    customerId: { type: Schema.Types.ObjectId, ref: 'customers' },
    addToCartIds: [{ type: Schema.Types.ObjectId, ref: 'add_to_card' }],
    status: { type: String, default: '' },
    isPaid: { type: Boolean, default: false },
    customerInfo: {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      deliveryAddress: { type: String, default: '' },
      deliveryAddress2: { type: String, default: '' },
      city: { type: String, default: '' },
      zipCode: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    orderData: {
      subtotal: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      discountCode: { type: String, default: '' },
      discount: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    paymentData: {
      paymentMethod: { type: String, default: 'Credit Card' },
      payment: { type: Number, default: 0 },
    },
    deliveryAddress: {
      address_1: { type: String, default: '' },
      address_2: { type: String, default: '' },
      city: { type: String, default: '' },
      zipCode: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('orders', OrderSchema);
