import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import { protectCustomer } from "../middlewares/authMiddleware";
import {
  create,
  update,
  getAll,
  getById,
  getByProductId,
} from "../controllers/review.controller";
import { createDto, updateDto } from "../dto/review.dto";

const router = express.Router();

router.post(
  "/api/productreviews/create",
  protectCustomer,
  validateAuth(createDto),
  create
);

router.put("/api/productreviews/update", validateAuth(updateDto), update);

router.get("/api/productreviews", getAll);
router.get("/api/productreviews/reviewid/:id", getById);
router.get("/api/productreviews/productid/:id", getByProductId);

export { router as reviewRouter };
