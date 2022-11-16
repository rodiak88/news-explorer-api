const { statusCodes } = require('../utils/consts');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.badRequest;
  }
}

module.exports = BadRequestError;
