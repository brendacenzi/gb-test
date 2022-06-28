const retailer = require('../business/retailerBusiness')
require('dotenv').config(); 
const mongoose   	 = require('mongoose');
const { DATABASE } = process.env;
const { encodeMongo } = require('../utils');

beforeEach(() => {
  mongoose.connect(encodeMongo(DATABASE), { useNewUrlParser: true, useUnifiedTopology: true });
});

test('auth error', async () => {
  const res = await retailer.auth({email: "bcenzi@gmail.com", password: "erro"})
  await expect(res).toBeNull()
})

test('auth success', async () => {
  const res = await retailer.auth({email: "bcenzi@gmail.com", password: "brenda"})
  await expect(res).not.toBeNull()
})

test('register existing document', async () => {
  const res = await retailer.register({email: "bcenzi@gmail.com", password: "brenda"})
  await expect(res).toBeNull()
})