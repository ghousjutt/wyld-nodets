import { Request, Response } from "express";
import BannerModel from "../models/Banner.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const { bannerImage, bannerText } = req.body;

  const banner = new BannerModel({
    bannerImage,
    bannerText,
  });
  const createBanner = await banner.save();

  return res
    .status(200)
    .json({ message: "Banner Created", data: createBanner });
};

export const update = async (req: Request, res: Response) => {
  const { bannerImage, bannerText, bannerId } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(bannerId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid banner id` });
  }
  const banner: any = await BannerModel.findById(bannerId);
  if (!banner) {
    return res.status(404).json({ message: `Banner not found` });
  }
  banner.bannerImage = bannerImage || banner.bannerImage;
  banner.bannerText = bannerText || banner.bannerText;
  const updateBanner = await banner.save();

  return res
    .status(200)
    .json({ message: "Banner Updated", data: updateBanner });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid banner id` });
  }
  const banner = await BannerModel.findById(id);

  if (!banner) {
    return res.status(404).json({ message: `Banner not found` });
  }
  return res.status(200).json({ message: "Banner Found", data: banner });
};

export const getAll = async (req: Request, res: Response) => {
  const banners = await BannerModel.find();
  return res.status(200).json({ message: "Banners Found", data: banners });
};
