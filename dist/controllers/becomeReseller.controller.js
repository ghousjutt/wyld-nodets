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
exports.getAll = exports.getById = exports.create = void 0;
const BecomeReseller_model_1 = __importDefault(require("../models/BecomeReseller.model"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, country, contactPerson, phoneNumber, email, websiteAddress, aboutYourBrand, otherInfo, } = req.body;
    const bSellerus = new BecomeReseller_model_1.default({
        companyName,
        country,
        contactPerson,
        phoneNumber,
        email,
        websiteAddress,
        aboutYourBrand,
        otherInfo,
    });
    try {
        const createBecomeSeller = yield bSellerus.save();
        return res
            .status(200)
            .json({ message: "Become Seller Created", data: createBecomeSeller });
    }
    catch (e) {
        return res.status(500).json({ message: "Error creating Become Seller" });
    }
});
exports.create = create;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const becomeSeller = yield BecomeReseller_model_1.default.findById(id);
        if (!becomeSeller) {
            return res.status(200).json({ message: "Become Seller not Found" });
        }
        return res
            .status(200)
            .json({ message: "Become Seller Found", data: becomeSeller });
    }
    catch (e) {
        return res.status(500).json({ message: "Error founding Become Seller" });
    }
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const becomeSeller = yield BecomeReseller_model_1.default.find({});
        if (!becomeSeller) {
            return res.status(200).json({ message: "Become Seller Not Found" });
        }
        return res
            .status(200)
            .json({ message: "Become Seller Found", data: becomeSeller });
    }
    catch (e) {
        return res.status(500).json({ message: "Error founding Become Seller" });
    }
});
exports.getAll = getAll;
//# sourceMappingURL=becomeReseller.controller.js.map