"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSubCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const productSubCategory_controller_1 = require("../controllers/productSubCategory.controller");
const productSubCategory_dto_1 = require("../dto/productSubCategory.dto");
const router = express_1.default.Router();
exports.productSubCategoryRouter = router;
router.post("/api/product_sub_category/create", validate_request_1.validateAuth(productSubCategory_dto_1.createDto), productSubCategory_controller_1.create);
router.put("/api/product_sub_category/update", validate_request_1.validateAuth(productSubCategory_dto_1.updateDto), productSubCategory_controller_1.update);
router.get("/api/product_sub_category/all", productSubCategory_controller_1.getAll);
router.get("/api/product_sub_category/category/:id", productSubCategory_controller_1.getByCategoryId);
router.get("/api/product_sub_category/:id", productSubCategory_controller_1.getById);
router.get("/api/product_sub_category/getfourobjects/get", productSubCategory_controller_1.getFourProducts);
//# sourceMappingURL=ProductSubCategory.routes.js.map