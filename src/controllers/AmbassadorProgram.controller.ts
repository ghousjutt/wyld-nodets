import { Request, Response } from 'express';
import AmbassadorModel from '../models/AmbassadorProgram.model';
import { gmailEmail, gmailPassword } from '../config/credentials';
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
    firstName,
    lastName,
    email,
    country,
    socialMedia,
    aboutYou,
    alignWithWyld,
    instagramHandle,
    youtubeHandle,
  } = req.body;

  const ambassador = new AmbassadorModel({
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
    const createAmbassador = await ambassador.save();
    var mailOptions = {
      from: gmailEmail,
      to: [email, 'rowan@wyldfitness.com'],
      subject: 'WYLD POS',
      // text: isApporved,
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
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Error creating Ambassador Program' });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ambassador = await AmbassadorModel.findById(id);
    if (!ambassador) {
      return res.status(200).json({ message: 'Ambassador Program not Found' });
    }

    return res
      .status(200)
      .json({ message: 'Ambassador Program Found', data: ambassador });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Error founding Ambassador Program' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const ambassadors = await AmbassadorModel.find({});
    if (!ambassadors) {
      return res.status(200).json({ message: 'Ambassador Program Not Found' });
    }
    return res
      .status(200)
      .json({ message: 'Ambassador Program Found', data: ambassadors });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Error founding Ambassador Program' });
  }
};
