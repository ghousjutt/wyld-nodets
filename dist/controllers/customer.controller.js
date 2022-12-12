"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToUser = exports.getAll = exports.getById = exports.changePassword = exports.resetPassword = exports.sendResetPasswordLink = exports.updateCustomer = exports.socialAuthLogin = exports.login = exports.create = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Customer_model_1 = __importDefault(require("../models/Customer.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const credentials_1 = require("../config/credentials");
const mongoose_1 = __importDefault(require("mongoose"));
const nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: credentials_1.gmailEmail,
        pass: credentials_1.gmailPassword,
    },
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, profileImagePath, firstName, lastName, phoneNumber, gender, dateOfBarth, streetAddress, city, } = req.body;
    const customerExist = yield Customer_model_1.default.findOne({ email: email });
    if (customerExist) {
        return res
            .status(400)
            .json({ message: 'Customer with this email already exists' });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    const customer = new Customer_model_1.default({
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
    yield customer.save();
    return res.status(200).json({
        id: customer._id,
        name: customer.firstName,
        email: customer.email,
        profileImagePath: customer.profileImagePath,
        token: generateToken_1.default(customer._id),
    });
});
exports.create = create;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const customer = yield Customer_model_1.default.findOne({ email: email });
    if (!customer) {
        res.status(404);
        return res.json({
            message: 'Email not exist in database',
        });
    }
    const compairPasswords = yield bcryptjs_1.default.compare(password, customer.password);
    if (compairPasswords) {
        return res.json({
            id: customer._id,
            businessName: customer.name,
            email: customer.email,
            profileImagePath: customer.profileImagePath,
            token: generateToken_1.default(customer._id),
        });
    }
    else {
        return res.json({
            message: 'Email or password incorrect',
        });
    }
});
exports.login = login;
const socialAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, profileImagePath, firstName, lastName, phoneNumber, gender, dateOfBarth, streetAddress, city, } = req.body;
    if (!email) {
        res.status(404);
        return res.json({
            message: 'email required',
        });
    }
    const customer = yield Customer_model_1.default.findOne({ email: email });
    if (customer) {
        return res.status(200).json({
            id: customer._id,
            name: customer.firstName,
            email: customer.email,
            profileImagePath: customer.profileImagePath,
            token: generateToken_1.default(customer._id),
        });
    }
    const createCustomer = new Customer_model_1.default({
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
    yield createCustomer.save();
    return res.status(200).json({
        id: createCustomer._id,
        name: createCustomer.firstName,
        email: createCustomer.email,
        profileImagePath: createCustomer.profileImagePath,
        token: generateToken_1.default(createCustomer._id),
    });
});
exports.socialAuthLogin = socialAuthLogin;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, profileImagePath, firstName, lastName, phoneNumber, gender, dateOfBarth, streetAddress, city, } = req.body;
    const customer = yield Customer_model_1.default.findById(id);
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
    const updatedCustomer = yield customer.save();
    res.status(200);
    return res.json({ message: 'updated', data: updatedCustomer });
});
exports.updateCustomer = updateCustomer;
const sendResetPasswordLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield Customer_model_1.default.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json({ message: `User agains ${email} not exists.` });
    }
    let emails = [email.toString()];
    const randomNumber = Math.floor(Math.random() * 10000);
    user.code = randomNumber;
    var mailOptions = {
        from: credentials_1.gmailEmail,
        to: emails,
        subject: 'WYLD POS',
        html: `<h3>Following is your password reset code</h3><div><p style='margin:0px'>Code: ${randomNumber}</p></div>`,
    };
    yield user.save();
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).json({ message: `Server sending reset password email` });
        }
    });
    return res.status(200).json({ message: `Code sent to email` });
});
exports.sendResetPasswordLink = sendResetPasswordLink;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const user = yield Customer_model_1.default.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: `User not exists.` });
    }
    if (parseInt(user.code) !== parseInt(code)) {
        return res.status(400).json({ message: `Invalid code.` });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    user.password = hashPassword;
    user.code = 0;
    yield user.save();
    return res.status(200).json({ message: `Password updated` });
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, newPassword, oldPassword } = req.body;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(userId);
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const user = yield Customer_model_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({ message: `User not exists.` });
    }
    const compairPasswords = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!compairPasswords) {
        return res.status(401).json({ message: `Wrong old password` });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    user.password = hashPassword;
    yield user.save();
    return res.status(200).json({ message: `Password updated` });
});
exports.changePassword = changePassword;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const checkId = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!id) {
        return res.status(400).json({ message: `Missing id in params` });
    }
    if (!checkId) {
        return res.status(400).json({ message: `Invalid id` });
    }
    const customer = yield Customer_model_1.default.findById(id);
    if (!customer) {
        return res.status(404).json({ message: `User agains ${id} not exists.` });
    }
    res.status(200);
    return res.json({ message: 'Found', data: customer });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield Customer_model_1.default.find();
    return res.json({
        customers,
    });
});
exports.getAll = getAll;
const sendEmailToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, quantity, color, message, categoryName, productName } = req.body;
    if (!userEmail) {
        return res.json({
            success: false,
            message: 'userEmail attribute required in the body',
        });
    }
    let emails = [userEmail.toString()];
    var mailOptions = {
        from: credentials_1.gmailEmail,
        to: emails,
        subject: 'WYLD POS',
        html: `<h3>WYLD Platform email</h3><div><p style='margin:0px'>Please click below link to reset your password</p>
    <p style='margin:0px'><b>User Email:</b> ${userEmail}</p><br/>
    <p style='margin:0px'><b>Product Name:</b> ${productName || 'Not provided'}</p><br/>
    <p style='margin:0px'><b>Category Name:</b> ${categoryName || 'Not provided'}</p><br/>
    <p style='margin:0px'><b>Quantity:</b> ${quantity || 'Not provided'}</p><br/>
    <p style='margin:0px'><b>Color:</b> ${color || 'Not provided'}</p><br/><br/>
    <p style='margin:0px'><b>Message:</b> ${message || 'Not provided'}</p><br/>
    <p style='margin:0px'>In any case, if you wish to try our products or acquire more information please, contact us at:</p><br/><p style='margin:0px'>T: +35799660452</p><p style='margin:0px'>E: wyld.poss@gmail,com</p><br/><p style='margin:0px'>Thank you,</p><br/><p style='margin:0px'>Wyld POS</p></div>`,
    };
    yield transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email :: ', error);
            return res
                .status(500)
                .json({ success: false, message: `Server sending email failed` });
        }
        else {
            console.log('success sending email');
            return res
                .status(200)
                .json({ success: true, message: `Please check you email` });
        }
    });
    return res
        .status(200)
        .json({ success: true, message: `Please check you email` });
});
exports.sendEmailToUser = sendEmailToUser;
//# sourceMappingURL=customer.controller.js.map