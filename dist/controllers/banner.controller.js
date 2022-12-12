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
exports.getAll = exports.getById = exports.update = exports.create = void 0;
const Banner_model_1 = __importDefault(require("../models/Banner.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bannerImage, bannerText } = req.body;
    const banner = new Banner_model_1.default({
        bannerImage,
        bannerText,
    });
    const createBanner = yield banner.save();
    return res
        .status(200)
        .json({ message: "Banner Created", data: createBanner });
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bannerImage, bannerText, bannerId } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(bannerId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid banner id` });
    }
    const banner = yield Banner_model_1.default.findById(bannerId);
    if (!banner) {
        return res.status(404).json({ message: `Banner not found` });
    }
    banner.bannerImage = bannerImage || banner.bannerImage;
    banner.bannerText = bannerText || banner.bannerText;
    const updateBanner = yield banner.save();
    return res
        .status(200)
        .json({ message: "Banner Updated", data: updateBanner });
});
exports.update = update;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid banner id` });
    }
    const banner = yield Banner_model_1.default.findById(id);
    if (!banner) {
        return res.status(404).json({ message: `Banner not found` });
    }
    return res.status(200).json({ message: "Banner Found", data: banner });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const banners = yield Banner_model_1.default.find();
    return res.status(200).json({ message: "Banners Found", data: banners });
});
exports.getAll = getAll;
//# sourceMappingURL=banner.controller.js.map