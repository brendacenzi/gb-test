const express    	 = require('express');
const app        	 = express();
const bodyParser 	 = require('body-parser');
const mongoose   	 = require('mongoose');
require('dotenv').config(); 

const { PORT, DATABASE } = process.env;
const { encodeMongo } = require('./src/utils');

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());

mongoose.connect(encodeMongo(DATABASE), { useNewUrlParser: true, useUnifiedTopology: true });

const retailerRoute = require('./src/routes/retailer')(express);
app.use('/retailer', retailerRoute);

const cashRoute = require('./src/routes/cashback')(express);
app.use('/cashback', cashRoute);

const purchaseRoute = require('./src/routes/purchase')(express);
app.use('/purchase', purchaseRoute);

app.listen(PORT);

console.log(`app listening on port ${PORT}`);