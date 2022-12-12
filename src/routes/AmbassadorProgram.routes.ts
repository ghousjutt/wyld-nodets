import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  getAll,
  getById,
} from "../controllers/AmbassadorProgram.controller";
import { createDto } from "../dto/ambassadorProgram.dto";

const router = express.Router();

router.post("/api/ambassadorprogram/create", validateAuth(createDto), create);

router.get("/api/ambassadorprogram/:id", getById);
router.get("/api/ambassadorprogram", getAll);

export { router as ambassadorProgramRouter };
