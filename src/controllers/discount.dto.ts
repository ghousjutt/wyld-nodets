import { Request, Response } from "express";
import Discount from "../models/discount.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const { amountinPercent, discountCode } = req.body;
  const discount = new Discount({
    amountinPercent,
    discountCode,
  });
  try {
    await discount.save();
    return res
      .status(200)
      .json({ message: "Created successfully", data: discount });
  } catch (err) {
    return res.status(500).json({ message: "Error creating", error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  const { discountId, amountinPercent, discountCode, isExpired } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(discountId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid discountId` });
  }
  const discount = await Discount.findById(discountId);
  if (!discount) {
    return res.status(404).json({ message: "Discount not found." });
  }
  discount.amountinPercent = amountinPercent || discount.amountinPercent;
  discount.discountCode = discountCode || discount.discountCode;
  discount.isExpired = isExpired || discount.isExpired;

  await discount.save();
  return res.status(200).json({ message: "Discount updated", data: discount });
};

export const getAll = async (req: Request, res: Response) => {
  const discounts = await Discount.find();
  return res.status(200).json({ message: "Discounts", data: discounts });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "discount_id required in params" });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id in params` });
  }
  const discount = await Discount.findById(id);
  if (!discount) {
    return res.status(404).json({ message: "Discount not found" });
  }
  return res.status(200).json({ message: "Discounts", data: discount });
};

export const getActiveDiscounts = async (req: Request, res: Response) => {
  const discounts = await Discount.find({ isExpired: false });
  return res.status(200).json({ message: "Discounts", data: discounts });
};

export const getExpiredDiscounts = async (req: Request, res: Response) => {
  const discounts = await Discount.find({ isExpired: true });
  return res.status(200).json({ message: "Discounts", data: discounts });
};
