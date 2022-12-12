"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const checkout_controller_1 = require("../controllers/checkout.controller");
const checkout_dto_1 = require("../dto/checkout.dto");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
exports.checkoutRouter = router;
router.post('/api/checkout', authMiddleware_1.protectCustomer, validate_request_1.validateAuth(checkout_dto_1.createDto), checkout_controller_1.create);
router.get('/api/paypalcheckout', checkout_controller_1.createPaypal);
router.get('/api/success', checkout_controller_1.successPaypal);
router.get('/api/cancel', checkout_controller_1.cancelPaypal);
//# sourceMappingURL=checkout.routes.js.map