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
exports.getAllBusinessOwners = exports.getBusinessOwnerById = exports.changePassword = exports.loginBusinessOwner = exports.createBusinessOwner = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BusinessOwner_model_1 = __importDefault(require("../models/BusinessOwner.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBusinessOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, email, password, logoImagePath } = req.body;
    const businessExist = yield BusinessOwner_model_1.default.findOne({ email: email });
    if (businessExist) {
        return res
            .status(400)
            .json({ message: "Business with this email already exists" });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    const businessOwner = new BusinessOwner_model_1.default({
        businessName,
        email,
        password: hashPassword,
        logoImagePath,
    });
    yield businessOwner.save();
    return res.json({
        id: businessOwner._id,
        businessName: businessOwner.businessName,
        email: businessOwner.email,
        logoImagePath: businessOwner.logoImagePath,
        token: generateToken_1.default(businessOwner._id),
    });
});
exports.createBusinessOwner = createBusinessOwner;
const loginBusinessOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const businessOwner = yield BusinessOwner_model_1.default.findOne({ email: email });
    if (!businessOwner) {
        res.status(404);
        return res.json({
            message: "Email not exist in database",
        });
    }
    const compairPasswords = yield bcryptjs_1.default.compare(password, businessOwner.password);
    if (compairPasswords) {
        return res.json({
            id: businessOwner._id,
            businessName: businessOwner.businessName,
            email: businessOwner.email,
            logoImagePath: businessOwner.logoImagePath,
            token: generateToken_1.default(businessOwner._id),
        });
    }
    else {
        return res.json({
            message: "Email or password incorrect",
        });
    }
});
exports.loginBusinessOwner = loginBusinessOwner;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, oldPassword } = req.body;
    const user = yield BusinessOwner_model_1.default.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json({ message: `User agains ${email} not exists.` });
    }
    const compairPasswords = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!compairPasswords) {
        return res.status(401).json({ message: `Wrong old password` });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    user.password = hashPassword;
    yield user.save();
    return res.status(200).json({ message: `Password updated` });
});
exports.changePassword = changePassword;
const getBusinessOwnerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!id) {
        return res.status(400).json({ message: `Missing id in params` });
    }
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    try {
        const businessOwner = yield BusinessOwner_model_1.default.findById(id);
        if (!businessOwner) {
            return res.status(404).json({ message: `User agains ${id} not exists.` });
        }
        return res.json({
            id: businessOwner.id,
            businessName: businessOwner.businessName,
            email: businessOwner.email,
            logoImagePath: businessOwner.logoImagePath,
        });
    }
    catch (error) {
        res.status(500);
        return res.json({
            error: error.message,
        });
    }
});
exports.getBusinessOwnerById = getBusinessOwnerById;
const getAllBusinessOwners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const businessOwners = yield BusinessOwner_model_1.default.find();
    return res.json({
        businessOwners,
    });
});
exports.getAllBusinessOwners = getAllBusinessOwners;
//# sourceMappingURL=businessOwner.controller.js.map