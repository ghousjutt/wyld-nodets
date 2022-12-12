"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const review_controller_1 = require("../controllers/review.controller");
const review_dto_1 = require("../dto/review.dto");
const router = express_1.default.Router();
exports.reviewRouter = router;
router.post("/api/productreviews/create", authMiddleware_1.protectCustomer, validate_request_1.validateAuth(review_dto_1.createDto), review_controller_1.create);
router.put("/api/productreviews/update", validate_request_1.validateAuth(review_dto_1.updateDto), review_controller_1.update);
router.get("/api/productreviews", review_controller_1.getAll);
router.get("/api/productreviews/reviewid/:id", review_controller_1.getById);
router.get("/api/productreviews/productid/:id", review_controller_1.getByProductId);
//# sourceMappingURL=review.routes.js.map