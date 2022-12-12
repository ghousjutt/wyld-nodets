import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getById,
  getAll,
  getByOrderCustomerId,
  updateisPaySuccess,
  getByOrderNumber,
} from "../controllers/order.controller";
import { createDto, updateDto } from "../dto/order.dto";
import { protectCustomer } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/api/order/create",
  protectCustomer,
  validateAuth(createDto),
  create
);

router.put("/api/order/update", validateAuth(updateDto), update);
router.put("/api/order/ispaid", validateAuth(updateDto), updateisPaySuccess);

router.get("/api/order/all", getAll);
router.get("/api/order/customer/getall", protectCustomer, getByOrderCustomerId);

router.get("/api/order/:id", getById);
router.get("/api/order/trackorder/:ordernumber/:email", getByOrderNumber);

export { router as orderRouter };
