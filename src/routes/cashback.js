const controller = require('../controllers/cashbackController');
const Utils = require('../utils/auth.js');

module.exports = (express) => {

  const apiRouter = express.Router();

  apiRouter.use(Utils.tokenMiddleware);

  apiRouter.get('/accumulated-value/:doc', controller.accumulatedValue);

  return apiRouter;
};