"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const BusinessOwner_1 = require("./routes/BusinessOwner");
const Customer_routes_1 = require("./routes/Customer.routes");
const ProductCategory_routes_1 = require("./routes/ProductCategory.routes");
const Product_routes_1 = require("./routes/Product.routes");
const db_1 = __importDefault(require("./config/db"));
const Banner_routes_1 = require("./routes/Banner.routes");
const Order_routes_1 = require("./routes/Order.routes");
const Discount_routes_1 = require("./routes/Discount.routes");
const ProductSubCategory_routes_1 = require("./routes/ProductSubCategory.routes");
const FeatureCard_routes_1 = require("./routes/FeatureCard.routes");
const addToCard_routes_1 = require("./routes/addToCard.routes");
const review_routes_1 = require("./routes/review.routes");
const checkout_routes_1 = require("./routes/checkout.routes");
const notification_routes_1 = require("./routes/notification.routes");
const contactus_routes_1 = require("./routes/contactus.routes");
const becomeSeller_routes_1 = require("./routes/becomeSeller.routes");
const AmbassadorProgram_routes_1 = require("./routes/AmbassadorProgram.routes");
const app = express_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default();
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.static(__dirname + '/public'));
    app.use(BusinessOwner_1.businessOwnerRouter);
    app.use(Customer_routes_1.customerRouter);
    app.use(Banner_routes_1.bannerRouter);
    app.use(ProductCategory_routes_1.productCategoryRouter);
    app.use(ProductSubCategory_routes_1.productSubCategoryRouter);
    app.use(Product_routes_1.productRouter);
    app.use(Order_routes_1.orderRouter);
    app.use(Discount_routes_1.discountRouter);
    app.use(FeatureCard_routes_1.FeatureCardRouter);
    app.use(addToCard_routes_1.addToCardRouter);
    app.use(review_routes_1.reviewRouter);
    app.use(checkout_routes_1.checkoutRouter);
    app.use(notification_routes_1.notificationRouter);
    app.use(contactus_routes_1.contactusRouter);
    app.use(becomeSeller_routes_1.becomesellerRouter);
    app.use(AmbassadorProgram_routes_1.ambassadorProgramRouter);
    app.listen(80, () => {
        console.log('app is running on port 80');
    });
});
main();
//# sourceMappingURL=index.js.map