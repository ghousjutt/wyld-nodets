import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getAll,
  getById,
} from "../controllers/banner.controller";
import { createDto, updateDto } from "../dto/banner.dto";

const router = express.Router();

router.post("/api/banner/create", validateAuth(createDto), create);

router.put("/api/banner/update", validateAuth(updateDto), update);

router.get("/api/banner", getAll);
router.get("/api/banner/:id", getById);

export { router as bannerRouter };
