import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import { create, getAll, getById } from "../controllers/contactus.controller";
import { createDto } from "../dto/contactus.dto";

const router = express.Router();

router.post("/api/contactus/create", validateAuth(createDto), create);

router.get("/api/contactus/:id", getById);
router.get("/api/contactus", getAll);

export { router as contactusRouter };
