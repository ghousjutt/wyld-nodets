import express from 'express';
import { validateAuth } from '../middlewares/validate-request';
import {
  protectCustomer2,
  protectCustomer,
} from '../middlewares/authMiddleware';
import {
  create,
  update,
  getById,
  getAll,
  getByProductCategoryId,
  getByProductBySubCategoryId,
  updateReviews,
  addLikeByUser,
  unLikeByUser,
  updateQuantity,
  getFourProducts,
  getSixProducts,
  searchProducts,
  getFeaturedCardSix,
  productFilters,
} from '../controllers/product.controller';
import {
  createDto,
  updateDto,
  updateReviewDto,
  updateSizeDto,
} from '../dto/product.dto';

const router = express.Router();

router.post('/api/product/create', validateAuth(createDto), create);

router.put('/api/product/update', validateAuth(updateDto), update);
router.put(
  '/api/product/sizechange',
  validateAuth(updateSizeDto),
  updateQuantity
);
router.post(
  '/api/product/add_review',
  validateAuth(updateReviewDto),
  updateReviews
);
router.get('/api/product/youmaylink/:id', getFourProducts);
router.get('/api/product/getsix/:id', getSixProducts);
router.post('/api/product/like', protectCustomer, addLikeByUser);
router.post('/api/product/dislike', protectCustomer, unLikeByUser);
router.get('/api/product/getfeaturedCard', getFeaturedCardSix);

router.get('/api/product/all', getAll);
router.post('/api/product/filters', productFilters);

router.get(
  '/api/product/product_category/:id',
  protectCustomer2,
  getByProductCategoryId
);
router.get(
  '/api/product/product_sub_category/:id',
  protectCustomer2,
  getByProductBySubCategoryId
);
router.get('/api/product/:id', protectCustomer2, getById);
router.get('/api/product/search/:id', searchProducts);

export { router as productRouter };
