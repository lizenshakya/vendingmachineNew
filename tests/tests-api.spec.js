const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const startServer = require('../index');
const _ = require('lodash');
chai.use(chaiHttp);
const Product = require('../model/product'); 
const Coin = require('../model/coin'); 
const Purchase = require('../model/productPurchase'); 
const insertInitialData = require('../config/dbInit')
const baseApi = 'http://localhost:5000';

const purchaseData = {
    coins: 100 + 2 * 20 + 3 * 30 + 4 * 25, // Total no. of coins after purchase
    products: [
        {
            productId: 'Coke',
            productName: 'Coke',
            productRate: 20,
            productQuantity: 2,
            productStock: 8,
        },
        {
            productId: 'Dew',
            productName: 'Dew',
            productRate: 30,
            productQuantity: 3,
            productStock: 7,
        },
        {
            productId: 'Pepsi',
            productName: 'Pepsi',
            productRate: 25,
            productQuantity: 4,
            productStock: 6,
        },
    ],
};

describe('Starting API test..', () => {
    before(done => {
        startServer;
        return done();

    });
});


describe('Testing DB removal', () => {
    it('it should remove all the products, purchases and coins from DB', async () => {
        try {

            await Product.deleteMany({ query: {} }); 
            await Coin.deleteMany({ query: {} }); 
            await Purchase.deleteMany({ query: {} });

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });
});

describe('Testing `insertInitialData` function that inserts products and coins to DB', () => {
    it('it should insert the products and coins to DB', async () => {
        try {
            await insertInitialData();

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });
});

describe('Testing GET /api/product API - Checking initially inserted products and coin', () => {
    it('it should GET all the products, purchases and coins', async () => {
        try {
            const res = await chai.request(baseApi).get('/api/product');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.own.property('data');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.own.property('coins');
            expect(res.body.data).to.have.own.property('products');
            expect(res.body.data.products).to.be.an('array');
            expect(res.body.data.products).to.have.lengthOf(3);
            expect(res.body.data).to.have.own.property('purchasedItems');
            expect(res.body.data.purchasedItems).to.be.an('array');
            expect(res.body.data.purchasedItems).to.have.lengthOf(0);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });
});

describe('Testing POST /api/products/checkout API - Test for purchase', () => {
    it(`it should handle purchase of 2 coke, 3 dew & 4 pepsi properly -
        product stock, coins should be updated and purchase detail should be added`, async () => {
        try {
            const res = await chai
                .request(baseApi)
                .post('/api/product/checkout')
                .send(purchaseData);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.own.property('success');
            expect(res.body.success).to.be.equal(true);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });
});


describe('Testing POST /api/product/refund API - Test for refund', () => {
    it(`it should handle refund of 1 coke & 2 pepsi properly -
        product stock, coins and purchase details should be updated`, async () => {
        try {
            const res = await chai.request(baseApi).get('/api/product');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.own.property('purchasedItems');
            expect(res.body.data.purchasedItems).to.be.an('array');

            const refundData = [];

            _.get(res, 'body.data.purchasedItems[0]purchasedItems', []).forEach(item => {
                const obj = { _id: item._id, refundRate: item.productRate };

                if (item.productName === 'Coke') {
                    obj.refundQuantity = 1;
                    refundData.push(obj);
                }
                if (item.productName === 'Pepsi') {
                    obj.refundQuantity = 2;
                    refundData.push(obj);
                }
            });
            const returnPayload = {
                coins: 330 - 1 * 20 - 2 * 25, // Total no. of coins after re-fund
                products: [
                    { productName: 'Coke', productStock: 1 },
                    { productName: 'Pepsi', productStock: 2 },
                ],
                refundData,
            };
            const resp = await chai
                .request(baseApi)
                .post('/api/product/refund')
                .send(returnPayload);

            expect(resp).to.have.status(200);
            expect(resp.body).to.be.an('object');
            expect(resp.body).to.have.own.property('success');
            expect(resp.body.success).to.be.equal(true);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    });
});

