import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getAll,
  getForMen,
  getForWomen,
} from "../controllers/FeatureCard.controller";
import { createDto, updateDto } from "../dto/FeatureCard.dto";
const router = express.Router();

router.post("/api/featurecard/create", validateAuth(createDto), create);
router.put("/api/featurecard/update", validateAuth(updateDto), update);
router.get("/api/featurecard", getAll);
router.get("/api/featurecard/men", getForMen);
router.get("/api/featurecard/women", getForWomen);

export { router as FeatureCardRouter };
