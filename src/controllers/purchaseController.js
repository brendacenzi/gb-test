const Business = require('../business/purchaseBusiness');
const Express = require('../utils/express');
const { cpf } = require('cpf-cnpj-validator'); 

const PurchaseController = { 
    register: async (req, res) => {
        try {
            const document = req.body.document;
             
            if (document && !cpf.isValid(document))
                return Express.HttpErrorStatus(req, res, 'Invalid document', 400);

            const purchase = await Business.register(req.body);
        
            return Express.HttpSuccess(res, purchase);
        } catch (error) {
            return Express.HttpErrorStatus(req, res, 'Incomplete request', 500, error);
        }
    },

    listPurchase: async (req, res) => {
        try {
            const document = req.params.doc;

            if (document && !cpf.isValid(document))
                return Express.HttpErrorStatus(req, res, 'Invalid document', 400);

            const lst = await Business.listPurchase(document);

            return Express.HttpSuccess(res, lst);
        } catch (error) {
            return Express.HttpErrorStatus(req, res, 'Incomplete request', 500, error);
        }
    }
}

module.exports = PurchaseController;