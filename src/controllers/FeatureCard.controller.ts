import { Request, Response } from "express";
import FeatureCard from "../models/FeatureCard.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const { image, description, price, type } = req.body;
  const featureCard = new FeatureCard({ image, description, price, type });
  try {
    await featureCard.save();
    return res
      .status(200)
      .json({ message: "Created successfully", data: featureCard });
  } catch (err) {
    return res.status(500).json({ message: "Error creating", error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  const { featureCardId, image, description, price, type } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(featureCardId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid featureCardId` });
  }
  const featureCard = await FeatureCard.findById(featureCardId);
  if (!featureCard) {
    return res.status(404).json({ message: "FeatureCard not found." });
  }
  featureCard.image = image || featureCard.image;
  featureCard.description = description || featureCard.description;
  featureCard.price = price || featureCard.price;
  featureCard.type = type || featureCard.type;

  await featureCard.save();
  return res.status(200).json({ message: "Data updated", data: featureCard });
};

export const getAll = async (req: Request, res: Response) => {
  const featureCards = await FeatureCard.find();
  if (!featureCards) {
    return res.status(204).json({ message: "Data not found", data: [] });
  }
  return res.status(200).json({ message: "Data found", data: featureCards });
};

export const getForMen = async (req: Request, res: Response) => {
  const featureCards = await FeatureCard.find({ type: "men" });
  if (!featureCards) {
    return res.status(204).json({ message: "Data not found", data: [] });
  }
  return res.status(200).json({ message: "Data found", data: featureCards });
};

export const getForWomen = async (req: Request, res: Response) => {
  const featureCards = await FeatureCard.find({ type: "women" });
  if (!featureCards) {
    return res.status(204).json({ message: "Data not found", data: [] });
  }
  return res.status(200).json({ message: "Data found", data: featureCards });
};
