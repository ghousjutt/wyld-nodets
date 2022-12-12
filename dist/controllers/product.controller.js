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
exports.searchProducts = exports.productFilters = exports.getByProductBySubCategoryId = exports.getByProductCategoryId = exports.unLikeByUser = exports.addLikeByUser = exports.getById = exports.getAll = exports.getFeaturedCardSix = exports.getSixProducts = exports.getFourProducts = exports.updateReviews = exports.updateQuantity = exports.update = exports.create = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productCategoryId, productSubCategoryId, name, numberOfVariants, variantsText, images, description, price, productCategoryName, deliveryAndReturns, featuredImage, colors, mainImage, colorVariantImages, totalProducts, sizes, gender, } = req.body;
    const product = new Product_model_1.default({
        productCategoryId,
        productSubCategoryId,
        name,
        numberOfVariants,
        variantsText,
        images,
        description,
        price,
        productCategoryName,
        deliveryAndReturns,
        colors,
        mainImage,
        colorVariantImages,
        totalProducts,
        sizes,
        gender,
        featuredImage,
    });
    yield product.save();
    return res.status(200).json({ message: 'Product Created', data: product });
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, name, numberOfVariants, variantsText, images, description, price, deliveryAndReturns, colors, mainImage, colorVariantImages, totalProducts, gender, featuredImage, } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(productId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield Product_model_1.default.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    product.name = name || product.name;
    product.numberOfVariants = numberOfVariants || product.numberOfVariants;
    product.variantsText = variantsText || product.variantsText;
    product.images = images || product.images;
    product.description = description || product.description;
    product.price = price || product.price;
    product.deliveryAndReturns = deliveryAndReturns || product.deliveryAndReturns;
    product.colors = colors || product.colors;
    product.mainImage = mainImage || product.mainImage;
    product.colorVariantImages = colorVariantImages || product.colorVariantImages;
    product.totalProducts = totalProducts || product.totalProducts;
    product.gender = gender || product.gender;
    product.featuredImage = featuredImage || product.featuredImage;
    yield product.save();
    return res.status(200).json({ message: 'Product updated', data: product });
});
exports.update = update;
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, quantity, productId } = req.body;
    let product = yield Product_model_1.default.findById(productId);
    if (product) {
        product.sizes.map((data) => {
            if (data.size == size) {
                data.quantity = parseInt(quantity);
            }
            return data;
        });
        const saveProduct = yield product.save();
        return res
            .status(200)
            .json({ message: 'Product updated', data: saveProduct });
    }
    else {
        return res
            .status(404)
            .json({ message: 'product not found', success: false });
    }
});
exports.updateQuantity = updateQuantity;
const updateReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, name, image, text, rating } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(productId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield Product_model_1.default.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    let ratingObj = {
        name,
        image,
        text,
        rating,
        date: Date.now(),
    };
    product.reviews.push(ratingObj);
    try {
        yield product.save();
        return res
            .status(200)
            .json({ success: true, message: 'Product review added', data: product });
    }
    catch (e) {
        return res
            .status(500)
            .json({ success: false, message: e.message, data: product });
    }
});
exports.updateReviews = updateReviews;
const getFourProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const products = yield Product_model_1.default.find();
    let productList = [];
    if (products) {
        products.map((data) => {
            if (data._id !== id && productList.length < 4) {
                productList.push(data);
            }
        });
    }
    return res
        .status(200)
        .json({ success: true, message: 'Products ', data: productList });
});
exports.getFourProducts = getFourProducts;
const getSixProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const products = yield Product_model_1.default.find();
    let productList = [];
    if (products) {
        products.map((data) => {
            if (data._id !== id && productList.length < 6) {
                productList.push(data);
            }
        });
    }
    return res
        .status(200)
        .json({ success: true, message: 'Products ', data: productList });
});
exports.getSixProducts = getSixProducts;
const getFeaturedCardSix = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_model_1.default.find({}).limit(6);
    if (!products) {
        return res
            .status(404)
            .json({ success: true, message: 'Products Not found' });
    }
    return res
        .status(404)
        .json({ success: true, message: 'Products', data: products });
});
exports.getFeaturedCardSix = getFeaturedCardSix;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { page, limit } = req.query;
    const products = yield Product_model_1.default.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
    if (!products) {
        return res.status(404).json({ message: 'Products not found' });
    }
    else {
        if (id) {
            products.map((product) => {
                let filterLike = product.likeProductUsers.filter((d) => d == id.toString());
                if (filterLike.length !== 0) {
                    product.isLike = true;
                }
                return product;
            });
            return res.status(200).json({ count: products.length, data: products });
        }
        else {
            return res.status(200).json({ count: products.length, data: products });
        }
    }
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: 'Product_id required in params' });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const product = yield Product_model_1.default.findById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (req.body.id) {
        let filterLike = product.likeProductUsers.filter((d) => d == req.body.id.toString());
        if (filterLike.length !== 0) {
            product.isLike = true;
        }
        return res.status(200).json(product);
    }
    else {
        return res.status(200).json(product);
    }
});
exports.getById = getById;
const addLikeByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, productId } = req.body;
    if (!productId) {
        return res.json({ message: 'productId required in body' });
    }
    const checkProductId = mongoose_1.default.Types.ObjectId.isValid(productId);
    if (!checkProductId) {
        return res.status(400).json({ message: `Invalid productId` });
    }
    const product = yield Product_model_1.default.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    let filterLike = product.likeProductUsers.filter((d) => d == id.toString());
    if (filterLike.length !== 0) {
        return res.status(200).json({ message: 'Product already liked by user' });
    }
    let newData = [...product.likeProductUsers, id];
    product.likeProductUsers = newData;
    try {
        yield product.save();
        return res.status(200).json({ message: 'Product liked successfully' });
    }
    catch (e) {
        return res.status(500).json({ message: 'Product liked error' });
    }
});
exports.addLikeByUser = addLikeByUser;
const unLikeByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, productId } = req.body;
    if (!productId) {
        return res.json({ message: 'productId required in body' });
    }
    const checkProductId = mongoose_1.default.Types.ObjectId.isValid(productId);
    if (!checkProductId) {
        return res.status(400).json({ message: `Invalid productId` });
    }
    const product = yield Product_model_1.default.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    let filterLike = [];
    let allProducts = product.likeProductUsers;
    allProducts.map((d) => {
        if (d == id.toString()) {
            return;
        }
        else {
            filterLike.push(d);
        }
    });
    product.likeProductUsers = filterLike;
    try {
        yield product.save();
        return res.status(200).json({ message: 'Product disliked successfully' });
    }
    catch (e) {
        return res.status(500).json({ message: 'Product disliked error' });
    }
});
exports.unLikeByUser = unLikeByUser;
const getByProductCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: 'Product_Category id required in params' });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const products = yield Product_model_1.default.find({ productCategoryId: id });
    if (!products) {
        return res.status(404).json({ message: 'Products not found' });
    }
    else {
        if (req.body.id) {
            products.map((product) => {
                let filterLike = product.likeProductUsers.filter((d) => d == req.body.id.toString());
                if (filterLike.length !== 0) {
                    product.isLike = true;
                }
                return product;
            });
            return res.status(200).json({ count: products.length, data: products });
        }
        else {
            return res.status(200).json({ count: products.length, data: products });
        }
    }
});
exports.getByProductCategoryId = getByProductCategoryId;
const getByProductBySubCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { page, limit } = req.query;
    if (!id) {
        return res.json({ message: 'Product_Category id required in params' });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const products = yield Product_model_1.default.find({ productSubCategoryId: id })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    const totalProducts = yield Product_model_1.default.find({ productSubCategoryId: id });
    if (!products) {
        return res.status(404).json({ message: 'Products not found' });
    }
    else {
        if (req.body.id) {
            products.map((product) => {
                let filterLike = product.likeProductUsers.filter((d) => d == req.body.id.toString());
                if (filterLike.length !== 0) {
                    product.isLike = true;
                }
                return product;
            });
            return res
                .status(200)
                .json({ count: totalProducts.length, data: products });
        }
        else {
            return res
                .status(200)
                .json({ count: totalProducts.length, data: products });
        }
    }
});
exports.getByProductBySubCategoryId = getByProductBySubCategoryId;
const productFilters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.subcategoryid;
        const colors = req.body.colors;
        const fromprice = req.body.fromprice;
        const toprice = req.body.toprice;
        const { page, limit } = req.query;
        const productCount = yield Product_model_1.default.find({
            productSubCategoryId: id,
            colors: { $in: colors },
            price: { $gte: parseInt(fromprice), $lte: parseInt(toprice) },
        });
        const products = yield Product_model_1.default.find({
            productSubCategoryId: id,
            colors: { $in: colors },
            price: { $gte: parseInt(fromprice), $lte: parseInt(toprice) },
        })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        return res
            .status(200)
            .json({ count: productCount.length, dataFind: products });
    }
    catch (e) {
        return res.status(500).json({ error: e });
    }
});
exports.productFilters = productFilters;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const regex = new RegExp(escapeRegex(id), 'gi');
    const products = yield Product_model_1.default.find({ name: regex });
    return res.status(200).json({ data: products });
});
exports.searchProducts = searchProducts;
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
//# sourceMappingURL=product.controller.js.map