import { Request, Response } from 'express';
import Order from '../models/Order.model';
import mongoose from 'mongoose';

export const create = async (req: Request, res: Response) => {
  const {
    productIds,
    totalPrice,
    totalItems,
    customerInfo,
    description,
    deliveryAddress,
    customerId,
    status,
    provider,
    addToCartIds,
    orderData,
    paymentData,
  } = req.body;
  const countOrder = Math.floor(Math.random() * 1000000000);
  const trackNumber = Math.floor(Math.random() * 1000000000);
  const order = new Order({
    productIds,
    totalPrice,
    totalItems,
    customerId: customerId,
    customerInfo,
    description,
    deliveryAddress,
    status,
    provider,
    addToCartIds,
    orderNumber: countOrder,
    trackNumber,
    orderData,
    paymentData,
  });
  try {
    await order.save();
    return res
      .status(200)
      .json({ message: 'Created successfully', data: order });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating', error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  const {
    productIds,
    totalPrice,
    totalItems,
    customerInfo,
    orderData,
    paymentData,
    description,
    deliveryAddress,
    orderId,
    status,
  } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(orderId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid orderId` });
  }
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  order.productIds = productIds || order.productIds;
  order.totalPrice = totalPrice || order.totalPrice;
  order.totalItems = totalItems || order.totalItems;
  order.customerInfo = customerInfo || order.customerInfo;
  order.description = description || order.description;
  order.deliveryAddress = deliveryAddress || order.deliveryAddress;
  order.status = status || order.status;
  order.orderData = orderData || order.orderData;
  order.paymentData = paymentData || order.paymentData;

  await order.save();
  return res.status(200).json({ message: 'Order updated', data: order });
};

export const updateisPaySuccess = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(orderId);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid orderId` });
  }
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }
  order.isPaid = true;

  await order.save();
  return res.status(200).json({ message: 'Order updated', data: order });
};

export const getAll = async (req: Request, res: Response) => {
  const orders = await Order.find();
  return res.status(200).json({ message: 'Orders', data: orders });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: 'Product_id required in params' });
  }
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!checkId) {
    return res.status(400).json({ message: `Invalid id in params` });
  }
  const product = await Order.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Order not found' });
  }
  return res.status(200).json({ message: 'Order', data: product });
};

export const getByOrderNumber = async (req: Request, res: Response) => {
  const { ordernumber, email } = req.params;

  const product = await Order.findOne({
    orderNumber: parseInt(ordernumber),
    'customerInfo.email': email,
  })
    .populate({ path: 'addToCartIds', populate: { path: 'productId' } })
    .populate('customerId');
  if (!product) {
    return res.status(404).json({ message: 'Order not found' });
  }
  return res.status(200).json({ message: 'Order', data: product });
};

export const getByOrderCustomerId = async (req: Request, res: Response) => {
  const { id } = req.body;
  const orders = await Order.find({ customerId: id });
  return res.status(200).json({ message: 'Orders', data: orders });
};
