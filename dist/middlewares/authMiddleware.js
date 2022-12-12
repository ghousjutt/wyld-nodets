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
exports.protectCustomer2 = exports.protectCustomer = exports.getCustomerUser = exports.getBusinessUser = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BusinessOwner_model_1 = __importDefault(require("../models/BusinessOwner.model"));
const Customer_model_1 = __importDefault(require("../models/Customer.model"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, "123456789");
            req.user = yield BusinessOwner_model_1.default.findById(decode.id);
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorize");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorize");
    }
});
exports.protect = protect;
const protectCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, "123456789");
            const user = yield Customer_model_1.default.findById(decode.id);
            if (!user) {
                res.status(401);
                throw new Error("Not valid token");
            }
            req.body.id = user._id;
            next();
        }
        catch (error) {
            res.status(401);
            res.json({ message: "Invalid token" });
        }
    }
    if (!token) {
        res.status(401);
        res.json({ message: "Not authorize please provider token" });
    }
});
exports.protectCustomer = protectCustomer;
const protectCustomer2 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, "123456789");
            const user = yield Customer_model_1.default.findById(decode.id);
            if (!user) {
                req.body.id = null;
                next();
                return;
            }
            req.body.id = user._id;
            next();
        }
        catch (error) {
            res.status(401);
            res.json({ message: "Invalid token" });
        }
    }
    if (!token) {
        req.body.id = null;
        next();
    }
});
exports.protectCustomer2 = protectCustomer2;
const getBusinessUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, "123456789");
            const user = yield BusinessOwner_model_1.default.findById(decode.id);
            if (!user) {
                return res.status(401).send("Token expired");
            }
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(401).send("Not authorize");
        }
    }
    if (!token) {
        return res.status(401).send("Not authorize");
    }
});
exports.getBusinessUser = getBusinessUser;
const getCustomerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, "123456789");
            const user = yield Customer_model_1.default.findById(decode.id);
            if (!user) {
                return res.status(401).send("Token expired");
            }
            return res.status(200).json(user);
            next();
        }
        catch (error) {
            return res.status(401).send("Not authorize");
        }
    }
    if (!token) {
        return res.status(401).send("Not authorize");
    }
});
exports.getCustomerUser = getCustomerUser;
//# sourceMappingURL=authMiddleware.js.map