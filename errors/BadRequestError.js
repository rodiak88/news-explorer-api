const { statusCodes } = require('../utils/utils');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.badRequest;
  }
}

module.exports = BadRequestError;
