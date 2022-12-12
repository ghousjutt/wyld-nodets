"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiredDiscounts = exports.getActiveDiscounts = exports.getById = exports.getAll = exports.update = exports.create = void 0;
const discount_model_1 = __importDefault(require("../models/discount.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amountinPercent, discountCode } = req.body;
    const discount = new discount_model_1.default({
        amountinPercent,
        discountCode,
    });
    try {
        yield discount.save();
        return res
            .status(200)
            .json({ message: "Created successfully", data: discount });
    }
    catch (err) {
        return res.status(500).json({ message: "Error creating", error: err });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { discountId, amountinPercent, discountCode, isExpired } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(discountId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid discountId` });
    }
    const discount = yield discount_model_1.default.findById(discountId);
    if (!discount) {
        return res.status(404).json({ message: "Discount not found." });
    }
    discount.amountinPercent = amountinPercent || discount.amountinPercent;
    discount.discountCode = discountCode || discount.discountCode;
    discount.isExpired = isExpired || discount.isExpired;
    yield discount.save();
    return res.status(200).json({ message: "Discount updated", data: discount });
});
exports.update = update;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discounts = yield discount_model_1.default.find();
    return res.status(200).json({ message: "Discounts", data: discounts });
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "discount_id required in params" });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id in params` });
    }
    const discount = yield discount_model_1.default.findById(id);
    if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
    }
    return res.status(200).json({ message: "Discounts", data: discount });
});
exports.getById = getById;
const getActiveDiscounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discounts = yield discount_model_1.default.find({ isExpired: false });
    return res.status(200).json({ message: "Discounts", data: discounts });
});
exports.getActiveDiscounts = getActiveDiscounts;
const getExpiredDiscounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discounts = yield discount_model_1.default.find({ isExpired: true });
    return res.status(200).json({ message: "Discounts", data: discounts });
});
exports.getExpiredDiscounts = getExpiredDiscounts;
//# sourceMappingURL=discount.dto.js.map