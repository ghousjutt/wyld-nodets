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
const ProductSchema = new mongoose_1.Schema({
    productCategoryId: { type: String, default: '' },
    productSubCategoryId: { type: String, default: '' },
    productCategoryName: { type: String, default: '' },
    name: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    gender: { type: String, default: '' },
    numberOfVariants: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    variantsText: { type: [String], default: [] },
    images: { type: [String], default: [] },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    deliveryAndReturns: { type: String, default: '' },
    colors: { type: [String], default: [] },
    likeProductUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'customers' }],
    isLike: { type: Boolean, default: false },
    reviews: {
        type: [
            {
                name: String,
                image: String,
                text: String,
                rating: Number,
                date: Date,
            },
        ],
        default: [],
    },
    sizes: {
        type: [
            {
                size: String,
                quantity: Number,
            },
        ],
        default: [],
    },
    mainImage: { type: String, default: '' },
    colorVariantImages: {
        type: [
            {
                color: String,
                image: String,
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('products', ProductSchema);
//# sourceMappingURL=Product.model.js.map