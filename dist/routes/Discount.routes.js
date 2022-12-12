"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const discount_dto_1 = require("../controllers/discount.dto");
const discount_dto_2 = require("../dto/discount.dto");
const router = express_1.default.Router();
exports.discountRouter = router;
router.post("/api/discount/create", validate_request_1.validateAuth(discount_dto_2.createDto), discount_dto_1.create);
router.put("/api/discount/update", validate_request_1.validateAuth(discount_dto_2.updateDto), discount_dto_1.update);
router.get("/api/discount/all", discount_dto_1.getAll);
router.get("/api/discount/active/getall", discount_dto_1.getActiveDiscounts);
router.get("/api/discount/expired/getall", discount_dto_1.getExpiredDiscounts);
router.get("/api/discount/:id", discount_dto_1.getById);
//# sourceMappingURL=Discount.routes.js.map