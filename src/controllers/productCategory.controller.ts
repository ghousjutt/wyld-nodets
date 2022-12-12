import { Request, Response } from "express";
import ProductCategory from "../models/ProductCategory.model";
import FeatureCard from "../models/FeatureCard.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const { title, image, businessId, type } = req.body;
  const product = new ProductCategory({
    title,
    image,
    businessId,
    type,
  });

  const createProduct = await product.save();
  return res
    .status(200)
    .json({ message: "Category created", date: createProduct });
};

export const update = async (req: Request, res: Response) => {
  const { title, image, productCategoryId, type } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(productCategoryId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product: any = await ProductCategory.findById(productCategoryId);
  if (!product) {
    return res.status(404).json({ message: `Product_Category not found` });
  }
  product.title = title || product.title;
  product.image = image || product.image;
  product.type = type || product.type;
  await product.save();
  return res.status(200).json({ message: "Category updated", date: product });
};

export const getAll = async (req: Request, res: Response) => {
  const products = await ProductCategory.find().populate("subCategories");
  return res.status(200).json(products);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "Product_Category id required in params" });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await ProductCategory.findById(id).populate("subCategories");
  if (!product) {
    return res.status(404).json({ message: "Product Category not found" });
  }
  return res.status(200).json(product);
};

export const getByBusinessOwnerId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "businessOwner id required in params" });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const product = await ProductCategory.find({ businessId: id }).populate(
    "subCategories"
  );
  return res.status(200).json(product);
};

export const getByType = async (req: Request, res: Response) => {
  const { type } = req.params;
  if (!type) {
    return res.json({ message: "type required in params" });
  }

  const product = await ProductCategory.find({ type: type }).populate(
    "subCategories"
  );
  const featureCard = await FeatureCard.find({ type: type });
  return res.status(200).json({ products: product, featureCard: featureCard });
};
