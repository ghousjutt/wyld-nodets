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
exports.getByProductId = exports.getAll = exports.getById = exports.update = exports.create = void 0;
const Reviews_model_1 = __importDefault(require("../models/Reviews.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, productId, description, starts } = req.body;
    const review = new Reviews_model_1.default({
        userId: id,
        productId,
        description,
        starts,
    });
    try {
        const createreview = yield review.save();
        return res
            .status(200)
            .json({ message: "review Created", data: createreview });
    }
    catch (e) {
        return res.status(500).json({ message: "Error creating reviews" });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, description, starts } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(reviewId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid reviewId` });
    }
    const review = yield Reviews_model_1.default.findById(reviewId);
    if (!review) {
        return res.status(404).json({ message: `Review not found` });
    }
    review.description = description || review.description;
    review.starts = starts || review.starts;
    try {
        const updateReview = yield review.save();
        return res
            .status(200)
            .json({ message: "Review Updated", data: updateReview });
    }
    catch (e) {
        return res.status(500).json({ message: "Error updating review" });
    }
});
exports.update = update;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid review id in params` });
    }
    const review = yield Reviews_model_1.default.findById(id).populate("userId");
    if (!review) {
        return res.status(404).json({ message: `Review not found` });
    }
    return res.status(200).json({ message: "Review Found", data: review });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield Reviews_model_1.default.find().populate("userId");
    return res.status(200).json({ message: "Reviews Found", data: reviews });
});
exports.getAll = getAll;
const getByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid product id in params` });
    }
    const reviews = yield Reviews_model_1.default.find({ productId: id }).populate("userId");
    if (!reviews) {
        return res.status(404).json({ message: `Review not found` });
    }
    return res.status(200).json({ message: "Review Found", data: reviews });
});
exports.getByProductId = getByProductId;
//# sourceMappingURL=review.controller.js.map