const controller = require('../controllers/retailerController');
const Utils = require('../utils/auth.js');

module.exports = (express) => {

  const apiRouter = express.Router();

  apiRouter.post('/login', controller.auth);

  apiRouter.use(Utils.tokenMiddleware);

  apiRouter.post('/register', controller.register);

  return apiRouter;
};