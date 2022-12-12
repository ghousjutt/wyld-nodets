import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getById,
  getAll,
  getActiveDiscounts,
  getExpiredDiscounts,
} from "../controllers/discount.dto";
import { createDto, updateDto } from "../dto/discount.dto";

const router = express.Router();

router.post("/api/discount/create", validateAuth(createDto), create);

router.put("/api/discount/update", validateAuth(updateDto), update);

router.get("/api/discount/all", getAll);
router.get("/api/discount/active/getall", getActiveDiscounts);
router.get("/api/discount/expired/getall", getExpiredDiscounts);

router.get("/api/discount/:id", getById);

export { router as discountRouter };
