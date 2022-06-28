const moment = require('moment');
const Purchase = require("../models/purchase");
require('dotenv').config();

const PurchaseBusiness = {
  register: async (data) => {
    try {
      let date = data.date ? moment(data.date) : moment(); 
      const list = await Purchase.find({doc_retailer: data.document, status: "APR", date: {$gte: date.add(-1, 'months')}});
      const sum = list ? list.reduce((a,b) => a + b.price, 0) + data.price : 0;
      const perc = sum < 1000 ? 10 : (sum > 1500 ? 20 : 15);

      date = date.add(1, 'months');

      let purchase = new Purchase({
        code: data.code,
        price: data.price,
        doc_retailer: data.document,
        status:  data.document == "15350946056" ? "APR" : "EAN",
        date: date.format(),
        percent: perc,
        cash_value: data.price * (perc/100)
      });

      const {_id, percent, cash_value} = await purchase.save();

      return {id: _id, percent, cashback: cash_value};
    } catch (err) {
      throw err;
    }
  },

  listPurchase: async (document) => {
    try {
      let param = {};

      if (document)
        param = {doc_retailer: document};

      const res = await Purchase.find(param).sort('date');

      return res;
    } catch (err) {
      throw err;
    }
  }
}


module.exports = PurchaseBusiness;