const { statusCodes } = require('../utils/utils');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.notFound;
  }
}

module.exports = NotFoundError;
