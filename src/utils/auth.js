const jwt = require('jsonwebtoken');
const moment = require('moment');
const https = require('https');
const logger = require('./logger');

require('dotenv').config();
const {	SECRET } = process.env;

const tokenMiddleware = async (req, res, next) => {
	const token = req.headers['x-access-token'];
    if (token) {
		jwt.verify(token, SECRET, async (err, decoded) => {
			if (err || !decoded.password_valid) {
                logger.error("Falha de autenticação - " + err);
                return res.status(500).json({auth: false, message: "Falha de autenticação"});
            }
			req.decoded = decoded;
			next(); 
		});
	} else
        return res.status(401).json({auth: false, message: "Token não informado"});
};

module.exports = {
	tokenMiddleware
};