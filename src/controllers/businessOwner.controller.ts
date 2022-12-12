import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import BusinessOwner from "../models/BusinessOwner.model";
import generateToken from "../utils/generateToken";
import mongoose from "mongoose";

export const createBusinessOwner = async (req: Request, res: Response) => {
  const { businessName, email, password, logoImagePath } = req.body;
  const businessExist = await BusinessOwner.findOne({ email: email });
  if (businessExist) {
    return res
      .status(400)
      .json({ message: "Business with this email already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const businessOwner = new BusinessOwner({
    businessName,
    email,
    password: hashPassword,
    logoImagePath,
  });

  await businessOwner.save();
  return res.json({
    id: businessOwner._id,
    businessName: businessOwner.businessName,
    email: businessOwner.email,
    logoImagePath: businessOwner.logoImagePath,
    token: generateToken(businessOwner._id),
  });
};

export const loginBusinessOwner = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const businessOwner: any = await BusinessOwner.findOne({ email: email });
  if (!businessOwner) {
    res.status(404);
    return res.json({
      message: "Email not exist in database",
    });
  }
  const compairPasswords = await bcrypt.compare(
    password,
    businessOwner.password
  );
  if (compairPasswords) {
    return res.json({
      id: businessOwner._id,
      businessName: businessOwner.businessName,
      email: businessOwner.email,
      logoImagePath: businessOwner.logoImagePath,
      token: generateToken(businessOwner._id),
    });
  } else {
    return res.json({
      message: "Email or password incorrect",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, newPassword, oldPassword } = req.body;
  const user: any = await BusinessOwner.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ message: `User agains ${email} not exists.` });
  }
  const compairPasswords = await bcrypt.compare(oldPassword, user.password);

  if (!compairPasswords) {
    return res.status(401).json({ message: `Wrong old password` });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashPassword;
  await user.save();

  return res.status(200).json({ message: `Password updated` });
};

export const getBusinessOwnerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!id) {
    return res.status(400).json({ message: `Missing id in params` });
  }
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  try {
    const businessOwner: any = await BusinessOwner.findById(id);
    if (!businessOwner) {
      return res.status(404).json({ message: `User agains ${id} not exists.` });
    }

    return res.json({
      id: businessOwner.id,
      businessName: businessOwner.businessName,
      email: businessOwner.email,
      logoImagePath: businessOwner.logoImagePath,
    });
  } catch (error) {
    res.status(500);
    return res.json({
      error: error.message,
    });
  }
};

export const getAllBusinessOwners = async (req: Request, res: Response) => {
  const businessOwners = await BusinessOwner.find();

  return res.json({
    businessOwners,
  });
};
