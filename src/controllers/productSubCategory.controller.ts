import { Request, Response } from "express";
import ProductSubCategory from "../models/ProductSubCategory.model";
import Category from "../models/ProductCategory.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const { title, image, categoryId } = req.body;
  const product = new ProductSubCategory({
    title,
    image,
    categoryId,
  });

  const createProductSub = await product.save();
  let findCategory = await Category.findById(categoryId);
  if (findCategory) {
    findCategory.subCategories.push(createProductSub._id);
    await findCategory.save();
  } else {
    return res.status(404).json({
      success: false,
      message: "Category not found. Please provide an existing categoryId",
      date: createProductSub,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Category created",
    date: createProductSub,
  });
};

export const update = async (req: Request, res: Response) => {
  const { title, image, productSubCategoryId } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(productSubCategoryId);
  if (!checkId) {
    return res
      .status(400)
      .json({ success: false, message: `Invalid productSubCategoryId` });
  }
  const product: any = await ProductSubCategory.findById(productSubCategoryId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: `Product_sub_Category not found` });
  }
  product.title = title || product.title;
  product.image = image || product.image;
  await product.save();
  return res
    .status(200)
    .json({ success: true, message: "Sub Category updated", date: product });
};

export const getAll = async (req: Request, res: Response) => {
  const products = await ProductSubCategory.find().populate("categoryId");
  return res
    .status(200)
    .json({ success: true, message: "Sub Category found", date: products });
};

export const getFourProducts = async (req: Request, res: Response) => {
  const products = await ProductSubCategory.find();
  let productList: any = [];
  if (products) {
    products.map((data) => {
      if (productList.length < 4) {
        productList.push(data);
      }
    });
  }
  return res.status(200).json({
    success: true,
    message: "Sub Category 4 objects",
    data: productList,
  });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "Product_sub_Category id required in params" });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await ProductSubCategory.findById(id).populate("categoryId");
  if (!product) {
    return res.status(404).json({ message: "Sub Category not found" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Sub Category found", date: product });
};

export const getByCategoryId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({
      success: false,
      message: "category id required in params",
    });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await ProductSubCategory.find({ categoryId: id }).populate(
    "categoryId"
  );
  return res
    .status(200)
    .json({ success: true, message: "Sub Categories found", date: product });
};
