const logger = require('./logger');
const Main = {
   HttpSuccess : (res, data) => {
    return res.json({ success: true, statusCode: 200, data });
  },

  HttpErrorStatus : (req, res, message, num, err) => {
    const msg = 'Falha - ' + (err && err.message ? err.message : message);
    if (num == 500) logger.error(msg); else logger.info(msg);
    return res.status(num).json({ success: false, message: message, statusCode: num, data: null });
  },
}

module.exports = Main;