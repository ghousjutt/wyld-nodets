"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ambassadorProgramRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const AmbassadorProgram_controller_1 = require("../controllers/AmbassadorProgram.controller");
const ambassadorProgram_dto_1 = require("../dto/ambassadorProgram.dto");
const router = express_1.default.Router();
exports.ambassadorProgramRouter = router;
router.post("/api/ambassadorprogram/create", validate_request_1.validateAuth(ambassadorProgram_dto_1.createDto), AmbassadorProgram_controller_1.create);
router.get("/api/ambassadorprogram/:id", AmbassadorProgram_controller_1.getById);
router.get("/api/ambassadorprogram", AmbassadorProgram_controller_1.getAll);
//# sourceMappingURL=AmbassadorProgram.routes.js.map