"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactusRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const contactus_controller_1 = require("../controllers/contactus.controller");
const contactus_dto_1 = require("../dto/contactus.dto");
const router = express_1.default.Router();
exports.contactusRouter = router;
router.post("/api/contactus/create", validate_request_1.validateAuth(contactus_dto_1.createDto), contactus_controller_1.create);
router.get("/api/contactus/:id", contactus_controller_1.getById);
router.get("/api/contactus", contactus_controller_1.getAll);
//# sourceMappingURL=contactus.routes.js.map