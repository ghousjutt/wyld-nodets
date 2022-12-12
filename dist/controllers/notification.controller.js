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
exports.getByUserId = exports.getAll = exports.getById = exports.updateSeen = exports.updateText = exports.create = void 0;
const Notification_model_1 = __importDefault(require("../models/Notification.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationText, userId, productId, orderId, AddToCardId, notificationType, } = req.body;
    const notification = new Notification_model_1.default({
        notificationText,
        userId,
        productId,
        orderId,
        AddToCardId,
        notificationType,
    });
    try {
        yield notification.save();
        return res
            .status(200)
            .json({ message: "Created successfully", data: notification });
    }
    catch (err) {
        return res.status(500).json({ message: "Error creating", error: err });
    }
});
exports.create = create;
const updateText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId, notificationText } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(notificationId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid notificationId` });
    }
    const notification = yield Notification_model_1.default.findById(notificationId);
    if (!notification) {
        return res
            .status(404)
            .json({ success: false, message: "Notification not found." });
    }
    notification.notificationText =
        notificationText || notification.notificationText;
    yield notification.save();
    return res.status(200).json({ message: "Data updated", data: notification });
});
exports.updateText = updateText;
const updateSeen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId, isSeen } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(notificationId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid notificationId` });
    }
    const notification = yield Notification_model_1.default.findById(notificationId);
    if (!notification) {
        return res
            .status(404)
            .json({ success: false, message: "Notification not found." });
    }
    notification.isSeen = isSeen;
    yield notification.save();
    return res.status(200).json({ message: "Data updated", data: notification });
});
exports.updateSeen = updateSeen;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!checkId) {
        return res
            .status(400)
            .json({ message: `Invalid notificationId in params` });
    }
    const notification = yield Notification_model_1.default.findById(id);
    if (!notification) {
        return res
            .status(404)
            .json({ success: false, message: "Notification not found." });
    }
    return res
        .status(200)
        .json({ success: true, message: "Data found", data: notification });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield Notification_model_1.default.find();
    if (!notifications) {
        return res
            .status(404)
            .json({ success: false, message: "Notifications not found." });
    }
    return res
        .status(200)
        .json({ success: true, message: "Data found", data: notifications });
});
exports.getAll = getAll;
const getByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notification = yield Notification_model_1.default.find({ userId: id });
    if (!notification) {
        return res
            .status(404)
            .json({ success: false, message: "Notification not found." });
    }
    return res
        .status(200)
        .json({ success: true, message: "Data found", data: notification });
});
exports.getByUserId = getByUserId;
//# sourceMappingURL=notification.controller.js.map