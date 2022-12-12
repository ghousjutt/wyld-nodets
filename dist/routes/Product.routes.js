"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const product_controller_1 = require("../controllers/product.controller");
const product_dto_1 = require("../dto/product.dto");
const router = express_1.default.Router();
exports.productRouter = router;
router.post('/api/product/create', validate_request_1.validateAuth(product_dto_1.createDto), product_controller_1.create);
router.put('/api/product/update', validate_request_1.validateAuth(product_dto_1.updateDto), product_controller_1.update);
router.put('/api/product/sizechange', validate_request_1.validateAuth(product_dto_1.updateSizeDto), product_controller_1.updateQuantity);
router.post('/api/product/add_review', validate_request_1.validateAuth(product_dto_1.updateReviewDto), product_controller_1.updateReviews);
router.get('/api/product/youmaylink/:id', product_controller_1.getFourProducts);
router.get('/api/product/getsix/:id', product_controller_1.getSixProducts);
router.post('/api/product/like', authMiddleware_1.protectCustomer, product_controller_1.addLikeByUser);
router.post('/api/product/dislike', authMiddleware_1.protectCustomer, product_controller_1.unLikeByUser);
router.get('/api/product/getfeaturedCard', product_controller_1.getFeaturedCardSix);
router.get('/api/product/all', product_controller_1.getAll);
router.post('/api/product/filters', product_controller_1.productFilters);
router.get('/api/product/product_category/:id', authMiddleware_1.protectCustomer2, product_controller_1.getByProductCategoryId);
router.get('/api/product/product_sub_category/:id', authMiddleware_1.protectCustomer2, product_controller_1.getByProductBySubCategoryId);
router.get('/api/product/:id', authMiddleware_1.protectCustomer2, product_controller_1.getById);
router.get('/api/product/search/:id', product_controller_1.searchProducts);
//# sourceMappingURL=Product.routes.js.map