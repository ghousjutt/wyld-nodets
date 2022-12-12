"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCardRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const addToCard_controller_1 = require("../controllers/addToCard.controller");
const addToCard_dto_1 = require("../dto/addToCard.dto");
const router = express_1.default.Router();
exports.addToCardRouter = router;
router.post('/api/addtocard/create', authMiddleware_1.protectCustomer, validate_request_1.validateAuth(addToCard_dto_1.createDto), addToCard_controller_1.create);
router.put('/api/addtocard/update', authMiddleware_1.protectCustomer, validate_request_1.validateAuth(addToCard_dto_1.updateDto), addToCard_controller_1.update);
router.delete('/api/addtocard/delete/:id', addToCard_controller_1.deleteCard);
router.get('/api/addtocard', addToCard_controller_1.getAll);
router.get('/api/addtocard/user/:id', authMiddleware_1.protectCustomer, addToCard_controller_1.getAllUserCards);
router.get('/api/addtocard/:id', addToCard_controller_1.getById);
//# sourceMappingURL=addToCard.routes.js.map