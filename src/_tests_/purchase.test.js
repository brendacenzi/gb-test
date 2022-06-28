const purchase = require('../business/purchaseBusiness')
require('dotenv').config(); 
const mongoose   	 = require('mongoose');
const { DATABASE } = process.env;
const { encodeMongo } = require('../utils');

beforeEach(() => {
  mongoose.connect(encodeMongo(DATABASE), { useNewUrlParser: true, useUnifiedTopology: true });
});

test('list without param success', async () => {
  const res = await purchase.listPurchase()
  await expect(res).not.toBeNull()
})

test('list with param null', async () => {
  const res = await purchase.listPurchase('43495803498509')
  await expect(res).toEqual([])
})