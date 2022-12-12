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
exports.getByType = exports.getByBusinessOwnerId = exports.getById = exports.getAll = exports.update = exports.create = void 0;
const ProductCategory_model_1 = __importDefault(require("../models/ProductCategory.model"));
const FeatureCard_model_1 = __importDefault(require("../models/FeatureCard.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, businessId, type } = req.body;
    const product = new ProductCategory_model_1.default({
        title,
        image,
        businessId,
        type,
    });
    const createProduct = yield product.save();
    return res
        .status(200)
        .json({ message: "Category created", date: createProduct });
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, productCategoryId, type } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(productCategoryId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield ProductCategory_model_1.default.findById(productCategoryId);
    if (!product) {
        return res.status(404).json({ message: `Product_Category not found` });
    }
    product.title = title || product.title;
    product.image = image || product.image;
    product.type = type || product.type;
    yield product.save();
    return res.status(200).json({ message: "Category updated", date: product });
});
exports.update = update;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductCategory_model_1.default.find().populate("subCategories");
    return res.status(200).json(products);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "Product_Category id required in params" });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield ProductCategory_model_1.default.findById(id).populate("subCategories");
    if (!product) {
        return res.status(404).json({ message: "Product Category not found" });
    }
    return res.status(200).json(product);
});
exports.getById = getById;
const getByBusinessOwnerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "businessOwner id required in params" });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield ProductCategory_model_1.default.find({ businessId: id }).populate("subCategories");
    return res.status(200).json(product);
});
exports.getByBusinessOwnerId = getByBusinessOwnerId;
const getByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    if (!type) {
        return res.json({ message: "type required in params" });
    }
    const product = yield ProductCategory_model_1.default.find({ type: type }).populate("subCategories");
    const featureCard = yield FeatureCard_model_1.default.find({ type: type });
    return res.status(200).json({ products: product, featureCard: featureCard });
});
exports.getByType = getByType;
//# sourceMappingURL=productCategory.controller.js.map