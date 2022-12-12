import { Request, Response } from 'express';
import AddtoCard from '../models/AddToCard.model';
import mongoose from 'mongoose';

export const create = async (req: Request, res: Response) => {
  const {
    productColor,
    productSize,
    productQuantity,
    totalPrice,
    productId,
    id,
  } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(productId);
  if (!checkId) {
    return res
      .status(400)
      .json({ message: `Invalid productId`, success: false });
  }
  const addtocard = new AddtoCard({
    productColor,
    productSize,
    productQuantity,
    totalPrice,
    productId,
    userId: id,
  });
  try {
    const createAddtoCard = await addtocard.save();

    return res
      .status(200)
      .json({ message: 'Created', success: true, data: createAddtoCard });
  } catch (e) {
    return res.status(500).json({ message: 'Server Error', success: false });
  }
};

export const update = async (req: Request, res: Response) => {
  const {
    productColor,
    productSize,
    productQuantity,
    totalPrice,
    addTocardId,
  } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(addTocardId);
  if (!checkId) {
    return res
      .status(400)
      .json({ message: `Invalid addTocardId`, success: false });
  }
  const addToCard: any = await AddtoCard.findById(addTocardId);
  if (!addToCard) {
    return res
      .status(404)
      .json({ message: `AddToCard not found`, success: false });
  }

  addToCard.productColor = productColor || addToCard.productColor;
  addToCard.productSize = productSize || addToCard.productSize;

  addToCard.productQuantity = productQuantity || addToCard.productQuantity;
  addToCard.totalPrice = totalPrice || addToCard.totalPrice;

  try {
    const updateAddToCard = await addToCard.save();

    return res
      .status(200)
      .json({ message: 'Updated', success: true, data: updateAddToCard });
  } catch (e) {
    return res.status(200).json({ message: 'Server Error', success: false });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid addTocardId id` });
  }
  const addToCard = await AddtoCard.findById(id).populate('productId');

  if (!addToCard) {
    return res.status(404).json({ message: `AddToCard not found` });
  }
  return res.status(200).json({ message: 'AddToCard Found', data: addToCard });
};

export const getAll = async (req: Request, res: Response) => {
  const banners = await AddtoCard.find().populate('productId');
  return res.status(200).json({ message: 'AddtoCard Found', data: banners });
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let data = await AddtoCard.findByIdAndDelete(id);
    console.log('Delete :: ', data);
    return res
      .status(200)
      .json({ success: true, message: 'AddtoCard Deleted' });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: 'Error Deleteing AddtoCard' });
  }
};

export const getAllUserCards = async (req: Request, res: Response) => {
  const id = req.params.id;

  const cards = await AddtoCard.find({ userId: id }).populate('productId');
  return res.status(200).json({ message: 'AddtoCard Found', data: cards });
};
