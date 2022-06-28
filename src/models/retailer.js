const mongoose     = require('mongoose');
const bcrypt       = require('bcryptjs');
const Schema       = mongoose.Schema;

const RetailerSchema = new Schema ({
    document:  {type: String, required: true, unique: true},
    name:      {type: String, required: true},
    email:     {type: String, required: true, unique: true},
    password:  {type: String, required: true}
});

module.exports = mongoose.model('Retailer', RetailerSchema);