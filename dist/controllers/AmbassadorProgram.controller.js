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
exports.getAll = exports.getById = exports.create = void 0;
const AmbassadorProgram_model_1 = __importDefault(require("../models/AmbassadorProgram.model"));
const credentials_1 = require("../config/credentials");
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
    const { firstName, lastName, email, country, socialMedia, aboutYou, alignWithWyld, instagramHandle, youtubeHandle, } = req.body;
    const ambassador = new AmbassadorProgram_model_1.default({
        firstName,
        lastName,
        email,
        country,
        socialMedia,
        aboutYou,
        alignWithWyld,
        instagramHandle,
        youtubeHandle,
    });
    try {
        const createAmbassador = yield ambassador.save();
        var mailOptions = {
            from: credentials_1.gmailEmail,
            to: [email, 'rowan@wyldfitness.com'],
            subject: 'WYLD POS',
            html: `<h3>WYLD Ambassador</h3><div>
      <p style='margin:0px'>You’ve just taken the first step in joining the most rad family out. At WYLD, authentic relationships are the foundation of our ambassadors. Our ambassadors are the connection to the world and help provide us with valuable feedback to improve and grow our products and services.</p>
      <p>We are constantly working to improve how we reward you and your following for helping us spread the word about WYLD. Whether you’re an influencer, personal trainer, athlete or just someone making a difference in the community, we encourage you to join! Through our ambassador program, you will receive development tools and experiences, test the latest WYLD products, and join a network of like-minded people.</p>
      <p>Our ambassadors are not just a partner. You are an extension of the WYLD brand. We’re not necessarily looking for the biggest names or followings. As long as you’re passionate about building and improving your community, ready to provide honest feedback and want to be involved. We’d love to have you!</p>
      <p>Our team is currently working through your application and will be in touch shortly. If you have any questions, just contact us via our website or email <b>ambassadors@wyldfitness.com</b></p>
      <p>Have a rad day!<br>The team at WYLD</p>

      </div>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error sending email :: ', error);
            }
        });
        return res
            .status(200)
            .json({ message: 'Ambassador Program Created', data: createAmbassador });
    }
    catch (e) {
        return res
            .status(500)
            .json({ message: 'Error creating Ambassador Program' });
    }
});
exports.create = create;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ambassador = yield AmbassadorProgram_model_1.default.findById(id);
        if (!ambassador) {
            return res.status(200).json({ message: 'Ambassador Program not Found' });
        }
        return res
            .status(200)
            .json({ message: 'Ambassador Program Found', data: ambassador });
    }
    catch (e) {
        return res
            .status(500)
            .json({ message: 'Error founding Ambassador Program' });
    }
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ambassadors = yield AmbassadorProgram_model_1.default.find({});
        if (!ambassadors) {
            return res.status(200).json({ message: 'Ambassador Program Not Found' });
        }
        return res
            .status(200)
            .json({ message: 'Ambassador Program Found', data: ambassadors });
    }
    catch (e) {
        return res
            .status(500)
            .json({ message: 'Error founding Ambassador Program' });
    }
});
exports.getAll = getAll;
//# sourceMappingURL=AmbassadorProgram.controller.js.map