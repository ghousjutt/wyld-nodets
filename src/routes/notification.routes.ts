import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  updateText,
  updateSeen,
  getById,
  getAll,
  getByUserId,
} from "../controllers/notification.controller";
import { createDto, updateDto, updateSeenDto } from "../dto/notification.dto";

const router = express.Router();

router.post("/api/notification/create", validateAuth(createDto), create);

router.put(
  "/api/notification/updatenotificationtext",
  validateAuth(updateDto),
  updateText
);
router.put(
  "/api/notification/updatenotificationseen",
  validateAuth(updateSeenDto),
  updateSeen
);

router.get("/api/notification/", getAll);

router.get("/api/notification/:id", getById);
router.get("/api/notification/user/:id", getByUserId);

export { router as notificationRouter };
