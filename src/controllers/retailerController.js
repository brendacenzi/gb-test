const Business = require('../business/retailerBusiness');
const Express = require('../utils/express');
const { cpf } = require('cpf-cnpj-validator'); 

const retailerController = { 
    register: async (req, res) => {
        try {
            if (!cpf.isValid(req.body.document)) return Express.HttpErrorStatus(req, res, 'Invalid document', 400);
            
            const id = await Business.register(req.body);

            if (!id) return Express.HttpErrorStatus(req, res, 'Existing registration', 400);
            
            return Express.HttpSuccess(res, id);
        } catch (error) {
            return Express.HttpErrorStatus(req, res, 'Incomplete request', 500, error);
        }
    },

    auth : async (req, res) => {
        try{
            if (!req.body.email || !req.body.password)
                return Express.HttpErrorStatus(req, res, 'Email or password not provided', 400);

            const token = await Business.auth(req.body);
            
            if (token)
                return Express.HttpSuccess(res, token);
            else 
                return Express.HttpErrorStatus(req, res, 'Invalid email or password', 400);
        }catch(err){
            return Express.HttpErrorStatus(req, res, 'Incomplete request', 500, error);
        }
    }
}

module.exports = retailerController;