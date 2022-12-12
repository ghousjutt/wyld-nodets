import { Request, Response } from "express";
import Notification from "../models/Notification.model";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
  const {
    notificationText,
    userId,
    productId,
    orderId,
    AddToCardId,
    notificationType,
  } = req.body;
  const notification = new Notification({
    notificationText,
    userId,
    productId,
    orderId,
    AddToCardId,
    notificationType,
  });
  try {
    await notification.save();
    return res
      .status(200)
      .json({ message: "Created successfully", data: notification });
  } catch (err) {
    return res.status(500).json({ message: "Error creating", error: err });
  }
};

export const updateText = async (req: Request, res: Response) => {
  const { notificationId, notificationText } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(notificationId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid notificationId` });
  }
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification not found." });
  }
  notification.notificationText =
    notificationText || notification.notificationText;

  await notification.save();
  return res.status(200).json({ message: "Data updated", data: notification });
};

export const updateSeen = async (req: Request, res: Response) => {
  const { notificationId, isSeen } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(notificationId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid notificationId` });
  }
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification not found." });
  }
  notification.isSeen = isSeen;

  await notification.save();
  return res.status(200).json({ message: "Data updated", data: notification });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res
      .status(400)
      .json({ message: `Invalid notificationId in params` });
  }
  const notification = await Notification.findById(id);
  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Data found", data: notification });
};

export const getAll = async (req: Request, res: Response) => {
  const notifications = await Notification.find();
  if (!notifications) {
    return res
      .status(404)
      .json({ success: false, message: "Notifications not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Data found", data: notifications });
};

export const getByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await Notification.find({ userId: id });
  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Data found", data: notification });
};
