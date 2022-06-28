const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const PurchaseSchema = new Schema ({
    code:         {type: String, required: true},
    price:        {type: Number, required: true},
    doc_retailer: {type: String, required: true},
    status:       {type: String, required: true},
    date:         {type: Date, required: false},
    percent:      {type: Number, required: true},
    cash_value:   {type: Number, required: true}
});

module.exports = mongoose.model('Purchase', PurchaseSchema);