"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const OrderSchema = new mongoose_1.Schema({
    productIds: { type: [String], default: [] },
    totalPrice: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
    taxPercentage: { type: Number, default: 0 },
    orderNumber: { type: Number, default: 0 },
    trackNumber: { type: Number, default: 0 },
    description: { type: String, default: '' },
    provider: { type: String, default: '' },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customers' },
    addToCartIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'add_to_card' }],
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('orders', OrderSchema);
//# sourceMappingURL=Order.model.js.map