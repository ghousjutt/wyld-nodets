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
exports.updateSizeDto = exports.updateReviewDto = exports.updateDto = exports.createDto = void 0;
const yup = __importStar(require("yup"));
exports.createDto = yup.object().shape({
    productCategoryId: yup.string().required(),
    productSubCategoryId: yup.string().required(),
    productCategoryName: yup.string().required(),
    numberOfVariants: yup.number().required(),
    variantsText: yup.array().required(),
    images: yup.array().required(),
    sizes: yup
        .array()
        .required()
        .of(yup.object().shape({
        size: yup.string(),
        quantity: yup.number(),
    })),
    description: yup.string().required(),
    price: yup.number().required(),
    mainImage: yup.string().required(),
    colorVariantImages: yup.array().required(),
    totalProducts: yup.number().required(),
    featuredImage: yup.string(),
});
exports.updateDto = yup.object().shape({
    productId: yup.string().required(),
    numberOfVariants: yup.number(),
    variantsText: yup.array(),
    images: yup.array(),
    description: yup.string(),
    price: yup.number(),
    mainImage: yup.string(),
    colorVariantImages: yup.array(),
    totalProducts: yup.number(),
    featuredImage: yup.string(),
});
exports.updateReviewDto = yup.object().shape({
    productId: yup.string().required(),
    name: yup.string().required(),
    image: yup.string().required(),
    text: yup.string().required(),
    rating: yup.number().required(),
});
exports.updateSizeDto = yup.object().shape({
    productId: yup.string().required(),
    size: yup.string().required(),
    quantity: yup.number().required(),
});
//# sourceMappingURL=product.dto.js.map