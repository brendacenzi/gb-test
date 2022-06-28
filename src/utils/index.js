const uriFormat = require('mongodb-uri');

const Utils = {
  encodeMongo(urlString) {
    if (urlString) {
      const parsed = uriFormat.parse(urlString)
      urlString = uriFormat.format(parsed);
    }
    return urlString;
  }
}

module.exports = Utils;