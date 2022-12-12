import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  getAll,
  getById,
} from "../controllers/becomeReseller.controller";
import { createDto } from "../dto/becomeSeller.dto";

const router = express.Router();

router.post("/api/becomeseller/create", validateAuth(createDto), create);

router.get("/api/becomeseller/:id", getById);
router.get("/api/becomeseller", getAll);

export { router as becomesellerRouter };
