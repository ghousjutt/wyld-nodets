"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomesellerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const becomeReseller_controller_1 = require("../controllers/becomeReseller.controller");
const becomeSeller_dto_1 = require("../dto/becomeSeller.dto");
const router = express_1.default.Router();
exports.becomesellerRouter = router;
router.post("/api/becomeseller/create", validate_request_1.validateAuth(becomeSeller_dto_1.createDto), becomeReseller_controller_1.create);
router.get("/api/becomeseller/:id", becomeReseller_controller_1.getById);
router.get("/api/becomeseller", becomeReseller_controller_1.getAll);
//# sourceMappingURL=becomeSeller.routes.js.map