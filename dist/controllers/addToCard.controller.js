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
exports.getAllUserCards = exports.deleteCard = exports.getAll = exports.getById = exports.update = exports.create = void 0;
const AddToCard_model_1 = __importDefault(require("../models/AddToCard.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productColor, productSize, productQuantity, totalPrice, productId, id, } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(productId);
    if (!checkId) {
        return res
            .status(400)
            .json({ message: `Invalid productId`, success: false });
    }
    const addtocard = new AddToCard_model_1.default({
        productColor,
        productSize,
        productQuantity,
        totalPrice,
        productId,
        userId: id,
    });
    try {
        const createAddtoCard = yield addtocard.save();
        return res
            .status(200)
            .json({ message: 'Created', success: true, data: createAddtoCard });
    }
    catch (e) {
        return res.status(500).json({ message: 'Server Error', success: false });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productColor, productSize, productQuantity, totalPrice, addTocardId, } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(addTocardId);
    if (!checkId) {
        return res
            .status(400)
            .json({ message: `Invalid addTocardId`, success: false });
    }
    const addToCard = yield AddToCard_model_1.default.findById(addTocardId);
    if (!addToCard) {
        return res
            .status(404)
            .json({ message: `AddToCard not found`, success: false });
    }
    addToCard.productColor = productColor || addToCard.productColor;
    addToCard.productSize = productSize || addToCard.productSize;
    addToCard.productQuantity = productQuantity || addToCard.productQuantity;
    addToCard.totalPrice = totalPrice || addToCard.totalPrice;
    try {
        const updateAddToCard = yield addToCard.save();
        return res
            .status(200)
            .json({ message: 'Updated', success: true, data: updateAddToCard });
    }
    catch (e) {
        return res.status(200).json({ message: 'Server Error', success: false });
    }
});
exports.update = update;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid addTocardId id` });
    }
    const addToCard = yield AddToCard_model_1.default.findById(id).populate('productId');
    if (!addToCard) {
        return res.status(404).json({ message: `AddToCard not found` });
    }
    return res.status(200).json({ message: 'AddToCard Found', data: addToCard });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const banners = yield AddToCard_model_1.default.find().populate('productId');
    return res.status(200).json({ message: 'AddtoCard Found', data: banners });
});
exports.getAll = getAll;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let data = yield AddToCard_model_1.default.findByIdAndDelete(id);
        console.log('Delete :: ', data);
        return res
            .status(200)
            .json({ success: true, message: 'AddtoCard Deleted' });
    }
    catch (e) {
        return res
            .status(500)
            .json({ success: false, message: 'Error Deleteing AddtoCard' });
    }
});
exports.deleteCard = deleteCard;
const getAllUserCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cards = yield AddToCard_model_1.default.find({ userId: id }).populate('productId');
    return res.status(200).json({ message: 'AddtoCard Found', data: cards });
});
exports.getAllUserCards = getAllUserCards;
//# sourceMappingURL=addToCard.controller.js.map