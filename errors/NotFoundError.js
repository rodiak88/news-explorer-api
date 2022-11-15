const { statusCodes } = require('../utils/consts');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.notFound;
  }
}

module.exports = NotFoundError;
