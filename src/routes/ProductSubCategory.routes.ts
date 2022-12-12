import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getById,
  getAll,
  getByCategoryId,
  getFourProducts,
} from "../controllers/productSubCategory.controller";
import { createDto, updateDto } from "../dto/productSubCategory.dto";

const router = express.Router();

router.post(
  "/api/product_sub_category/create",
  validateAuth(createDto),
  create
);

router.put("/api/product_sub_category/update", validateAuth(updateDto), update);

router.get("/api/product_sub_category/all", getAll);
router.get("/api/product_sub_category/category/:id", getByCategoryId);

router.get("/api/product_sub_category/:id", getById);
router.get("/api/product_sub_category/getfourobjects/get", getFourProducts);

export { router as productSubCategoryRouter };
