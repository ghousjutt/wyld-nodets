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
exports.getByOrderCustomerId = exports.getByOrderNumber = exports.getById = exports.getAll = exports.updateisPaySuccess = exports.update = exports.create = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds, totalPrice, totalItems, customerInfo, description, deliveryAddress, customerId, status, provider, addToCartIds, orderData, paymentData, } = req.body;
    const countOrder = Math.floor(Math.random() * 1000000000);
    const trackNumber = Math.floor(Math.random() * 1000000000);
    const order = new Order_model_1.default({
        productIds,
        totalPrice,
        totalItems,
        customerId: customerId,
        customerInfo,
        description,
        deliveryAddress,
        status,
        provider,
        addToCartIds,
        orderNumber: countOrder,
        trackNumber,
        orderData,
        paymentData,
    });
    try {
        yield order.save();
        return res
            .status(200)
            .json({ message: 'Created successfully', data: order });
    }
    catch (err) {
        return res.status(500).json({ message: 'Error creating', error: err });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds, totalPrice, totalItems, customerInfo, orderData, paymentData, description, deliveryAddress, orderId, status, } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(orderId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid orderId` });
    }
    const order = yield Order_model_1.default.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    order.productIds = productIds || order.productIds;
    order.totalPrice = totalPrice || order.totalPrice;
    order.totalItems = totalItems || order.totalItems;
    order.customerInfo = customerInfo || order.customerInfo;
    order.description = description || order.description;
    order.deliveryAddress = deliveryAddress || order.deliveryAddress;
    order.status = status || order.status;
    order.orderData = orderData || order.orderData;
    order.paymentData = paymentData || order.paymentData;
    yield order.save();
    return res.status(200).json({ message: 'Order updated', data: order });
});
exports.update = update;
const updateisPaySuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(orderId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid orderId` });
    }
    const order = yield Order_model_1.default.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    order.isPaid = true;
    yield order.save();
    return res.status(200).json({ message: 'Order updated', data: order });
});
exports.updateisPaySuccess = updateisPaySuccess;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_model_1.default.find();
    return res.status(200).json({ message: 'Orders', data: orders });
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: 'Product_id required in params' });
    }
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id in params` });
    }
    const product = yield Order_model_1.default.findById(id);
    if (!product) {
        return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order', data: product });
});
exports.getById = getById;
const getByOrderNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ordernumber, email } = req.params;
    const product = yield Order_model_1.default.findOne({
        orderNumber: parseInt(ordernumber),
        'customerInfo.email': email,
    })
        .populate({ path: 'addToCartIds', populate: { path: 'productId' } })
        .populate('customerId');
    if (!product) {
        return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order', data: product });
});
exports.getByOrderNumber = getByOrderNumber;
const getByOrderCustomerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const orders = yield Order_model_1.default.find({ customerId: id });
    return res.status(200).json({ message: 'Orders', data: orders });
});
exports.getByOrderCustomerId = getByOrderCustomerId;
//# sourceMappingURL=order.controller.js.map