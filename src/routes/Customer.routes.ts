import express from 'express';
import { validateAuth } from '../middlewares/validate-request';
import {
  changePassword,
  create,
  getAll,
  getById,
  login,
  updateCustomer,
  sendResetPasswordLink,
  sendEmailToUser,
  resetPassword,
  socialAuthLogin,
} from '../controllers/customer.controller';
import {
  authDto,
  changePasswordDto,
  registerDto,
  sendPasswordLinkDto,
} from '../dto/customer.dto';
import {
  getCustomerUser,
  protectCustomer,
} from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/api/customer/register', validateAuth(registerDto), create);

router.post('/api/customer/login', validateAuth(authDto), login);
router.put('/api/customer/update', protectCustomer, updateCustomer);
router.post('/api/customer/sendpasswordcode', sendResetPasswordLink);

router.post('/api/customer/resetpassword', resetPassword);

router.put(
  '/api/customer/change-password',
  validateAuth(changePasswordDto),
  changePassword
);
router.post('/api/customer/sendemail', sendEmailToUser);
router.post('/api/customer/socialauth', socialAuthLogin);
router.get('/api/customer/all', getAll);
router.get('/api/customer/getcustomer', getCustomerUser);
router.get('/api/customer/:id', getById);

export { router as customerRouter };
