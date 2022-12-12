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
    image: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    type: yup.string().required(),
});
exports.updateDto = yup.object().shape({
    featureCardId: yup.string().required(),
    image: yup.string(),
    description: yup.string(),
    price: yup.number(),
    type: yup.string(),
});
//# sourceMappingURL=FeatureCard.dto.js.map