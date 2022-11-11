const { statusCodes } = require('../utils/utils');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.forbidden;
  }
}

module.exports = ForbiddenError;
