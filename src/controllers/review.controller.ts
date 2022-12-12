import { Request, Response } from "express";
import ReviewModel from "../models/Reviews.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const { id, productId, description, starts } = req.body;

  const review = new ReviewModel({
    userId: id,
    productId,
    description,
    starts,
  });
  try {
    const createreview = await review.save();

    return res
      .status(200)
      .json({ message: "review Created", data: createreview });
  } catch (e) {
    return res.status(500).json({ message: "Error creating reviews" });
  }
};

export const update = async (req: Request, res: Response) => {
  const { reviewId, description, starts } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(reviewId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid reviewId` });
  }
  const review: any = await ReviewModel.findById(reviewId);
  if (!review) {
    return res.status(404).json({ message: `Review not found` });
  }
  review.description = description || review.description;
  review.starts = starts || review.starts;
  try {
    const updateReview = await review.save();

    return res
      .status(200)
      .json({ message: "Review Updated", data: updateReview });
  } catch (e) {
    return res.status(500).json({ message: "Error updating review" });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid review id in params` });
  }
  const review = await ReviewModel.findById(id).populate("userId");

  if (!review) {
    return res.status(404).json({ message: `Review not found` });
  }
  return res.status(200).json({ message: "Review Found", data: review });
};

export const getAll = async (req: Request, res: Response) => {
  const reviews = await ReviewModel.find().populate("userId");
  return res.status(200).json({ message: "Reviews Found", data: reviews });
};

export const getByProductId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid product id in params` });
  }
  const reviews = await ReviewModel.find({ productId: id }).populate("userId");

  if (!reviews) {
    return res.status(404).json({ message: `Review not found` });
  }
  return res.status(200).json({ message: "Review Found", data: reviews });
};
