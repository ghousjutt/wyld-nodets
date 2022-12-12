import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Customer from '../models/Customer.model';
import generateToken from '../utils/generateToken';
import { gmailEmail, gmailPassword } from '../config/credentials';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const create = async (req: Request, res: Response) => {
  const {
    email,
    password,
    profileImagePath,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBarth,
    streetAddress,
    city,
  } = req.body;
  const customerExist = await Customer.findOne({ email: email });

  if (customerExist) {
    return res
      .status(400)
      .json({ message: 'Customer with this email already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const customer = new Customer({
    email,
    password: hashPassword,
    profileImagePath,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBarth,
    streetAddress,
    city,
  });

  await customer.save();
  return res.status(200).json({
    id: customer._id,
    name: customer.firstName,
    email: customer.email,
    profileImagePath: customer.profileImagePath,
    token: generateToken(customer._id),
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const customer: any = await Customer.findOne({ email: email });
  if (!customer) {
    res.status(404);
    return res.json({
      message: 'Email not exist in database',
    });
  }
  const compairPasswords = await bcrypt.compare(password, customer.password);
  if (compairPasswords) {
    return res.json({
      id: customer._id,
      businessName: customer.name,
      email: customer.email,
      profileImagePath: customer.profileImagePath,
      token: generateToken(customer._id),
    });
  } else {
    return res.json({
      message: 'Email or password incorrect',
    });
  }
};

export const socialAuthLogin = async (req: Request, res: Response) => {
  const {
    email,
    profileImagePath,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBarth,
    streetAddress,
    city,
  } = req.body;

  if (!email) {
    res.status(404);
    return res.json({
      message: 'email required',
    });
  }

  const customer: any = await Customer.findOne({ email: email });
  if (customer) {
    return res.status(200).json({
      id: customer._id,
      name: customer.firstName,
      email: customer.email,
      profileImagePath: customer.profileImagePath,
      token: generateToken(customer._id),
    });
  }
  const createCustomer = new Customer({
    email,
    password: 'wyld123',
    profileImagePath,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBarth,
    streetAddress,
    city,
  });

  await createCustomer.save();
  return res.status(200).json({
    id: createCustomer._id,
    name: createCustomer.firstName,
    email: createCustomer.email,
    profileImagePath: createCustomer.profileImagePath,
    token: generateToken(createCustomer._id),
  });
};

export const updateCustomer = async (req: Request, res: Response) => {
  const {
    id,
    profileImagePath,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBarth,
    streetAddress,
    city,
  } = req.body;
  const customer: any = await Customer.findById(id);
  if (!customer) {
    res.status(404);
    return res.json({ message: 'Not found' });
  }
  customer.profileImagePath = profileImagePath || customer.profileImagePath;
  customer.firstName = firstName || customer.firstName;
  customer.lastName = lastName || customer.lastName;
  customer.phoneNumber = phoneNumber || customer.phoneNumber;
  customer.gender = gender || customer.gender;
  customer.dateOfBarth = dateOfBarth || customer.dateOfBarth;
  customer.streetAddress = streetAddress || customer.streetAddress;
  customer.city = city || customer.city;
  const updatedCustomer = await customer.save();
  res.status(200);
  return res.json({ message: 'updated', data: updatedCustomer });
};

export const sendResetPasswordLink = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user: any = await Customer.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ message: `User agains ${email} not exists.` });
  }

  let emails = [email.toString()];
  const randomNumber = Math.floor(Math.random() * 10000);
  user.code = randomNumber;
  var mailOptions = {
    from: gmailEmail,
    to: emails,
    subject: 'WYLD POS',
    // text: isApporved,
    html: `<h3>Following is your password reset code</h3><div><p style='margin:0px'>Code: ${randomNumber}</p></div>`,
  };
  await user.save();
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).json({ message: `Server sending reset password email` });
    }
  });

  return res.status(200).json({ message: `Code sent to email` });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: `email is required` });
  }
  if (!code) {
    return res.status(400).json({ message: `code is required` });
  }
  if (!newPassword) {
    return res.status(400).json({ message: `newPassword is required` });
  }
  const user: any = await Customer.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: `User not exists.` });
  }

  if (parseInt(user.code) !== parseInt(code)) {
    return res.status(400).json({ message: `Invalid code.` });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashPassword;
  user.code = 0;
  await user.save();

  return res.status(200).json({ message: `Password updated` });
};

export const changePassword = async (req: Request, res: Response) => {
  const { userId, newPassword, oldPassword } = req.body;
  const checkId = mongoose.Types.ObjectId.isValid(userId);

  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }
  const user: any = await Customer.findById(userId);

  if (!user) {
    return res.status(404).json({ message: `User not exists.` });
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

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);
  if (!id) {
    return res.status(400).json({ message: `Missing id in params` });
  }

  if (!checkId) {
    return res.status(400).json({ message: `Invalid id` });
  }

  const customer: any = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json({ message: `User agains ${id} not exists.` });
  }

  res.status(200);
  return res.json({ message: 'Found', data: customer });
};

export const getAll = async (req: Request, res: Response) => {
  const customers = await Customer.find();

  return res.json({
    customers,
  });
};

export const sendEmailToUser = async (req: Request, res: Response) => {
  const { userEmail, quantity, color, message, categoryName, productName } =
    req.body;
  if (!userEmail) {
    return res.json({
      success: false,
      message: 'userEmail attribute required in the body',
    });
  }
  let emails = [userEmail.toString()];
  var mailOptions = {
    from: gmailEmail,
    to: emails,
    subject: 'WYLD POS',
    // text: isApporved,
    html: `<h3>WYLD Platform email</h3><div><p style='margin:0px'>Please click below link to reset your password</p>
    <p style='margin:0px'><b>User Email:</b> ${userEmail}</p><br/>
    <p style='margin:0px'><b>Product Name:</b> ${
      productName || 'Not provided'
    }</p><br/>
    <p style='margin:0px'><b>Category Name:</b> ${
      categoryName || 'Not provided'
    }</p><br/>
    <p style='margin:0px'><b>Quantity:</b> ${
      quantity || 'Not provided'
    }</p><br/>
    <p style='margin:0px'><b>Color:</b> ${color || 'Not provided'}</p><br/><br/>
    <p style='margin:0px'><b>Message:</b> ${message || 'Not provided'}</p><br/>
    <p style='margin:0px'>In any case, if you wish to try our products or acquire more information please, contact us at:</p><br/><p style='margin:0px'>T: +35799660452</p><p style='margin:0px'>E: wyld.poss@gmail,com</p><br/><p style='margin:0px'>Thank you,</p><br/><p style='margin:0px'>Wyld POS</p></div>`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error sending email :: ', error);
      return res
        .status(500)
        .json({ success: false, message: `Server sending email failed` });
    } else {
      console.log('success sending email');
      return res
        .status(200)
        .json({ success: true, message: `Please check you email` });
    }
  });
  return res
    .status(200)
    .json({ success: true, message: `Please check you email` });
};
