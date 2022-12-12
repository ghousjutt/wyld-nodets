"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const banner_controller_1 = require("../controllers/banner.controller");
const banner_dto_1 = require("../dto/banner.dto");
const router = express_1.default.Router();
exports.bannerRouter = router;
router.post("/api/banner/create", validate_request_1.validateAuth(banner_dto_1.createDto), banner_controller_1.create);
router.put("/api/banner/update", validate_request_1.validateAuth(banner_dto_1.updateDto), banner_controller_1.update);
router.get("/api/banner", banner_controller_1.getAll);
router.get("/api/banner/:id", banner_controller_1.getById);
//# sourceMappingURL=Banner.routes.js.map