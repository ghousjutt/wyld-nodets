"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const customer_controller_1 = require("../controllers/customer.controller");
const customer_dto_1 = require("../dto/customer.dto");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
exports.customerRouter = router;
router.post('/api/customer/register', validate_request_1.validateAuth(customer_dto_1.registerDto), customer_controller_1.create);
router.post('/api/customer/login', validate_request_1.validateAuth(customer_dto_1.authDto), customer_controller_1.login);
router.put('/api/customer/update', authMiddleware_1.protectCustomer, customer_controller_1.updateCustomer);
router.post('/api/customer/sendpasswordcode', customer_controller_1.sendResetPasswordLink);
router.post('/api/customer/resetpassword', customer_controller_1.resetPassword);
router.put('/api/customer/change-password', validate_request_1.validateAuth(customer_dto_1.changePasswordDto), customer_controller_1.changePassword);
router.post('/api/customer/sendemail', customer_controller_1.sendEmailToUser);
router.post('/api/customer/socialauth', customer_controller_1.socialAuthLogin);
router.get('/api/customer/all', customer_controller_1.getAll);
router.get('/api/customer/getcustomer', authMiddleware_1.getCustomerUser);
router.get('/api/customer/:id', customer_controller_1.getById);
//# sourceMappingURL=Customer.routes.js.map