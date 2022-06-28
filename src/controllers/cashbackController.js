const Business = require('../business/cashbackBusiness');
const { cpf } = require('cpf-cnpj-validator'); 
const Express = require('../utils/express');

const CashbackController = { 
    accumulatedValue: async (req, res) => {
        try {
            const document = req.params.doc;

            if (!cpf.isValid(document))
                return Express.HttpErrorStatus(req, res, 'Invalid document', 400);

            const value = await Business.accumulatedValue(document);
        
            return Express.HttpSuccess(res, value);
        } catch (error) {
            return Express.HttpErrorStatus(req, res, 'Incomplete request', 500, error);
        }
    }
}

module.exports = CashbackController;