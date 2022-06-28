const axios = require('axios');
require('dotenv').config();

const { URL_CASH } = process.env;

const CashbackBusiness = {
  accumulatedValue: async (document) => {
      try {
        const res = await axios.get(URL_CASH + document);
        return { value: res.data.body.credit };
      } catch (err) {
        throw err;
      }
  }
}


module.exports = CashbackBusiness;