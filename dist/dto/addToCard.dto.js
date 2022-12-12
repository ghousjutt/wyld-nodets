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
exports.updateDto = exports.createDto = void 0;
const yup = __importStar(require("yup"));
exports.createDto = yup.object().shape({
    productColor: yup.string().required(),
    productSize: yup.string().required(),
    productQuantity: yup.number().required(),
    totalPrice: yup.number().required(),
    productId: yup.string().required(),
});
exports.updateDto = yup.object().shape({
    addTocardId: yup.string().required(),
    productColor: yup.string(),
    productSize: yup.string(),
    productQuantity: yup.number(),
    totalPrice: yup.number(),
});
//# sourceMappingURL=addToCard.dto.js.map