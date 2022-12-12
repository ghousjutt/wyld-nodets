import { Request, Response } from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import { stripe_secret } from '../config/credentials';
import paypal from 'paypal-rest-sdk';
paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'AQ-Fj1YQS2lZNUzECPBjzaTnaI28uW45IWD3ojaqF-k66jCk2wIVfgpakl7kYO1QIyp-uU-SIITGDXOW',
  client_secret:
    'EJLbOJNzYMO6ta5Lu4K7_H5d4Jm1s3LZnWX8dGiFRmt_lFeqqV9jLu_jFFgClRpwcg8Z-xsfUQNW7QL7',
});

const stripe = new Stripe(stripe_secret, {
  apiVersion: '2020-08-27',
});
export const create = async (req: Request, res: Response) => {
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      return res.status(200).json({ message: 'Payment success', data: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: 'Payment failed' });
    });
};

export const createPaypal = async (req: Request, res: Response) => {
  const { amount, successUrl, cancelUrl, customerName } = req.body;
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: successUrl || 'http://18.170.58.22:8080/success',
      cancel_url: cancelUrl || 'http://18.170.58.22:8080/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: customerName || 'paypal payment',
              sku: '001',
              price: amount || '1.00',
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: amount || '1.00',
        },
        description: 'Wyld website payment',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment: any) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

export const successPaypal = async (req: Request, res: Response) => {
  return res.json({ succes: true, message: 'Paypal payment success' });
};

export const cancelPaypal = async (req: Request, res: Response) => {
  return res.json({ succes: false, message: 'Paypal payment failed' });
};

// export const create = async (req: Request, res: Response) => {
//   const { token, amount } = req.body;
//   const idempotencyKey = uuidv4();
//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token,
//     })
//     .then((customer) => {
//       stripe.charges.create(
//         {
//           amount: amount * 100,
//           currency: "usd",
//           customer: customer.id,
//           receipt_email: token.email,
//         },
//         { idempotencyKey }
//       );
//     })
//     .then((result) => {
//       return res.status(200).json({ message: "Payment success", data: result });
//     })
//     .catch((err) => {
//       return res.status(500).json({ message: "Payment failed" });
//     });
// };
