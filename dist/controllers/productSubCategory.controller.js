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
exports.getByCategoryId = exports.getById = exports.getFourProducts = exports.getAll = exports.update = exports.create = void 0;
const ProductSubCategory_model_1 = __importDefault(require("../models/ProductSubCategory.model"));
const ProductCategory_model_1 = __importDefault(require("../models/ProductCategory.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, categoryId } = req.body;
    const product = new ProductSubCategory_model_1.default({
        title,
        image,
        categoryId,
    });
    const createProductSub = yield product.save();
    let findCategory = yield ProductCategory_model_1.default.findById(categoryId);
    if (findCategory) {
        findCategory.subCategories.push(createProductSub._id);
        yield findCategory.save();
    }
    else {
        return res.status(404).json({
            success: false,
            message: "Category not found. Please provide an existing categoryId",
            date: createProductSub,
        });
    }
    return res.status(200).json({
        success: true,
        message: "Category created",
        date: createProductSub,
    });
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, productSubCategoryId } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(productSubCategoryId);
    if (!checkId) {
        return res
            .status(400)
            .json({ success: false, message: `Invalid productSubCategoryId` });
    }
    const product = yield ProductSubCategory_model_1.default.findById(productSubCategoryId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: `Product_sub_Category not found` });
    }
    product.title = title || product.title;
    product.image = image || product.image;
    yield product.save();
    return res
        .status(200)
        .json({ success: true, message: "Sub Category updated", date: product });
});
exports.update = update;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductSubCategory_model_1.default.find().populate("categoryId");
    return res
        .status(200)
        .json({ success: true, message: "Sub Category found", date: products });
});
exports.getAll = getAll;
const getFourProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductSubCategory_model_1.default.find();
    let productList = [];
    if (products) {
        products.map((data) => {
            if (productList.length < 4) {
                productList.push(data);
            }
        });
    }
    return res.status(200).json({
        success: true,
        message: "Sub Category 4 objects",
        data: productList,
    });
});
exports.getFourProducts = getFourProducts;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "Product_sub_Category id required in params" });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield ProductSubCategory_model_1.default.findById(id).populate("categoryId");
    if (!product) {
        return res.status(404).json({ message: "Sub Category not found" });
    }
    return res
        .status(200)
        .json({ success: true, message: "Sub Category found", date: product });
});
exports.getById = getById;
const getByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({
            success: false,
            message: "category id required in params",
        });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield ProductSubCategory_model_1.default.find({ categoryId: id }).populate("categoryId");
    return res
        .status(200)
        .json({ success: true, message: "Sub Categories found", date: product });
});
exports.getByCategoryId = getByCategoryId;
//# sourceMappingURL=productSubCategory.controller.js.map