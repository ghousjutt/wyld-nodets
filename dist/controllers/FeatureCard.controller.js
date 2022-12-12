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
exports.getForWomen = exports.getForMen = exports.getAll = exports.update = exports.create = void 0;
const FeatureCard_model_1 = __importDefault(require("../models/FeatureCard.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, description, price, type } = req.body;
    const featureCard = new FeatureCard_model_1.default({ image, description, price, type });
    try {
        yield featureCard.save();
        return res
            .status(200)
            .json({ message: "Created successfully", data: featureCard });
    }
    catch (err) {
        return res.status(500).json({ message: "Error creating", error: err });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { featureCardId, image, description, price, type } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(featureCardId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid featureCardId` });
    }
    const featureCard = yield FeatureCard_model_1.default.findById(featureCardId);
    if (!featureCard) {
        return res.status(404).json({ message: "FeatureCard not found." });
    }
    featureCard.image = image || featureCard.image;
    featureCard.description = description || featureCard.description;
    featureCard.price = price || featureCard.price;
    featureCard.type = type || featureCard.type;
    yield featureCard.save();
    return res.status(200).json({ message: "Data updated", data: featureCard });
});
exports.update = update;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featureCards = yield FeatureCard_model_1.default.find();
    if (!featureCards) {
        return res.status(204).json({ message: "Data not found", data: [] });
    }
    return res.status(200).json({ message: "Data found", data: featureCards });
});
exports.getAll = getAll;
const getForMen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featureCards = yield FeatureCard_model_1.default.find({ type: "men" });
    if (!featureCards) {
        return res.status(204).json({ message: "Data not found", data: [] });
    }
    return res.status(200).json({ message: "Data found", data: featureCards });
});
exports.getForMen = getForMen;
const getForWomen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featureCards = yield FeatureCard_model_1.default.find({ type: "women" });
    if (!featureCards) {
        return res.status(204).json({ message: "Data not found", data: [] });
    }
    return res.status(200).json({ message: "Data found", data: featureCards });
});
exports.getForWomen = getForWomen;
//# sourceMappingURL=FeatureCard.controller.js.map