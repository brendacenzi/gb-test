const controller = require('../controllers/purchaseController');
const Utils = require('../utils/auth.js');

module.exports = (express) => {

  const apiRouter = express.Router();

  apiRouter.use(Utils.tokenMiddleware);

  apiRouter.post('/register', controller.register);

  apiRouter.get('/list-purchase/:doc?', controller.listPurchase);

  return apiRouter;
};