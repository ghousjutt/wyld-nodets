import { Request, Response } from "express";
import BecomeSellerModel from "../models/BecomeReseller.model";

export const create = async (req: Request, res: Response) => {
  const {
    companyName,
    country,
    contactPerson,
    phoneNumber,
    email,
    websiteAddress,
    aboutYourBrand,
    otherInfo,
  } = req.body;

  const bSellerus = new BecomeSellerModel({
    companyName,
    country,
    contactPerson,
    phoneNumber,
    email,
    websiteAddress,
    aboutYourBrand,
    otherInfo,
  });
  try {
    const createBecomeSeller = await bSellerus.save();

    return res
      .status(200)
      .json({ message: "Become Seller Created", data: createBecomeSeller });
  } catch (e) {
    return res.status(500).json({ message: "Error creating Become Seller" });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const becomeSeller = await BecomeSellerModel.findById(id);
    if (!becomeSeller) {
      return res.status(200).json({ message: "Become Seller not Found" });
    }

    return res
      .status(200)
      .json({ message: "Become Seller Found", data: becomeSeller });
  } catch (e) {
    return res.status(500).json({ message: "Error founding Become Seller" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const becomeSeller = await BecomeSellerModel.find({});
    if (!becomeSeller) {
      return res.status(200).json({ message: "Become Seller Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Become Seller Found", data: becomeSeller });
  } catch (e) {
    return res.status(500).json({ message: "Error founding Become Seller" });
  }
};
