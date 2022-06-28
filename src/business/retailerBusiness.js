require('dotenv').config();
const Retailer = require("../models/Retailer");
const bcrypt       = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const RetailerBusiness = {
  register: async (data) => {
    try {
      const exists = await Retailer.findOne({$or: [{document: data.document}, {email: data.email}]});

      if (exists) return null;
      
      const salt = await bcrypt.genSalt(10);

      let retailer = new Retailer({
        document: data.document,
        name: data.name,
        email: data.email,
        password:  await bcrypt.hash(data.password, salt)
      });

      const {_id} = await retailer.save();

      return {id: _id};
    } catch (err) {
      throw err;
    }
  },

  auth: async (data) => {
    try {
      const retailer = await Retailer.findOne({email: data.email});

      if (!retailer) return null;

      const isValid = await bcrypt.compare(data.password, retailer.password);

      if (!isValid) return null;

      const token = jwt.sign({
        _id: retailer._id,
        password_valid: true
      },
        SECRET, {
        expiresIn: 108000
      });

      return token;
    } catch (err) {
      throw err;
    }
  }
}


module.exports = RetailerBusiness;