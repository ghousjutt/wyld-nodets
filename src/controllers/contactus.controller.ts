import { Request, Response } from "express";
import ContactusModel from "../models/Contactus.model";

export const create = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const contactus = new ContactusModel({
    name,
    email,
    message,
  });
  try {
    const createContactus = await contactus.save();

    return res
      .status(200)
      .json({ message: "Contactus Created", data: createContactus });
  } catch (e) {
    return res.status(500).json({ message: "Error creating Contactus" });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contactUs = await ContactusModel.findById(id);
    if (!contactUs) {
      return res.status(200).json({ message: "Contactus not Found" });
    }

    return res
      .status(200)
      .json({ message: "Contactus Found", data: contactUs });
  } catch (e) {
    return res.status(500).json({ message: "Error founding Contactus" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const contactUS = await ContactusModel.find({});
    if (!contactUS) {
      return res.status(200).json({ message: "Contactus Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Contactus Found", data: contactUS });
  } catch (e) {
    return res.status(500).json({ message: "Error founding Contactus" });
  }
};
