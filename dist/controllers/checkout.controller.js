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
exports.cancelPaypal = exports.successPaypal = exports.createPaypal = exports.create = void 0;
const stripe_1 = __importDefault(require("stripe"));
const uuid_1 = require("uuid");
const credentials_1 = require("../config/credentials");
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
paypal_rest_sdk_1.default.configure({
    mode: 'sandbox',
    client_id: 'AQ-Fj1YQS2lZNUzECPBjzaTnaI28uW45IWD3ojaqF-k66jCk2wIVfgpakl7kYO1QIyp-uU-SIITGDXOW',
    client_secret: 'EJLbOJNzYMO6ta5Lu4K7_H5d4Jm1s3LZnWX8dGiFRmt_lFeqqV9jLu_jFFgClRpwcg8Z-xsfUQNW7QL7',
});
const stripe = new stripe_1.default(credentials_1.stripe_secret, {
    apiVersion: '2020-08-27',
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, amount } = req.body;
    const idempotencyKey = uuid_1.v4();
    return stripe.customers
        .create({
        email: token.email,
        source: token,
    })
        .then((customer) => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
        }, { idempotencyKey });
    })
        .then((result) => {
        return res.status(200).json({ message: 'Payment success', data: result });
    })
        .catch((err) => {
        return res.status(500).json({ message: 'Payment failed' });
    });
});
exports.create = create;
const createPaypal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    paypal_rest_sdk_1.default.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        }
        else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});
exports.createPaypal = createPaypal;
const successPaypal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ succes: true, message: 'Paypal payment success' });
});
exports.successPaypal = successPaypal;
const cancelPaypal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ succes: false, message: 'Paypal payment failed' });
});
exports.cancelPaypal = cancelPaypal;
//# sourceMappingURL=checkout.controller.js.map