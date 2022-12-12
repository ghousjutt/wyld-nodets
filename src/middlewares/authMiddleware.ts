import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import BusinessOwner from "../models/BusinessOwner.model";
import Customer from "../models/Customer.model";

const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      req.user = await BusinessOwner.findById(decode.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorize");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorize");
  }
};

const protectCustomer = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      const user = await Customer.findById(decode.id);
      if (!user) {
        res.status(401);
        throw new Error("Not valid token");
      }
      req.body.id = user._id;
      next();
    } catch (error) {
      res.status(401);
      res.json({ message: "Invalid token" });
    }
  }

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorize please provider token" });
  }
};

const protectCustomer2 = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      const user = await Customer.findById(decode.id);
      if (!user) {
        req.body.id = null;
        next();
        return;
      }
      req.body.id = user._id;
      next();
    } catch (error) {
      res.status(401);
      res.json({ message: "Invalid token" });
    }
  }

  if (!token) {
    req.body.id = null;
    next();
  }
};

const getBusinessUser = async (req: any, res: any, next: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      const user = await BusinessOwner.findById(decode.id);
      if (!user) {
        return res.status(401).send("Token expired");
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).send("Not authorize");
    }
  }

  if (!token) {
    return res.status(401).send("Not authorize");
  }
};

const getCustomerUser = async (req: any, res: any, next: any) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      const user = await Customer.findById(decode.id);
      if (!user) {
        return res.status(401).send("Token expired");
      }
      return res.status(200).json(user);
      next();
    } catch (error) {
      return res.status(401).send("Not authorize");
    }
  }

  if (!token) {
    return res.status(401).send("Not authorize");
  }
};

export {
  protect,
  getBusinessUser,
  getCustomerUser,
  protectCustomer,
  protectCustomer2,
};
