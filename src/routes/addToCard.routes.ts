import express from 'express';
import { validateAuth } from '../middlewares/validate-request';
import { protectCustomer } from '../middlewares/authMiddleware';
import {
  create,
  update,
  getAll,
  getById,
  getAllUserCards,
  deleteCard,
} from '../controllers/addToCard.controller';
import { createDto, updateDto } from '../dto/addToCard.dto';

const router = express.Router();

router.post(
  '/api/addtocard/create',
  protectCustomer,
  validateAuth(createDto),
  create
);

router.put(
  '/api/addtocard/update',
  protectCustomer,
  validateAuth(updateDto),
  update
);

router.delete('/api/addtocard/delete/:id', deleteCard);
router.get('/api/addtocard', getAll);
router.get('/api/addtocard/user/:id', protectCustomer, getAllUserCards);
router.get('/api/addtocard/:id', getById);

export { router as addToCardRouter };
