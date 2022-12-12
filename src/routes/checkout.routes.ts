import express from 'express';
import { validateAuth } from '../middlewares/validate-request';
import {
  create,
  createPaypal,
  successPaypal,
  cancelPaypal,
} from '../controllers/checkout.controller';
import { createDto } from '../dto/checkout.dto';
import { protectCustomer } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/api/checkout', protectCustomer, validateAuth(createDto), create);
router.get('/api/paypalcheckout', createPaypal);
router.get('/api/success', successPaypal);
router.get('/api/cancel', cancelPaypal);

export { router as checkoutRouter };
