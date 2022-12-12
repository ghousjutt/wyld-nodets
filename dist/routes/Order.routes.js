"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const order_controller_1 = require("../controllers/order.controller");
const order_dto_1 = require("../dto/order.dto");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
exports.orderRouter = router;
router.post("/api/order/create", authMiddleware_1.protectCustomer, validate_request_1.validateAuth(order_dto_1.createDto), order_controller_1.create);
router.put("/api/order/update", validate_request_1.validateAuth(order_dto_1.updateDto), order_controller_1.update);
router.put("/api/order/ispaid", validate_request_1.validateAuth(order_dto_1.updateDto), order_controller_1.updateisPaySuccess);
router.get("/api/order/all", order_controller_1.getAll);
router.get("/api/order/customer/getall", authMiddleware_1.protectCustomer, order_controller_1.getByOrderCustomerId);
router.get("/api/order/:id", order_controller_1.getById);
router.get("/api/order/trackorder/:ordernumber/:email", order_controller_1.getByOrderNumber);
//# sourceMappingURL=Order.routes.js.map