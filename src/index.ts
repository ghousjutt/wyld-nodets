import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { businessOwnerRouter } from './routes/BusinessOwner';
import { customerRouter } from './routes/Customer.routes';
import { productCategoryRouter } from './routes/ProductCategory.routes';
import { productRouter } from './routes/Product.routes';
import connectDB from './config/db';
import { bannerRouter } from './routes/Banner.routes';
import { orderRouter } from './routes/Order.routes';
import { discountRouter } from './routes/Discount.routes';
import { productSubCategoryRouter } from './routes/ProductSubCategory.routes';
import { FeatureCardRouter } from './routes/FeatureCard.routes';
import { addToCardRouter } from './routes/addToCard.routes';
import { reviewRouter } from './routes/review.routes';
import { checkoutRouter } from './routes/checkout.routes';
import { notificationRouter } from './routes/notification.routes';
import { contactusRouter } from './routes/contactus.routes';
import { becomesellerRouter } from './routes/becomeSeller.routes';
import { ambassadorProgramRouter } from './routes/AmbassadorProgram.routes';

const app = express();

const main = async () => {
  connectDB();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(__dirname + '/public'));
  app.use(businessOwnerRouter);
  app.use(customerRouter);
  app.use(bannerRouter);
  app.use(productCategoryRouter);
  app.use(productSubCategoryRouter);
  app.use(productRouter);
  app.use(orderRouter);
  app.use(discountRouter);
  app.use(FeatureCardRouter);
  app.use(addToCardRouter);
  app.use(reviewRouter);
  app.use(checkoutRouter);
  app.use(notificationRouter);
  app.use(contactusRouter);
  app.use(becomesellerRouter);
  app.use(ambassadorProgramRouter);

  app.listen(80, () => {
    console.log('app is running on port 80');
  });
};

main();
