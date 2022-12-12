"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureCardRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const FeatureCard_controller_1 = require("../controllers/FeatureCard.controller");
const FeatureCard_dto_1 = require("../dto/FeatureCard.dto");
const router = express_1.default.Router();
exports.FeatureCardRouter = router;
router.post("/api/featurecard/create", validate_request_1.validateAuth(FeatureCard_dto_1.createDto), FeatureCard_controller_1.create);
router.put("/api/featurecard/update", validate_request_1.validateAuth(FeatureCard_dto_1.updateDto), FeatureCard_controller_1.update);
router.get("/api/featurecard", FeatureCard_controller_1.getAll);
router.get("/api/featurecard/men", FeatureCard_controller_1.getForMen);
router.get("/api/featurecard/women", FeatureCard_controller_1.getForWomen);
//# sourceMappingURL=FeatureCard.routes.js.map