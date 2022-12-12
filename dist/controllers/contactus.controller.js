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
const Contactus_model_1 = __importDefault(require("../models/Contactus.model"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    const contactus = new Contactus_model_1.default({
        name,
        email,
        message,
    });
    try {
        const createContactus = yield contactus.save();
        return res
            .status(200)
            .json({ message: "Contactus Created", data: createContactus });
    }
    catch (e) {
        return res.status(500).json({ message: "Error creating Contactus" });
    }
});
exports.create = create;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contactUs = yield Contactus_model_1.default.findById(id);
        if (!contactUs) {
            return res.status(200).json({ message: "Contactus not Found" });
        }
        return res
            .status(200)
            .json({ message: "Contactus Found", data: contactUs });
    }
    catch (e) {
        return res.status(500).json({ message: "Error founding Contactus" });
    }
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactUS = yield Contactus_model_1.default.find({});
        if (!contactUS) {
            return res.status(200).json({ message: "Contactus Not Found" });
        }
        return res
            .status(200)
            .json({ message: "Contactus Found", data: contactUS });
    }
    catch (e) {
        return res.status(500).json({ message: "Error founding Contactus" });
    }
});
exports.getAll = getAll;
//# sourceMappingURL=contactus.controller.js.map