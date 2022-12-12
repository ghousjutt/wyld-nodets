"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const notification_controller_1 = require("../controllers/notification.controller");
const notification_dto_1 = require("../dto/notification.dto");
const router = express_1.default.Router();
exports.notificationRouter = router;
router.post("/api/notification/create", validate_request_1.validateAuth(notification_dto_1.createDto), notification_controller_1.create);
router.put("/api/notification/updatenotificationtext", validate_request_1.validateAuth(notification_dto_1.updateDto), notification_controller_1.updateText);
router.put("/api/notification/updatenotificationseen", validate_request_1.validateAuth(notification_dto_1.updateSeenDto), notification_controller_1.updateSeen);
router.get("/api/notification/", notification_controller_1.getAll);
router.get("/api/notification/:id", notification_controller_1.getById);
router.get("/api/notification/user/:id", notification_controller_1.getByUserId);
//# sourceMappingURL=notification.routes.js.map